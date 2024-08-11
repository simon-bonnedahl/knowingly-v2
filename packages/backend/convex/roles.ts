import { ConvexError, v } from "convex/values";

import { mutation, query } from "./functions";
import { defaultRoles } from "./constants";


export const update = mutation({
  args: { roleId: v.id("roles"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { roleId, field, value } = args;
    const role = await ctx.table("roles").getX(roleId);
    const hub = await role.edge("hub")
    const permissions = await ctx.permissions(hub._id);
    if(!permissions.canEditRole && !permissions.canDoAnything) throw new ConvexError("You do not have permission to do that");
    await role.patch({ [field]: value });
    return role;
  },
});

export const getMine = query({
  args: {subdomain: v.string()},
  handler: async (ctx, args) => {
    const user = await ctx.user();
    if(!user) return null;
    const hub = await ctx.table("hubs").get("subdomain", args.subdomain);
    if(!hub) return null;
    const role = await user?.edge("memberships").filter(q => q.eq(q.field("hubId"), hub._id)).first().edge("role");
    return role;
  },
});

export const create = mutation({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const hub = await ctx.table("hubs").get("subdomain", args.subdomain);
    if (!hub) throw new ConvexError("Hub not found");
    const permissions = await ctx.permissions(hub._id);
    if(!permissions.canEditRole && !permissions.canDoAnything) throw new ConvexError("You do not have permission to do that");
    return await ctx.table("roles").insert({
      ...defaultRoles.viewer,
      name: "New Role",
      hubId: hub._id,
    });
  },
});
export const remove = mutation({
  args: { roleId: v.id("roles") },
  handler: async (ctx, args) => {
    const role = await ctx.table("roles").getX(args.roleId);
    const hub = await role.edge("hub");
    const permissions = await ctx.permissions(hub._id);
    if(!permissions.canEditRole && !permissions.canDoAnything) throw new ConvexError("You do not have permission to do that");
    return await role.delete();
  },
});
