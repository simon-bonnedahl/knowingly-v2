import { v } from "convex/values";
import { mutation, query } from "./functions";

export const list = query({
    args: {userId: v.id("users")},
    handler: async (ctx, args) => {
        const user = await ctx.userX()
        const sentMessages = await user.edge("sentMessages").filter(q => q.eq(q.field("receiverId"), args.userId))
        const receivedMessages = await user.edge("receivedMessages").filter(q => q.eq(q.field("senderId"), args.userId))

        const messages = [...sentMessages, ...receivedMessages].sort((a, b) => a._creationTime - b._creationTime)
        return messages


    },

    });
export const getLatest = query({
    args: {userId: v.id("users")},
    handler: async (ctx, args) => {
        const user = await ctx.userX()
        const sentMessages = await user.edge("sentMessages").filter(q => q.eq(q.field("receiverId"), args.userId))
        const receivedMessages = await user.edge("receivedMessages").filter(q => q.eq(q.field("senderId"), args.userId))

        const messages = [...sentMessages, ...receivedMessages].sort((a, b) => a._creationTime - b._creationTime)
        return messages[messages.length - 1]

    },
    });
export const send = mutation({
    args: {receiverId: v.id("users"), body: v.string()},
    handler: async (ctx, args) => {
        if(!ctx.userId) throw new Error("Unauthorized")
        await ctx.table("messages").insert({
            senderId: ctx.userId,
            receiverId: args.receiverId,
            body: args.body,
            readBy: [ctx.userId],
        })
    },
    });
export const getUnreadCount = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.user()
        if(!user) return 0
        const receivedMessages = await user.edge("receivedMessages")
        let unreadCount = 0
        for(const message of receivedMessages) {
            if(!message.readBy.includes(user._id)) {
                unreadCount++
            }
        }
        return unreadCount

    },
    });
export const markAllAsRead = mutation({
    args: {receiverId: v.id("users")},
    handler: async (ctx, args) => {
        const user = await ctx.userX()
        const messages = await user.edge("receivedMessages").filter(q => q.and(q.eq(q.field("readBy"), [args.receiverId]) ,q.eq(q.field("receiverId"), args.receiverId))).map(async (message) => {
            return await ctx.table("messages").getX(message._id).patch({readBy: [args.receiverId]})
        }
        )
    }
    });

export const getConversations = query({
    args: {},
    handler: async (ctx, args) => {
        const conversationOpponentIds = await ctx.table("messages").filter(q => q.or(q.eq(q.field("senderId"), ctx.userId), q.eq(q.field("receiverId"), ctx.userId))).map( (message) => message.senderId === ctx.userId ? message.receiverId : message.senderId)
        
        const uniqueOpponentIds = Array.from(new Set(conversationOpponentIds))
        const conversations = await Promise.all(uniqueOpponentIds.map(async (opponentId) => {
            const opponent = await ctx.table("users").get(opponentId)
            const lastMessage = await ctx.table("messages").filter(q => q.and(q.or(q.eq(q.field("senderId"), ctx.userId), q.eq(q.field("receiverId"), ctx.userId)), q.or(q.eq(q.field("senderId"), opponentId), q.eq(q.field("receiverId"), opponentId)))).order("desc").first()
            return {opponent, lastMessage}
        }))
        return conversations 

        
    },
    });