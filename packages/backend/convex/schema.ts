import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";
import { v } from "convex/values";

export const pageTypes = v.union(
  v.literal("PROFILE"),
  v.literal("EVENT"),
  v.literal("TEMPLATE"),
  v.literal("CUSTOM"),
);

const schema = defineEntSchema({
  users: defineEnt({
    name: v.string(),
    imageUrl: v.string(),
    role: v.union(v.literal("USER"), v.literal("SUPERUSER")),
    uploads: v.array(v.id("_storage")),
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
    .edges("hubInvites", { ref: true }),
  hubs: defineEnt({
    name: v.string(),
    description: v.optional(v.string()),
    logo: v.string(), // Can be URL or emoji
    banner: v.string(),
    brandingColor: v.string(),
    customContent: v.string(), // JSON stringified object (blockquote json structure for markdown)
    isPublic: v.boolean(),
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    credits: v.optional(v.number()),
    tier: v.union(v.literal("FREE"), v.literal("PRO"), v.literal("ENTERPRISE")),
    features: v.optional(
      v.object({
        customRoles: v.boolean(),
        customBranding: v.boolean(),
      }),
    ),
  })
    .field("subdomain", v.string(), { unique: true })
    .field("customDomain", v.optional(v.string()))
    .edges("members", { ref: true })
    .edges("hubInvites", { ref: true })
    .edges("roles", { ref: true })
    .edges("pages", { ref: true })
    .edges("customFields")
    .edges("emailTemplates", { ref: true }),

  roles: defineEnt({
    name: v.string(),
    isLocked: v.boolean(),
    icon: v.optional(v.string()),
    permissions: v.object({
      canCreatePage: v.boolean(),
      canEditPage: v.boolean(),
      canDeletePage: v.boolean(),
      canCreateCustomField: v.boolean(),
      canEditCustomField: v.boolean(),
      canDeleteCustomField: v.boolean(),
      canInviteMember: v.boolean(),
      canRemoveMember: v.boolean(),
      canEditRole: v.boolean(),
      canSeeAdminPanel: v.boolean(),
      canEditHub: v.boolean(),
      canDeleteHub: v.boolean(),
    }),
  })
    .edge("hub")
    .edges("members", { ref: true })
    .edges("hubInvites", { ref: true }),
  hubInvites: defineEnt({
    user: v.optional(v.id("users")),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("PENDING"),
      v.literal("ACCEPTED"),
      v.literal("DECLINED"),
      v.literal("EXPIRED"),
    ),
    expiresAt: v.number(),
  })
    .field("inviteToken", v.string(), { unique: true })
    .field("email", v.string(), { unique: true })
    .edge("role")
    .edge("hub")
    .edge("inviter", { to: "users", field: "userId" }),

  members: defineEnt({})
    .edge("user")
    .edge("hub")
    .edge("role")
    .edges("pages", { ref: true }),
  pages: defineEnt({
    name: v.string(),
    type: pageTypes,
    image: v.optional(v.string()),
    icon: v.optional(v.string()), // Can be URL or emoji
    customFields: v.array(
      v.object({
        id: v.id("customFields"),
        value: v.union(
          v.string(),
          v.number(),
          v.boolean(),
          v.array(v.string()),
        ),
      }),
    ),
    customContent: v.string(), // JSON stringified object (blockquote json structure for markdown)
    isPublic: v.boolean(),
    isLocked: v.boolean(),
    embedding: v.optional(v.array(v.float64())),
    updatedEmbedding: v.boolean(),
  })
    .field("slug", v.string(), { unique: true })
    .edge("member")
    .edge("hub")
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["type", "hubId"],
    }),
  customFields: defineEnt({
    name: v.string(),
    icon: v.optional(v.string()),
    type: v.string(), //  text, number, status, select, multi-select, image, file etc..
    isLocked: v.boolean(),
    isSuggested: v.boolean(),
    options: v.optional(
      v.object({
        suggestions: v.optional(v.array(v.string())),
        format: v.optional(v.string()),
        showAs: v.optional(v.string()),
      }),
    ), //  JSON stringified object (own rules) ex. { "format": any, "suggestions": any,  }
  })
    .field("slug", v.string()) //Remove this? What is it used for?
    .searchIndex("search_slug", {
      searchField: "slug",
    })
    .edges("hubs"),
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
    status: v.union(
      v.literal("PENDING"),
      v.literal("ACCEPTED"),
      v.literal("DECLINED"),
    ),
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
    banner: v.string(),
    content: v.string(),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.number()),
  })
    .field("slug", v.string(), { unique: true })
    .edge("author", { to: "users", field: "userId" }),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
