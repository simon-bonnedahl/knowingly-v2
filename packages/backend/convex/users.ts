import { v } from "convex/values";

import { internalMutation, mutation, query } from "./functions";

export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.table("users").get(args.userId);
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
      email,
      name,
      imageUrl,
      role: "USER",
      uploads: [],
      pageVisits: [],
    });
    // fetch all hub invites for this email and create notifications
    const hubInvites = await ctx.table("hubInvites").filter((q) =>
      q.eq(q.field("email"), email)
    );
    await Promise.all(
      hubInvites.map(async (invite) => {
        await invite.patch({ user });
        const inviter = await invite.edge("inviter");
        const title = `${inviter.name} has invited you to join a hub`;
        const body = `You have been invited to join a hub. Click here to view the invite`;
        const actionPath = `/?invite=${invite.inviteToken}`;
        await ctx.table("notifications").insert({
          title,
          body,
          actionPath,
          userId: user,
          icon: inviter.imageUrl,
          read : false
        });
        })
    );
  },
});

// export const getMyHubs = query({
//   args: {userId : v.optional(v.id("users"))},
//   handler: async (ctxm ) => {
//     return await ctx
//       .table("members")
//       .filter((q) => q.eq(q.field("userId"), ctx.userId))
//       .map(async (member) => {
//         return {
//           ...(await member.edge("hub")),
//           role: await member.edge("role"),
//         };
//       });
//   },
// });
export const getHubs = query({
  args: {userId : v.optional(v.id("users"))},
  handler: async (ctx, args) => {
    const user = args.userId ? await ctx.table("users").get(args.userId) : await ctx.user()
    const memberships = await user?.edge("memberships")
    if (!memberships) {
      return []
    }
    return await Promise.all(memberships.map(async (membership) => {
      return {
        ... await membership.edge("hub"),
        role: await membership.edge("role")

      }
    }
    ))
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

        const uploads =  await Promise.all(user.uploads.map(async (upload) => {
            return await ctx.storage.getUrl(upload)
        }
        ))
        return uploads.filter((u) => u !== null)
        }

    });
export const getMyProfile = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const hub = await ctx.table("hubs").get("subdomain", args.subdomain)
        const user =  await ctx.user()
        const membership = await user?.edge("memberships").filter((q) => q.eq(q.field("hubId"), hub?._id)).first()
        if (!membership) {
            return null
        }
        return await membership.edge("pages").filter((q) => q.eq(q.field("type"), "PROFILE")).first()
    }
})

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
