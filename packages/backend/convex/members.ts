import { ConvexError, v } from "convex/values";
import slugify from "slugify";
import { v4 as uuid } from "uuid";

import { mutation } from "./functions";
import { defaultCustomContent, defaultPageContent } from "./constants";

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
    let slug = slugify(user.name, { lower: true });

    const pageExists = await ctx.table("pages").get("slug", slug);
    if (pageExists) slug = `${slug}-${uuid()}`;

    const profilePage = await ctx
      .table("pages")
      .insert({
        slug: "heh",
        icon: user.imageUrl,
        image: hub.banner,
        name: user.name,
        type: "PROFILE",
        memberId: member._id,
        hubId,
        isPublic: true,
        customContent: defaultPageContent("PROFILE"),
        updatedEmbedding: false,
        customFields: [],
        isLocked: false,
      })
      .get();
     return profilePage;
  },
});
