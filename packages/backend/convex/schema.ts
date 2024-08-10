import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";
import { v } from "convex/values";

import {
  banner,
  field,
  fieldOptions,
  fieldType,
  icon,
  inviteStatus,
  pageType,
  permissions,
  role,
  supportTicketStatus,
  tier,
} from "./types";
import { flagKey } from "./seed/flags";

const schema = defineEntSchema({
  users: defineEnt({
    name: v.string(),
    imageUrl: v.string(),
    role: role,
    uploads: v.array(v.id("_storage")),
    pageVisits: v.array(v.id("pages")),
  })
    .field("email", v.string(), { unique: true })
    .field("tokenIdentifier", v.string(), { unique: true })
    .edges("memberships", { to: "members", ref: true })
    .edges("sentMessages", { to: "messages", ref: "senderId" })
    .edges("receivedMessages", { to: "messages", ref: "receiverId" })
    .edges("notifications", { ref: true })
    .edges("meetings")
    .edges("meetingInvites", { ref: true })
    .edges("blogPosts", { ref: true })
    .edges("hubInvites", { ref: true })
    .edges("supportTickets", { ref: true }),
  hubs: defineEnt({
    name: v.string(),
    description: v.optional(v.string()),
    icon: icon,
    banner: banner,
    fields: v.array(field),
    brandingColor: v.string(),
    content: v.string(), // JSON stringified object (blockquote json structure for markdown)
    isPublic: v.boolean(),
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    credits: v.optional(v.number()),
    tier: tier,
    features: v.optional(
      v.object({
        customRoles: v.boolean(),
        customBranding: v.boolean(),
      }),
    ),
    updatedAt: v.number(),
    embedding: v.optional(v.array(v.float64())),
  })
    .field("subdomain", v.string(), { unique: true })
    .field("customDomain", v.optional(v.string()))
    .edges("members", { ref: true })
    .edges("hubInvites", { ref: true })
    .edges("roles", { ref: true })
    .edges("pages", { ref: true })
    .edges("collections", { ref: true })
    .edges("inviteRequests", { ref: true })
    .edges("emailTemplates", { ref: true })
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["isPublic"],
    }),

  roles: defineEnt({
    name: v.string(),
    isLocked: v.boolean(),
    icon: icon,
    permissions: permissions,
  })
    .edge("hub")
    .edges("members", { ref: true })
    .edges("hubInvites", { ref: true })
    .edges("inviteRequests", { ref: true }),
  hubInvites: defineEnt({
    user: v.optional(v.id("users")),
    message: v.optional(v.string()),
    status: inviteStatus,
    expiresAt: v.number(),
  })
    .field("inviteToken", v.string(), { unique: true })
    .field("email", v.string(), { unique: true })
    .edge("role")
    .edge("hub")
    .edge("inviter", { to: "users", field: "userId" }),
  inviteRequests: defineEnt({
    user: v.optional(v.id("users")),
    message: v.optional(v.string()),
  })
    .field("email", v.string(), { unique: true })
    .edge("role").edge("hub"),

  members: defineEnt({})
    .edge("user")
    .edge("hub")
    .edge("role")
    .edges("pages", { ref: true }),
  pages: defineEnt({
    name: v.string(),
    type: pageType,
    banner: banner,
    icon: icon,
    fields: v.array(field),
    content: v.string(), // JSON stringified object (blockquote json structure for markdown)
    isPublic: v.boolean(),
    isLocked: v.boolean(),
    updatedAt: v.number(),
    embedding: v.optional(v.array(v.float64())),
  })
    .edge("creator", { to: "members", field: "memberId" })
    .edges("collections")
    .edge("hub")
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["type", "hubId"],
    }),
  collections: defineEnt({
    name: v.string(),
    banner: banner,
    icon: icon,
    description: v.optional(v.string()),
    parentPage: v.optional(v.id("pages")),
  })
    .edge("hub")
    .edges("pages"),

  fields: defineEnt({
    name: v.string(),
    icon: icon,
    type: fieldType,
    isLocked: v.boolean(),
    isSuggested: v.boolean(),
    options: fieldOptions,
  }),
  messages: defineEnt({
    body: v.string(),
    readBy: v.array(v.id("users")),
    meetingInvite: v.optional(v.id("meetingInvites")),
    hubInvite: v.optional(v.id("hubInvites")),
  })
    .edge("sender", { to: "users", field: "senderId" })
    .edge("receiver", { to: "users", field: "receiverId" }),
  notifications: defineEnt({
    read: v.boolean(),
    title: v.string(),
    body: v.string(),
    actionPath: v.string(),
    icon: v.optional(v.string()),
  }).edge("user"),
  meetings: defineEnt({
    title: v.string(),
    description: v.optional(v.string()),
    notes: v.optional(v.string()),
    startsAt: v.number(),
    endsAt: v.number(),
    isPublic: v.boolean(),
  })
    .edges("participants", { to: "users" })
    .edges("meetingInvites", { ref: true }),
  meetingInvites: defineEnt({
    status: inviteStatus,
    expiresAt: v.number(),
  })
    .edge("meeting")
    .edge("user"),
  emailTemplates: defineEnt({
    title: v.string(),
    content: v.string(), // JSON stringified object
    previewText: v.optional(v.string()),
    from: v.optional(v.string()),
    replyTo: v.optional(v.string()),
  }).edge("hub"),
  blogPosts: defineEnt({
    title: v.string(),
    banner: banner,
    content: v.string(),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.number()),
  })
    .field("slug", v.string(), { unique: true })
    .edge("author", { to: "users", field: "userId" }),
  supportTickets: defineEnt({
    title: v.string(),
    body: v.string(),
    status: supportTicketStatus,
    response: v.optional(v.string()),
  }).edge("user"),
  flags: defineEnt({
    name: v.string(),
    description: v.string(),
    value : v.boolean(),
  }).field("key", flagKey, { unique: true }),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
