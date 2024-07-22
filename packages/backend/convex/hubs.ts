import { v } from "convex/values";
import { mutation, query } from "./functions";
export const getHub = query({
    args: {subdomain : v.optional(v.string()), id: v.optional(v.id("hubs"))},
    handler: async (ctx, args) => {
      if (!args.id && !args.subdomain) throw new Error("id or subdomain is required");
      if(args.id)
        return await ctx.table("hubs").get(args.id);
      if(args.subdomain)
      return await  ctx.table("hubs").get("subdomain", args.subdomain);


    },
  });
export const getHubs = query({
    args: {},
    handler: async (ctx) => {
      const hubs = await ctx.table("hubs")
      return hubs;
    },
  });
export const getPublicHubs = query({
    args: {},
    handler: async (ctx) => {
      const hubs = await ctx.table("hubs").filter(q => q.eq(q.field("isPublic"), true));
      return hubs
    },
  });


export const update = mutation({
    args: {subdomain: v.string(), field: v.string(), value: v.any()},
    handler: async (ctx, args) => {
      const {subdomain, field, value} = args;
      const hub = await ctx.table("hubs").getX("subdomain", subdomain).patch({[field]: value});
      return hub;
    },
  });

export const deleteHub = mutation({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return await ctx.table("hubs").getX("subdomain", subdomain).delete();
    },
  });

export const getMyRole = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return (await ctx.table("hubs").get("subdomain", subdomain).edge("members").filter(q => q.eq(q.field("userId"), ctx.userId)).first())?.edge("role")
    },
  });

export const getMembers = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return ctx.table("hubs").get("subdomain", subdomain).edge("members").map(async(member) => {
        return {
          ...member,
          user: await ctx.table("users").get(member.userId),
          role: await ctx.table("roles").get(member.roleId),
        }
      });
    },
  });

export const getRoles = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      const roles = await  ctx.table("hubs").get("subdomain", subdomain).edge("roles")
      //sort by created at
      return roles?.sort ((a, b) => a._creationTime - b._creationTime)
    },
  });

export const getInvites = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return ctx.table("hubs").get("subdomain", subdomain).edge("hubInvites").map(async(invite) => {
        return {
          ...invite,
          user: invite.user ? await ctx.table("users").get(invite.user) : null,
          role: await ctx.table("roles").get(invite.roleId),
        }
      });
    },
  });