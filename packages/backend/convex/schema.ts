import { defineEntSchema, defineEnt, getEntDefinitions } from "convex-ents";

import { v } from "convex/values";

const schema = defineEntSchema({
  users: defineEnt({
    name: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("USER"), v.literal("SUPERUSER")),
  })
    .field("email", v.string(), { unique: true })
    .field("tokenIdentifier", v.string(), { unique: true })
    .edges("members", { ref: true, deletion: "soft" })
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
  })
    .field("subdomain", v.string(), { unique: true })
    .field("customDomain", v.optional(v.string()), { unique: true })
    .edges("members", { ref: true })
    .edges("pages", { ref: true })
    .edges("customFields")
    .deletion("scheduled", { delayMs: 24 * 60 * 60 * 1000 }),
  members: defineEnt({
    role: v.union(
      v.literal("OWNER"),
      v.literal("ADMIN"),
      v.literal("PROVIDER"),
      v.literal("SEEKER")
    ),
    status: v.union(v.literal("ACTIVE"), v.literal("PENDING")),
  })
    .edge("user")
    .edge("hub")
    .edges("pages", { ref: true })
    .deletion("soft"),
  pages: defineEnt({
    name: v.string(),
    type: v.union(
      v.literal("PROFILE"),
      v.literal("EVENT"),
      v.literal("CUSTOM")
    ),
    image: v.optional(v.string()),
    icon: v.optional(v.string()),
    customFields: v.array(
      v.object({
        id: v.id("customFields"),
        value: v.union(
          v.string(),
          v.number(),
          v.boolean(),
          v.array(v.string()),
          v.null()
        ),
      })
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
      })
    ), //  JSON stringified object (own rules) ex. { "format": any, "suggestions": any,  }
  })
    .field("slug", v.string(), { unique: true })
    .searchIndex("search_name", {
      searchField: "name",
    })
    .edges("hubs"),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
