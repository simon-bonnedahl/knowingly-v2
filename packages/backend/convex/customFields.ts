import { v } from "convex/values";
import { mutation, query } from "./functions";
import slugify from "slugify";


export const get = query({
    args: { id: v.id("customFields") },
    handler: async (ctx, args) => {
        return await ctx.table("customFields").get(args.id);
    },
    });

export const update = mutation({
    args: { id: v.id("customFields"), field:v.string(), value: v.any() },
    handler: async (ctx, args) => {
        const {id, field, value} = args;
        // if(field === "name") {
        //     const customField = await ctx.table("customFields").get("slug", slugify(args.value, {lower: true}));
        //     if(customField) throw new Error("Custom field with this name already exists");
        //     return await ctx.table("customFields").getX("slug", slug).patch({[field]: value, slug: slugify(value, {lower: true})});

        // }

        return await ctx.table("customFields").getX(id).patch({[field]: value});
    },
    });