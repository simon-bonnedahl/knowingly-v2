import { v } from "convex/values";
import { action, mutation, query } from "./functions";
import { defaultCollections } from "./constants";

export const get = query({
    args: { id: v.id("collections") },
    handler: async (ctx, args) => {
        const collection =  await ctx.table("collections").get(args.id);
        return {
            ...collection,
            pages: await collection?.edge("pages")
        }
    },
    });

export const create = mutation({
    args: { subdomain: v.string() },
    handler: async (ctx, args) => {
        const hub = await ctx.table("hubs").getX("subdomain", args.subdomain);
        
        const collection =  await ctx.table("collections").insert({...defaultCollections.gallery, banner: hub.banner, hubId: hub._id, }).get();
        return {
            ...collection,
            pages: []
        };
    },
    });

export const update = mutation({
    args: { id: v.id("collections"), field: v.string(), value: v.any() },
    handler: async (ctx, args) => {
        return await ctx.table("collections").getX(args.id).patch({ [args.field]: args.value });
    },
    });

export const addPage = mutation({
    args: { collectionId: v.id("collections"), pageId: v.id("pages") },
    handler: async (ctx, args) => {
        return await ctx.table("collections").getX(args.collectionId).patch({ pages: {add: [args.pageId]} });
    },
    });