import { ConvexError, v } from "convex/values";

import { api } from "./_generated/api";
import { action, mutation, query } from "./functions";

export const get = query({
  args: {
    id: v.id("inviteRequests"),
  },
  handler: async (ctx, args) => {
    return ctx.table("inviteRequests").get(args.id);
  },
});

export const create = mutation({
  args: {
    email: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    hubId: v.id("hubs"),
    roleId: v.id("roles"),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.userId && !args.email) {
      throw new ConvexError("Required parameter missing");
    }
    const user = args.userId
      ? await ctx.table("users").getX(args.userId)
      : null;

    await ctx.table("inviteRequests").insert({
      user: user?._id,
      email: (args.email ?? user?.email)!,
      roleId: args.roleId,
      hubId: args.hubId,
      message: args.message,
    });
    //create notifications for all hub admins and owners
    //TODO: schedule ?
    const hub = await ctx.table("hubs").getX(args.hubId);
    const rolesToNotify = await ctx
      .table("roles")
      .filter((q) =>
        q.and(
          q.eq(q.field("hubId"), args.hubId),
          q.eq(q.field("permissions.canInviteMember"), true),
        ),
      );

    const members = await ctx.table("hubs").get(args.hubId).edge("members");
    if (!members) return;

    for (const member of members) {
      if (!rolesToNotify.find((role) => role._id === member.roleId)) continue;
      await ctx.table("notifications").insert({
        title: `New invite request to join  ${hub.name}`,
        body: `${user?.name} has sent a request to join ${hub.name}`,
        actionPath: `https://${hub.subdomain}.simbo.casa/admin/requests`, //TODO: change to relative path from root env?
        userId: member.userId,
        icon: user?.imageUrl ?? hub?.icon.value ?? "/logo-small-black.svg",
        read: false,
      });
    }
  },
});

export const list = query({
  args: {
    hubId: v.optional(v.id("hubs")),
    subdomain: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if(!args.hubId && !args.subdomain) throw new ConvexError("Required parameter missing");
    const hub = args.hubId ? await ctx.table("hubs").getX(args.hubId) : await ctx.table("hubs").get("subdomain", args.subdomain!);
    if (!hub) throw new ConvexError("Hub not found");
    return await hub.edge("inviteRequests")
        .map(async (inviteRequest) => {
            return {
            ...inviteRequest,
            role: await ctx.table("roles").getX(inviteRequest.roleId),
            };
        });

  },
});

export const remove = mutation({
  args: {
    id: v.id("inviteRequests"),
  },
  handler: async (ctx, args) => {
    await ctx.table("inviteRequests").getX(args.id).delete();
  },
});

export const accept = action({
  args: {
    id: v.id("inviteRequests"),
  },
  handler: async (ctx, args) => {
    const inviteRequest = await ctx.runQuery(api.inviteRequests.get, {
      id: args.id,
    });
    if (!inviteRequest) {
      throw new ConvexError("Invite request not found");
    }

    await ctx.runAction(api.hubInvites.send, {
      hubId: inviteRequest.hubId,
      roleId: inviteRequest.roleId,
      email: inviteRequest.email,
      message: "",
    });

    await ctx.runMutation(api.inviteRequests.remove, {
      id: args.id,
    });
  },
});
