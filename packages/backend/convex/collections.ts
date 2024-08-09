import { v } from "convex/values";
import { action, mutation, query } from "./functions";
import { defaultCollections } from "./constants";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

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

export const getOrCreate = action({
    args: { id: v.string(), subdomain: v.string() },
    handler: async (ctx, args) => {
        if(!args.id) return await ctx.runMutation(api.collections.create, { subdomain: args.subdomain });
        const collection = await ctx.runQuery(api.collections.get, { id: args.id as Id<"collections"> });
        if (collection) return collection;
        return await ctx.runMutation(api.collections.create, { subdomain: args.subdomain });
    },
    });
export const addPage = mutation({
    args: { collectionId: v.id("collections"), pageId: v.id("pages") },
    handler: async (ctx, args) => {
        return await ctx.table("collections").getX(args.collectionId).patch({ pages: {add: [args.pageId]} });
    },
    });