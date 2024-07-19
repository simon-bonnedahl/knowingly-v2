

import { v } from "convex/values";
import { mutation, query } from "./functions";
import { v4 as uuid } from "uuid";
import slugify from "slugify";

export const createPage = mutation({
    args: {name: v.string(), subdomain: v.string()},
    handler: async (ctx, args) => {
     if(!ctx.userId) throw new Error("Unauthorized");
      const {name, subdomain} = args;
      const hub = await ctx.table("hubs").getX("subdomain", subdomain);
      let slug = name.toLowerCase().replace(/\s/g, "-");

      const pageExists = await ctx.table("pages").get("slug", slug);
      if(pageExists) slug = `${slug}-${uuid()}`;

      const member = await ctx.table("users").get(ctx.userId).edge("memberships").filter(q => q.eq(q.field("hubId"), hub._id)).unique();
    
      if(!member) throw new Error("Unauthorized");

      const page = await ctx.table("pages").insert({
        name,
        slug,
        hubId: hub._id,
        type: "PROFILE",
        isPublic: true,
        isLocked: false,
        customFields: [],
        memberId: member._id,
      }).get();
      return page;
    },
  });
export const getPage = query({
    args: {slug : v.string() },
    handler: async (ctx, args) => {
      const page = ctx.table("pages").get("slug", args.slug);
      return page;
    },
  });
export const getPagesByHub = query({
    args: {subdomain : v.string() },
    handler: async (ctx, args) => {
      const pages = await ctx.table("hubs").get("subdomain", args.subdomain).edge("pages")
      return pages;
    },
  });

  export const update = mutation({
    args: {slug: v.string(), field: v.string(), value: v.any()},
    handler: async (ctx, args) => {
      //  if(field === "customFields") {
      //   embedd
      //  }
      const {slug, field, value} = args;
      const page = await ctx.table("pages").getX("slug", slug).patch({[field]: value});
      return page;
    },
  });

  export const addCustomField = mutation({
    args: { slug : v.string() },
    handler: async (ctx, args) => {
      const slug = `text-${uuid().slice(0, 3)}`;
      const customField = await ctx.table("customFields").insert({
        name: "New Field",
        slug,
        icon : "alignLeft",
        type: "text",
        isLocked: false,
        isSuggested: false,

      }).get();
      return customField;
    },
  });

  export const getCreator = query({
    args: {slug: v.string()},
    handler: async (ctx, args) => {
      const user = await ctx.table("pages").get("slug", args.slug).edge("member").edge("user");
      return user;
    },
  });