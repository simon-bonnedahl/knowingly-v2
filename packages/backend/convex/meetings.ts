import { v } from "convex/values";

import { mutation, query } from "./functions";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startsAt: v.number(),
    length: v.number(),
    isPublic: v.boolean(),
    notes: v.optional(v.string()),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { title, description, startsAt, length, isPublic, notes, userId } =
      args;
    const meeting = await ctx
      .table("meetings")
      .insert({
        title,
        description,
        startsAt,
        endsAt: startsAt + length,
        isPublic,
        notes,
      })
      .get();
    const meetingInvite = await ctx
      .table("meetingInvites")
      .insert({
        status: "ACCEPTED",
        expiresAt: startsAt,
        meetingId: meeting._id,
        userId,
      });
    const notification = await ctx
      .table("notifications")
      .insert({
        title: `Meeting ${title} created`,
        read: false,
        body: `You have been invited to a meeting ${title}`,
        actionPath: `/meetings/${meeting._id}`,
        userId,
      })
  return meeting;
    },
});

export const get = query({
    args: { meetingId: v.id("meetings") },
    handler: async (ctx, args) => {
        return await ctx.table("meetings").get(args.meetingId);
    },
    });