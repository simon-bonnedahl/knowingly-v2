import { ConvexError, v } from "convex/values";

import { mutation } from "./functions";
import {  defaultPageContent } from "./constants";

export const update = mutation({
  args: { id: v.id("members"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { id, field, value } = args;
    const member = await ctx.table("members").getX(id)
    const hub = await member.edge("hub")
    const permissions = await ctx.permissions(hub._id);
    if(!permissions.canEditRole && !permissions.canDoAnything) throw new ConvexError("You do not have permission to do that");
    await member.patch({ [field]: value });
    return;
  },
});
export const create = mutation({
  args: { userId: v.id("users"), hubId: v.id("hubs"), roleId: v.id("roles") },
  handler: async (ctx, args) => {
    const { userId, hubId, roleId } = args;
    const user = await ctx.table("users").getX(userId);
    const hub = await ctx.table("hubs").getX(hubId);
    const member = await ctx
      .table("members")
      .insert({ userId, hubId, roleId })
      .get();
   
    const profilePage = await ctx
      .table("pages")
      .insert({
        icon: { type: "URL", value: user.imageUrl },
        banner: hub.banner,
        name: user.name,
        type: "PROFILE",
        memberId: member._id,
        hubId,
        isPublic: true,
        content: defaultPageContent("PROFILE"),
        updatedAt: Date.now(),
        fields: [],
        isLocked: false,
      })
      .get();
     return profilePage;
  },
});
