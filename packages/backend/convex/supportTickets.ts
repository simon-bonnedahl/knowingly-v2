import { v } from "convex/values";
import { supportCategory } from "./types";
import { mutation, query } from "./functions";


export const create = mutation({
    args : {
        category: supportCategory,
        title: v.string(),
        body: v.string(),
        files: v.array(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const user = await ctx.userX();
        return ctx.table("supportTickets").insert({
            ...args,
            status: "PENDING",
            userId: user._id,
        })
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.table("supportTickets").map(async (ticket) => {
        return {
          ...ticket,
          user: await ticket.edge("user"),
          files: await Promise.all(ticket.files.map(async (file) => {
            return await ctx.storage.getUrl(file);
          }))
          
        };
      });
    }
  });
  

  export const _delete = mutation({
    args: { id: v.id("supportTickets") },
    handler: async (ctx, args) => {
      return await ctx.table("supportTickets").getX(args.id).delete();
    }
    });