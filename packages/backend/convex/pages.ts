import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { ConvexError, v } from "convex/values";
import slugify from "slugify";
import { v4 as uuid } from "uuid";

import { api } from "./_generated/api";
import {  internalAction } from "./_generated/server";
import { customContentToMarkdown } from "./blocknote";
import { action, internalMutation, mutation, query } from "./functions";
import { pageTypes } from "./schema";
import { defaultBanner, defaultCustomContent, defaultPageContent, defaultPageIcon } from "./constants";

export const createPage = mutation({
  args: { name: v.string(), subdomain: v.string(), type: pageTypes },
  handler: async (ctx, args) => {
    if (!ctx.userId) throw new ConvexError("Unauthorized");
    const { name, subdomain, type } = args;
    const hub = await ctx.table("hubs").getX("subdomain", subdomain);
    let slug = name.toLowerCase().replace(/\s/g, "-");

    const pageExists = await ctx.table("pages").get("slug", slug);
    if (pageExists) slug = `${slug}-${uuid()}`;

    const member = await ctx
      .table("users")
      .get(ctx.userId)
      .edge("memberships")
      .filter((q) => q.eq(q.field("hubId"), hub._id))
      .unique();

    if (!member) throw new ConvexError("Unauthorized");
    const page = await ctx
      .table("pages")
      .insert({
        name,
        slug,
        hubId: hub._id,
        type,
        isPublic: true,
        isLocked: false,
        image: hub.banner,
        icon: defaultPageIcon(type),
        customFields: [],
        customContent: defaultPageContent(type), //TODO: should be replaced by templates later on
        memberId: member._id,
        updatedEmbedding: false,
      })
      .get();
    return page;
  },
});
export const getPage = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const page = ctx.table("pages").get("slug", args.slug);
    return page;
  },
});
export const getPages = query({
  args: { ids: v.array(v.id("pages")) },
  handler: async (ctx, args) => {
    const pages = await ctx.table("pages");
    const filteredPages = pages.filter((page) => args.ids.includes(page._id));
    return filteredPages;
  },
});
export const getPagesByHub = query({
  args: { subdomain: v.string(), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const pages = await ctx
      .table("hubs")
      .get("subdomain", args.subdomain)
      .edge("pages");
    if(!pages) return []
    if (args.type) {
      return pages.filter((page) => page.type === args.type);
    }
    return pages;
  },
});

export const update = mutation({
  args: { slug: v.string(), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { slug, field, value } = args;
    return await ctx
      .table("pages")
      .getX("slug", slug)
      .patch({
        [field]: value,
        updatedEmbedding: field === "embedding" ? true : false,
      });
  },
});

export const addCustomField = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = `text-${uuid().slice(0, 3)}`;
    const customField = await ctx
      .table("customFields")
      .insert({
        name: "New Field",
        slug,
        icon: "alignLeft",
        type: "text",
        isLocked: false,
        isSuggested: false,
      })
      .get();
    return customField;
  },
});

export const getCreator = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx
      .table("pages")
      .get("slug", args.slug)
      .edge("member")
      .edge("user");
    return user;
  },
});
export const getPagesToEmbed = query({
  args: {},
  handler: async (ctx) => {
    const pages = await ctx
      .table("pages")
      .filter((q) => q.eq(q.field("updatedEmbedding"), false));
    return pages;
  },
});

export const updateEmbeddings = internalAction({
  args: {},
  handler: async (ctx) => {
    const pagesToEmbed = await ctx.runQuery(api.pages.getPagesToEmbed);
    for (const page of pagesToEmbed) {
      let markdown = "## " + page.name + "\n\n";

      for (const field of page.customFields) {
        const f = await ctx.runQuery(api.customFields.get, { id: field.id });
        if (!f) continue;
        markdown += `- ${f.name} : ${field.value}\n\n`;
      }
      markdown += customContentToMarkdown(page.customContent);

      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: markdown,
      });
      await ctx.runMutation(api.pages.update, {
        slug: page.slug,
        field: "embedding",
        value: embedding,
      });
    }

    return;
  },
});

export const vectorSearch = action({
  args: { query: v.string(), subdomain: v.string() },
  handler: async (ctx, args) => {
    let res = [];
    const { query, subdomain } = args;

    const hub = await ctx.runQuery(api.hubs.getHub, { subdomain });
    if (!hub) throw new ConvexError("Hub not found");

    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: query,
    });

    const results = await ctx.vectorSearch("pages", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq("hubId", hub._id),
    });
    const filteredResults = results.filter((r) => r._score > 0.2);
    const pages = await ctx.runQuery(api.pages.getPages, {
      ids: filteredResults.map((r) => r._id),
    });
   return pages.sort((a, b) => {
      return (
        filteredResults.find((r) => r._id === a._id)._score -
        filteredResults.find((r) => r._id === b._id)._score
      );
    });
  },
});
