import { v } from "convex/values";
import { mutation, query } from "./functions";
import slugify from "slugify";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.table("blogPosts");
    },
    });

export const get = query({
    args: {id: v.id("blogPosts")},
    handler: async (ctx, args) => {
        return await ctx.table("blogPosts").get(args.id);
    },
    });

export const create = mutation({
    args: {title: v.string(), content: v.string()},
    handler: async (ctx, args) => {
        const { title, content } = args;
        if(!ctx.userId  ) throw new Error("You must be logged in to create a blog post");
        return await ctx.table("blogPosts").insert({
            title,
            content,
            slug: slugify(title, {lower: true}),
            userId : ctx.userId,
            isPublished: false,

        });
    },
    });

