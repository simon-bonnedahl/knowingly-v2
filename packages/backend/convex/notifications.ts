import { v } from "convex/values";
import { internalMutation, mutation, query } from "./functions";

export const create = internalMutation({
    args: { userId : v.id("users"), title: v.string(), body: v.string(), actionPath: v.string(), icon: v.optional(v.string()) },
    handler: async (ctx, args) => {
        return await ctx.table("notifications").insert({
            userId: args.userId,
            title: args.title,
            body: args.body,
            actionPath: args.actionPath,
            icon: args.icon,
            read: false,
        });

    },
});

export const markAsRead = mutation({
    args: { id: v.id("notifications") },
    handler: async (ctx, args) => {
        return await ctx.table("notifications").getX(args.id).patch({"read": true});
    },
});

export const list = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.user();
        const notifications = await user?.edge("notifications").order("desc")
        return notifications;
    },
});

export const latest = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.user();
        return await user?.edge("notifications").order("desc").first();
    },
});

export const getUnreadCount = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.user();
        const notifications = await user?.edge("notifications");
        return notifications?.filter((notification) => !notification.read).length;
    },
});