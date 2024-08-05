import { v } from "convex/values";

import { mutation, query } from "./functions";

export const get = query({
  args: { id: v.id("fields") },
  handler: async (ctx, args) => {
    return await ctx.table("fields").get(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("fields"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { id, field, value } = args;

    return await ctx
      .table("fields")
      .getX(id)
      .patch({ [field]: value });
  },
});

export const create = mutation({
  args: {},
  handler: async (ctx, args) => {
    return await ctx
      .table("fields")
      .insert({
        name: "New Field",
        icon: {
          type: "ICON",
          value: "alignLeft",
        },
        type: "TEXT",
        isLocked: false,
        isSuggested: false,
        options: {},
      })
     
  },
});
