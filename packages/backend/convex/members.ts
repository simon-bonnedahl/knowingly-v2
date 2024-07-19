import { v } from "convex/values";
import { mutation } from "./functions";

export const update = mutation({
    args: {id: v.id("members"), field: v.string(), value: v.any()},
    handler: async (ctx, args) => {
      const {id, field, value} = args;
      const member = await ctx.table("members").getX(id).patch({[field]: value});
      return member;
    },
  });
  