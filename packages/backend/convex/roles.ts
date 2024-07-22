import { v } from "convex/values";

import { mutation } from "./functions";

export const update = mutation({
  args: { roleId: v.id("roles"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const { roleId, field, value } = args;
    const role = await ctx
      .table("roles")
      .getX(roleId)
      .patch({ [field]: value });
    return role;
  },
});

export const create = mutation({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const hub = await ctx.table("hubs").get("subdomain", args.subdomain);
    if (!hub) throw new Error("Hub not found");
    return await ctx.table("roles").insert({
      name: "New Role",
      isDefault: false,
      isLocked: false,
      permissions: {
        canCreatePage: false,
        canEditPage: false,
        canDeletePage: false,
        canCreateCustomField: false,
        canEditCustomField: false,
        canDeleteCustomField: false,
        canInviteMember: false,
        canRemoveMember: false,
        canSeeAdminPanel: false,
        canEditHub: false,
        canDeleteHub: false,
      },
      hubs: [hub._id],
    });
  },
});
