import { v } from "convex/values";
import { mutation, query } from "./functions";
import { flagKey } from "./seed/flags";


export const list = query({
    args: {},
    handler: async (ctx, ) => {
        return await ctx.table("flags")
    },
    });

export const get = query({
    args: { key: flagKey },
    handler: async (ctx, args) => {
        return (await ctx.table("flags").getX("key", args.key)).value;
    },
    });

export const update = mutation({
    args: { id: v.id("flags"), value: v.any() },
    handler: async (ctx, args) => {
        return await ctx.table("flags").getX(args.id).patch({ value: args.value });
    },
    });