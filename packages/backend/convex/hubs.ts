import { v } from "convex/values";
import { mutation, query } from "./functions";
export const getHub = query({
    args: {subdomain : v.string() },
    handler: async (ctx, args) => {
      const hub = ctx.table("hubs").get("subdomain", args.subdomain);
      return hub;
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

export const getMyRole = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return (await ctx.table("hubs").get("subdomain", subdomain).edge("members").filter(q => q.eq(q.field("userId"), ctx.userId)).first())?.role
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
        }
      });
    },
  });
