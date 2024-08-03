import { v } from "convex/values";

import { internalMutation, mutation, query } from "./functions";

export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.table("users").get(args.userId);
  },
});

export const getByTokenIdentifier = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    return await ctx.table("users").get("tokenIdentifier", args.tokenIdentifier);
  },
});

export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.user();
    return user;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.table("users")
  },
});

export const update = mutation({
  args: { id: v.id("users"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    await ctx.table("users").getX(args.id).patch({ [args.field]: args.value });
  },
});

export const createUser = internalMutation({
  args: {
    email: v.string(),
    tokenIdentifier: v.string(),
    name: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { tokenIdentifier, email, name, imageUrl } = args;
    const user = await ctx.table("users").insert({
      tokenIdentifier,
      email,
      name,
      imageUrl,
      role: "USER",
      uploads: [],
    });
  },
});

export const getMyHubs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx
      .table("members")
      .filter((q) => q.eq(q.field("userId"), ctx.userId))
      .map(async (member) => {
        return {
          ...(await member.edge("hub")),
          role: await member.edge("role"),
        };
      });
  },
});
export const addUpload = mutation({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
        const user = await ctx.userX()
        const uploads = [...user.uploads, args.storageId]
        await user.patch({"uploads": uploads})
        return uploads
    }
});
export const getUploads = query({
    args: { },
    handler: async (ctx, args) => {
        const user = await ctx.user()
        if (!user || !user.uploads) {
            return []
        }


        return await Promise.all(user.uploads.map(async (upload) => {
            return await ctx.storage.getUrl(upload)
        }
        ))
        }

    });

// export const updateSubscription = internalMutation({
//   args: { subscriptionId: v.string(), userId: v.string(), endsOn: v.number() },
//   handler: async (ctx, args) => {
//     const user = await getFullUser(ctx, args.userId);

//     if (!user) {
//       throw new Error("no user found with that user id");
//     }

//     await ctx.db.patch(user._id, {
//       subscriptionId: args.subscriptionId,
//       endsOn: args.endsOn,
//     });
//   },
// });

// export const updateSubscriptionBySubId = internalMutation({
//   args: { subscriptionId: v.string(), endsOn: v.number() },
//   handler: async (ctx, args) => {
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_subscriptionId", (q) =>
//         q.eq("subscriptionId", args.subscriptionId)
//       )
//       .first();

//     if (!user) {
//       throw new Error("no user found with that user id");
//     }

//     await ctx.db.patch(user._id, {
//       endsOn: args.endsOn,
//     });
//   },
// });
