import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";
import { v } from "convex/values";

const schema = defineEntSchema({
  users: defineEnt({
    name: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("USER"), v.literal("SUPERUSER")),
    uploads : v.array(v.id("_storage")),
  })
    .field("email", v.string(), { unique: true })
    .field("tokenIdentifier", v.string(), { unique: true })
    .edges("memberships", { to: "members", ref: true })
    .edges("sentMessages", { to: "messages", ref: "senderId" })
    .edges("receivedMessages", { to: "messages", ref: "receiverId" })
    .edges("notifications", { ref: true })
    .edges("meetings")
    .edges("meetingInvites", { ref: true })
    .deletion("soft"),
  hubs: defineEnt({
    name: v.string(),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    banner: v.optional(v.string()),
    brandingColor: v.optional(v.string()),
    customContent: v.optional(v.string()), // JSON stringified object (blockquote json structure for markdown)
    isPublic: v.boolean(),
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    credits: v.number(),
    features: v.optional(
      v.object({
        customRoles: v.boolean(),
        customBranding: v.boolean(),
      }),
    ),
  })
    .field("subdomain", v.string(), { unique: true })
    .field("customDomain", v.optional(v.string()), { unique: true })
    .edges("members", { ref: true })
    .edges("hubInvites", { ref: true })
    .edges("roles")
    .edges("pages", { ref: true })
    .edges("customFields")
    .deletion("scheduled", { delayMs: 24 * 60 * 60 * 1000 }),

  roles: defineEnt({
    name: v.string(),
    isDefault: v.boolean(),
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
      canSeeAdminPanel: v.boolean(),
      canEditHub: v.boolean(),
      canDeleteHub: v.boolean(),
    }),
  })
    .edges("hubs")
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
  .field("email", v.string(), {unique: true})
    .edge("role")
    .edge("hub"),

  members: defineEnt({})
    .edge("user")
    .edge("hub")
    .edge("role")
    .edges("pages", { ref: true })
    .deletion("soft"),
  pages: defineEnt({
    name: v.string(),
    type: v.union(
      v.literal("PROFILE"),
      v.literal("EVENT"),
      v.literal("TEMPLATE"),
      v.literal("CUSTOM"),
    ),
    image: v.optional(v.string()),
    icon: v.optional(v.string()),
    customFields: v.array(
      v.object({
        id: v.id("customFields"),
        value: v.optional(
          v.union(v.string(), v.number(), v.boolean(), v.array(v.string())),
        ),
      }),
    ),
    customContent: v.optional(v.string()), // JSON stringified object (blockquote json structure for markdown)
    isPublic: v.boolean(),
    isLocked: v.boolean(),
  })
    .field("slug", v.string(), { unique: true })
    .edge("member")
    .edge("hub"),
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
    .field("slug", v.string(), { unique: true })
    .searchIndex("search_slug", {
      searchField: "slug",
    })
    .edges("hubs"),
  messages: defineEnt({
    body: v.string(),
    readBy : v.array(v.id("users")),
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
    status: v.union(v.literal("PENDING"), v.literal("ACCEPTED"), v.literal("DECLINED")),
    expiresAt: v.number(),
  })
    .edge("meeting")
    .edge("user"),

});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
