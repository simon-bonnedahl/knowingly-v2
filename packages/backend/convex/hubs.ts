import { PaginationOptions } from "convex/server";
import { ConvexError, v } from "convex/values";

import {
  defaultBanner,
  defaultColor,
  defaultContent,
  defaultIcon,
  defaultRoles,
  unAvailableSubdomains,
} from "./constants";
import { action, mutation, query } from "./functions";
import { Ent, tier } from "./types";
import { internalAction } from "./_generated/server";
import { api } from "./_generated/api";
import { blockContentToMarkdown } from "./blocknote";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

export const create = mutation({
  args: {
    name: v.string(),
    subdomain: v.string(),
    description: v.optional(v.string()),
    isPublic: v.boolean(),
    tier: tier,
  },
  handler: async (ctx, args) => {
    const { name, subdomain, description, isPublic, tier } = args;
    const user = await ctx.userX();
    const hub = await ctx
      .table("hubs")
      .insert({
        name,
        subdomain,
        fields: [],
        description,
        isPublic,
        tier,
        content: defaultContent,
        banner: defaultBanner,
        brandingColor: defaultColor,
        icon: defaultIcon,
        updatedAt: Date.now(),
      })
      .get();
    //create default roles
    const ownerRole = await ctx
      .table("roles")
      .insert({ ...defaultRoles.owner, hubId: hub._id })
      .get();
    await ctx.table("roles").insert({ ...defaultRoles.admin, hubId: hub._id });
    await ctx
      .table("roles")
      .insert({ ...defaultRoles.creator, hubId: hub._id });
    await ctx.table("roles").insert({ ...defaultRoles.viewer, hubId: hub._id });
    //add user as owner
    await ctx
      .table("members")
      .insert({ hubId: hub._id, userId: user._id, roleId: ownerRole._id });
    return hub;
  },
});
export const get = query({
  args: { subdomain: v.optional(v.string()), id: v.optional(v.id("hubs")) },
  handler: async (ctx, args) => {
    if (!args.id && !args.subdomain)
      throw new ConvexError("Required parameter missing");
    if (args.id) return await ctx.table("hubs").get(args.id);
    if (args.subdomain)
      return await ctx.table("hubs").get("subdomain", args.subdomain);
  },
});
//TODO: remove eventually
export const getHub = query({
  args: { subdomain: v.optional(v.string()), id: v.optional(v.id("hubs")) },
  handler: async (ctx, args) => {
    if (!args.id && !args.subdomain)
      throw new ConvexError("Required parameter missing");
    if (args.id) return await ctx.table("hubs").get(args.id);
    if (args.subdomain)
      return await ctx.table("hubs").get("subdomain", args.subdomain);
  },
});



export const list = query({
  args: {ids: v.optional(v.array(v.id("hubs"))) },
  handler: async (ctx, args) => {
    if(args.ids) return (await ctx.table("hubs").getMany(args.ids)).filter((h) => !!h);
    return await ctx.table("hubs");
  },
});

export const advancedList = query({
  args: { searchParams: v.any() },
  handler: async (ctx, args) => {
    const { name, page, per_page, sort } = args.searchParams;

    const [field, direction] = sort ? sort?.split(".") : [undefined, undefined];
    const pagination: PaginationOptions = {
      cursor: null,
      numItems: parseInt(per_page),
    };

    const hubs = await ctx
      .table("hubs")
      .filter((q) => q.gte(q.field("name"), name))
      .order(direction ?? "desc");
    return hubs;
  },
});
export const getPublicHubs = query({
  args: {},
  handler: async (ctx) => {
    const hubs = await ctx
      .table("hubs")
      .filter((q) => q.eq(q.field("isPublic"), true));
    return hubs;
  },
});

export const update = mutation({
  args: { subdomain: v.optional(v.string()), id: v.optional(v.id("hubs")), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { subdomain, id, field, value } = args;
    if (!id && !subdomain) throw new ConvexError("Required parameter missing");
    let hub = undefined;
    if(id) hub = await ctx.table("hubs").get(id);
    if(subdomain) hub = await ctx.table("hubs").get("subdomain", subdomain);
    if (!hub) throw new ConvexError("Hub not found");

    const permissions = await ctx.permissions(hub._id);
    if (!permissions.canEditHub && !permissions.canDoAnything) throw new ConvexError("You do not have permission to do that");

    return await hub.patch({ [field]: value });


  },
});

export const deleteHub = mutation({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const { subdomain } = args;
    const hub = await ctx.table("hubs").get("subdomain", subdomain);
    if (!hub) throw new ConvexError("Hub not found");
    const permissions = await ctx.permissions(hub._id);
    if (!permissions.canDeleteHub && !permissions.canDoAnything) throw new ConvexError("You do not have permission to do that");
    return await hub.delete();
  },
});

export const getMyRole = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const { subdomain } = args;
    return (
      await ctx
        .table("hubs")
        .get("subdomain", subdomain)
        .edge("members")
        .filter((q) => q.eq(q.field("userId"), ctx.userId))
        .first()
    )?.edge("role");
  },
});

export const getMyPermissions = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const { subdomain } = args;
    const hub = await ctx.table("hubs").get("subdomain", subdomain);
    if(!hub) throw new ConvexError("Hub not found");
    return await ctx.permissions(hub._id);
  },
});

export const getMembers = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const { subdomain } = args;
    return ctx
      .table("hubs")
      .get("subdomain", subdomain)
      .edge("members")
      .map(async (member) => {
        return {
          ...member,
          user: await ctx.table("users").get(member.userId),
          role: await ctx.table("roles").get(member.roleId),
        };
      });
  },
});

export const getRoles = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const { subdomain } = args;
    const roles = await ctx
      .table("hubs")
      .get("subdomain", subdomain)
      .edge("roles");
    //sort by created at
    return roles?.sort((a, b) => a._creationTime - b._creationTime);
  },
});

export const getInvites = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const { subdomain } = args;
    return ctx
      .table("hubs")
      .get("subdomain", subdomain)
      .edge("hubInvites")
      .map(async (invite) => {
        return {
          ...invite,
          user: invite.user ? await ctx.table("users").get(invite.user) : null,
          role: await ctx.table("roles").get(invite.roleId),
        };
      });
  },
});

export const isAvailable = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const { subdomain } = args;
    if (!subdomain || subdomain.length < 2) return false;
    if(unAvailableSubdomains.includes(subdomain)) return false;
    return !(await ctx.table("hubs").get("subdomain", subdomain));
  },
});


//AI features

export const getHubsToEmbed = query({
  args: {updateInterval : v.number()},
  handler: async (ctx, args) => {
    const ms = args.updateInterval * 60 * 1000; // minutes to milliseconds
    const hubs = await ctx
      .table("hubs")
      .filter((q) => q.gte(q.field("updatedAt"), Date.now() - ms));
    return hubs;
  },
});

export const updateEmbeddings = internalAction({
  args: {updateInterval : v.number()},
  handler: async (ctx, args) => {
    const hubsToEmbed = await ctx.runQuery(api.hubs.getHubsToEmbed, {updateInterval: args.updateInterval});
    for (const hub of hubsToEmbed) {
      let markdown = "## " + hub.name + "\n\n";

      for (const field of hub.fields) {
        const f = await ctx.runQuery(api.fields.get, { id: field.id });
        if (!f) continue;
        markdown += `- ${f.name} : ${field.value}\n\n`;
      }
      markdown += blockContentToMarkdown(hub.content);

      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: markdown,
      });
      await ctx.runMutation(api.hubs.update, {
        id: hub._id,
        field: "embedding",
        value: embedding,
      });
    }

    return;
  },
});

export const vectorSearch = action({
  args: { query: v.string()},
  handler: async (ctx, args) : Promise<Ent<"hubs">[]> => {
    const { query } = args;

    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: query,
    });

    const results = await ctx.vectorSearch("hubs", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq("isPublic", true),
    });
    const filteredResults = results.filter((r) => r._score > 0.2);
    if(filteredResults.length === 0) return [];
    const hubs = await ctx.runQuery(api.hubs.list, {
      ids: filteredResults.map((r) => r._id),
    });
    return hubs; // TODO: Sort?
  },
});
