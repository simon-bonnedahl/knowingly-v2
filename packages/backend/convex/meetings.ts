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
    const user = await ctx.userX();
    const meeting = await ctx
      .table("meetings")
      .insert({
        title,
        description,
        startsAt,
        endsAt: startsAt + length,
        isPublic,
        notes,
        participants: [ctx.userId!],
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
        title: `${user.name } invited you to a meeting`,
        icon: user.imageUrl,
        read: false,
        body: `You have been invited to a meeting by ${user.name}`,
        actionPath: `/meetings/${meeting._id}`,
        userId,
      })
  return meeting;
    },
});

export const createInstant = mutation({
  args: {
  },
  handler: async (ctx, args) => {
    const length = 1000 * 60 * 30; // 30 minutes
    const user = await ctx.userX();
    const meeting = await ctx
      .table("meetings")
      .insert({
        title: "Instant Meeting",
        description : "Instant Meeting created by " + user.name,
        startsAt: Date.now(),
        endsAt: Date.now() + length,
        isPublic : false,
        participants: [ctx.userId!],
      })
      .get();
  return meeting;
    },
});

export const get = query({
    args: { meetingId: v.id("meetings") },
    handler: async (ctx, args) => {
        return await ctx.table("meetings").get(args.meetingId);
    },
    });
export const list = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.userX();
        const meetings =  await user.edge("meetings").map(async (meeting) => ({
            ...meeting,
                participants: await meeting.edge("participants")
        }))
        return meetings.sort((a, b) => a.startsAt - b.startsAt);
    }}
);
export const upcomingCount = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.user();
        if(!user) return 0;
        const meetings =  await user.edge("meetings")
        return meetings.filter((meeting) => meeting.startsAt > Date.now()).length;
    }}
);

export const getInvites = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.userX();
        const invites =  await user.edge("meetingInvites").map(async (invite) => {
            const meeting = await invite.edge("meeting")
            return {
                ...invite,
                meeting: {
                    ...meeting,
                    participants: await meeting.edge("participants")
                },
            };
        })
        return invites.sort((a, b) => a._creationTime - b._creationTime).filter((invite) => invite.meeting.startsAt > Date.now());
    },
});