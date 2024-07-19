import { v } from "convex/values";

import { api, internal } from "./_generated/api";
import { action } from "./_generated/server";
import { mutation, query } from "./functions";

export const get = query({
  args: { id: v.id("hubInvites") },
  handler: async (ctx, args) => {
    return await ctx.table("hubInvites").get(args.id);
  },
});
export const create = mutation({
  args: { hubId: v.id("hubs"),  roleId: v.id("roles"), email: v.string(), message: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const { hubId, roleId, email } = args;
    const user = await ctx.table("users").get("email", email);
    const status = "PENDING";
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    const hubInvite = await ctx
      .table("hubInvites")
      .insert({ hubId, roleId, user: user?._id, email, status, expiresAt , message: args.message})
      .get();

    return hubInvite;
  },
});

export const update = mutation({
  args: {id: v.id("hubInvites"), field: v.string(), value: v.any()},
  handler: async (ctx, args) => {
    const {id, field, value} = args;
    const invite = await ctx.table("hubInvites").getX(id).patch({[field]: value});
    return invite;
  },
});

export const send = action({
  args: { subdomain: v.string(), roleId: v.id("roles"), email: v.string(), message: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getMe);
    const hub = await ctx.runQuery(api.hubs.getHub, { subdomain: args.subdomain });
    if (!hub) throw new Error("Hub not found");

    const hubInvite = await ctx.runMutation(api.hubInvites.create, {hubId: hub._id, roleId: args.roleId, email: args.email, message: args.message});
    if (hubInvite.user) {
      const title = `${user ? user.name : "Someone"} has invited you to join a hub`;
      const body = `You have been invited to join a hub. Click here to view the invite`;
      const actionPath = `/hub-invites/${hubInvite._id}`;
      await ctx.runMutation(internal.notifications.create, {
        title,
        body,
        actionPath,
        userId: hubInvite.user,
        icon: user?.imageUrl ?? hub?.logo 
      });
    }
    //TODO: send email
    //TODO: do something with message
  },
});
