import { ConvexError, v } from "convex/values";

import { api, internal } from "./_generated/api";
import { action } from "./_generated/server";
import { mutation, query } from "./functions";
import { ActionBuilder } from "convex/server";

export const get = query({
  args: { inviteToken: v.string() },
  handler: async (ctx, args) => {
    const invite = await ctx
      .table("hubInvites")
      .get("inviteToken", args.inviteToken);
    if (!invite) return undefined;
    return {
      ...invite,
      user: invite.user ? await ctx.table("users").get(invite.user) : null,
      hub: await invite.edge("hub"),
      role: await invite.edge("role"),
    };
  },
});
export const create = mutation({
  args: {
    hubId: v.id("hubs"),
    roleId: v.id("roles"),
    email: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { hubId, roleId, email } = args;
    if(!ctx.userId) throw new ConvexError("Unauthorized");
    const user = await ctx.table("users").get("email", email);
    if(user) {
      const membership = await user.edge("memberships").filter(q => q.eq(q.field("hubId"), hubId));
      if(membership) throw new ConvexError("User is already a member of this hub");
    }
    const status = "PENDING";
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    const inviteToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const hubInvite = await ctx
      .table("hubInvites")
      .insert({
        hubId,
        roleId,
        user: user?._id,
        userId: ctx.userId,
        email,
        status,
        expiresAt,
        message: args.message,
        inviteToken,
      })
      .get();

    return hubInvite;
  },
});

export const update = mutation({
  args: { id: v.id("hubInvites"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { id, field, value } = args;
    const invite = await ctx
      .table("hubInvites")
      .getX(id)
      .patch({ [field]: value });
    return invite;
  },
});

export const send = action({
  args: {
    hubId: v.optional(v.id("hubs")),
    subdomain: v.optional(v.string()),
    roleId: v.id("roles"),
    email: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getMe);
    if(!user) throw new ConvexError("Unauthorized");
    const hub = await ctx.runQuery(api.hubs.get, {
      subdomain: args.subdomain,
      id: args.hubId,
    });
    if (!hub) throw new ConvexError("Hub not found");
    const hubInvite = await ctx.runMutation(api.hubInvites.create, {
      hubId: hub._id,
      roleId: args.roleId,
      email: args.email,
      message: args.message,
    });
    if (hubInvite.user) {
      const title = `${user.name} has invited you to join a hub`;
      const body = `You have been invited to join a hub. Click here to view the invite`;
      const actionPath = `https://${hub.subdomain}.simbo.casa/?invite=${hubInvite.inviteToken}`;  //TODO: change to relative path from root env?
      await ctx.runMutation(internal.notifications.create, {
        title,
        body,
        actionPath,
        userId: hubInvite.user,
        icon: user?.imageUrl ?? hub?.logo,
      });
    }
    return
    //TODO: send email
    //TODO: do something with message
  },
});

export const accept = action({
  args: { inviteToken: v.string() },
  handler: async (ctx, args) => {
    const tokenIdentifier = (await ctx.auth.getUserIdentity())?.subject;
    const user = await ctx.runQuery(api.users.getByTokenIdentifier, { tokenIdentifier });
    if (!user) throw new Error("User not found");
    //fetch invite
    const invite = await ctx.runQuery(api.hubInvites.get, { inviteToken: args.inviteToken });
    if (!invite) throw new Error("Invite not found");
    //update invite status
    await ctx.runMutation(api.hubInvites.update, { id: invite._id, field: "status", value: "ACCEPTED" });
    //create member
    const profilePage = await ctx.runMutation(api.members.create, {
      userId: user._id,
      hubId: invite.hub._id,
      roleId: invite.role._id,
    });
    if(!profilePage) throw new Error("Profile page not created");
    return profilePage;
  },
});