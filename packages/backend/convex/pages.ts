import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { ConvexError, v } from "convex/values";
import slugify from "slugify";
import { v4 as uuid } from "uuid";

import { api } from "./_generated/api";
import {  internalAction } from "./_generated/server";
import { action, internalMutation, mutation, query } from "./functions";
import { defaultBanner, defaultPageContent, defaultPageIcon } from "./constants";
import { Ent, pageType } from "./types";
import { blockContentToMarkdown } from "./blocknote";

export const create = mutation({
  args: { name: v.string(), subdomain: v.string(), type: pageType, collectionId: v.optional(v.id("collections")) },
  handler: async (ctx, args) => {
    if (!ctx.userId) throw new ConvexError("Unauthorized");
    const { name, subdomain, type } = args;
    const hub = await ctx.table("hubs").getX("subdomain", subdomain);


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
        hubId: hub._id,
        type,
        isPublic: true,
        isLocked: false,
        banner: hub.banner,
        icon: defaultPageIcon(type),
        fields: [],
        content: defaultPageContent(type), //TODO: should be replaced by templates later on
        memberId: member._id,
        updatedAt: Date.now(),
        collections: args.collectionId ? [args.collectionId] : [],
      })
      .get();
    return page;
  },
});
export const getPage = query({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    const page = ctx.table("pages").get(args.id);
    return page;
  },
});
export const list = query({
  args: { ids: v.optional(v.array(v.id("pages"))) },
  handler: async (ctx, args) => {
    if (!args.ids) return await ctx.table("pages")
    return (await ctx.table("pages").getMany(args.ids)).filter((p) => !!p);
  },
});
export const getPagesByHub = query({
  args: { subdomain: v.string(), type: v.optional(pageType) },
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

export const getPagesByHubTest = query({
  args: { subdomain: v.string(), type: v.optional(pageType) },
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
  args: { id:v.id("pages"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { id, field, value } = args;
    return await ctx
      .table("pages")
      .getX(id)
      .patch({
        [field]: value,
        updatedAt: Date.now(),
      });
  },
});



export const getCreator = query({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    const user = await ctx
      .table("pages")
      .get(args.id)
      .edge("creator")
      .edge("user");
    return user;
  },
});
export const getPagesToEmbed = query({
  args: {updateInterval : v.number()},
  handler: async (ctx, args) => {
    const ms = args.updateInterval * 60 * 1000; // minutes to milliseconds
    const pages = await ctx
      .table("pages")
      .filter((q) => q.gte(q.field("updatedAt"), Date.now() - ms));
    return pages;
  },
});

export const updateEmbeddings = internalAction({
  args: {updateInterval : v.number()},
  handler: async (ctx, args) => {
    const pagesToEmbed = await ctx.runQuery(api.pages.getPagesToEmbed, {updateInterval: args.updateInterval});
    for (const page of pagesToEmbed) {
      let markdown = "## " + page.name + "\n\n";

      for (const field of page.fields) {
        const f = await ctx.runQuery(api.fields.get, { id: field.id });
        if (!f) continue;
        markdown += `- ${f.name} : ${field.value}\n\n`;
      }
      markdown += blockContentToMarkdown(page.content);

      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: markdown,
      });
      await ctx.runMutation(api.pages.update, {
        id: page._id,
        field: "embedding",
        value: embedding,
      });
    }

    return;
  },
});

export const vectorSearch = action({
  args: { query: v.string(), subdomain: v.string() },
  handler: async (ctx, args) :  Promise<Ent<"pages">[]>=> {
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
    const pages = await ctx.runQuery(api.pages.list, {
      ids: filteredResults.map((r) => r._id),
    });
   return pages; //TODO: Sort?
  },
});
