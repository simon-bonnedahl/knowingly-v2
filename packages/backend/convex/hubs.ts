import { v } from "convex/values";
import { mutation, query } from "./functions";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { PaginationOptions } from "convex/server";

export const create = mutation({
    args: {name: v.string(), subdomain: v.string(), description: v.optional(v.string()),  isPublic: v.boolean(), tier: v.union(v.literal("FREE"), v.literal("PRO"), v.literal("ENTERPRISE"))},
    handler: async (ctx, args) => {
      const customContent = '[{"id":"26f187a2-6470-4899-b555-25e124b38888","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"80d1b3a2-44ef-451a-9a6d-8ece731364b8","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center","level":2},"content":[{"type":"text","text":"Welcome to your new hub!","styles":{}}],"children":[]},{"id":"fb45c621-fd25-4557-a7db-1c5f5f7ecd94","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"51d7b532-9667-4e18-a42b-850cdf8ab136","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center"},"content":[{"type":"text","text":"This content is fully customizable with a \\"notion\\" style editor ⭐️","styles":{}}],"children":[]},{"id":"d8492284-be69-49ee-a5c5-4dd6c93796b8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center"},"content":[{"type":"text","text":"You can re-arrange blocks by dragging the handles on the left\\n","styles":{}}],"children":[]},{"id":"a0339710-7fbc-40ac-893c-77d936e06a2f","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"1e568ef3-cb6c-4199-9ad7-68c5ac41bbae","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"By pressing \\"/\\" you can find the available blocks to use.","styles":{"bold":true,"italic":true}}],"children":[]},{"id":"f1e9a5eb-bd5d-4cbb-a813-714dc152c455","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"c15c8606-c765-4288-b510-7adb96f45614","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"Few examples","styles":{"underline":true}}],"children":[]},{"id":"5ebceea2-ac7c-456c-a0b5-a321b2d7a3a8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"2745b9db-fb37-497a-bcc5-311247e22382","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Numbered List","styles":{}}],"children":[]},{"id":"ad4043d7-3846-4b6d-bec4-f583a8fc2bf8","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"👨‍🔧","styles":{}}],"children":[]},{"id":"8334d2e5-7bf3-47b7-ad60-e92b319242e5","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"👩🏻‍🍳","styles":{}}],"children":[]},{"id":"919aec10-5781-4585-9344-cdb926a7d9a5","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"264e9a0c-8fdf-4450-9214-122e0ff48d07","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Button","styles":{}}],"children":[]},{"id":"55f76be8-e654-4fa3-886f-7cc666a398da","type":"button","props":{"textAlignment":"left","actionPath":""},"content":[{"type":"text","text":"👉 Apply now!","styles":{}}],"children":[]},{"id":"9472e548-8cda-4270-8dbb-5000b42c7970","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"0e7328d5-e635-4121-895f-a83d6391a038","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Image","styles":{}}],"children":[]},{"id":"81e72b3d-49e9-423b-8b0c-55dfb9d77e98","type":"image","props":{"backgroundColor":"default","textAlignment":"left","name":"logo-fullwhite.svg","url":"https://confident-terrier-401.convex.site/api/image/kg2e5tzzacv5q4w2srxqevb6sx6xhb3t","caption":"","showPreview":true,"previewWidth":512},"children":[]},{"id":"96175989-28a0-431b-ab3f-037c51bc1283","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"1f0de711-8d1e-4f29-84a5-cc7f08c81a0c","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]';
      const banner = "https://confident-terrier-401.convex.site/api/image/kg281gzw7jkber065ny2nc19rn6xgx5n";
      const logo = "/logo-small-black.svg"
      const brandingColor = "#5c93e6"
      const {name, subdomain, description, isPublic, tier } = args;
      const user = await ctx.userX()
      const roles = await ctx.table("roles").filter(q => q.eq(q.field("isDefault"), true));
      const ownerRole = roles.find(role => role.name === "Owner");
      if(!ownerRole) throw new Error("Owner role not found");
      const hub = await ctx.table("hubs").insert({name, subdomain, description, isPublic, tier, customContent, banner, brandingColor,logo, roles: roles.map((role) => role._id)}).get();
      const member = await ctx.table("members").insert({hubId: hub._id, userId: user._id, roleId: ownerRole._id}).get();
      return hub
    },
  });
export const getHub = query({
    args: {subdomain : v.optional(v.string()), id: v.optional(v.id("hubs"))},
    handler: async (ctx, args) => {
      if (!args.id && !args.subdomain) throw new Error("id or subdomain is required");
      if(args.id)
        return await ctx.table("hubs").get(args.id);
      if(args.subdomain)
      return await  ctx.table("hubs").get("subdomain", args.subdomain);


    },
  });
export const list = query({
    args: {},
    handler: async (ctx) => {
      const hubs = await ctx.table("hubs")
      return hubs;
    },
  });

export const advancedList = query({
    args: {searchParams : v.any()},
    handler: async (ctx, args) => {
      const {name, page, per_page, sort} = args.searchParams;

      const [field, direction] = sort ? sort?.split(".") : [undefined, undefined]
      const pagination : PaginationOptions = {cursor: null, numItems: parseInt(per_page)}
 
      const hubs = await ctx.table("hubs").filter(q => q.gte(q.field("name"), name)).order(direction ?? "desc")
      return hubs;
    },
  });
export const getPublicHubs = query({
    args: {},
    handler: async (ctx) => {
      const hubs = await ctx.table("hubs").filter(q => q.eq(q.field("isPublic"), true));
      return hubs
    },
  });


export const update = mutation({
    args: {subdomain: v.string(), field: v.string(), value: v.any()},
    handler: async (ctx, args) => {
      const {subdomain, field, value} = args;
      const hub = await ctx.table("hubs").getX("subdomain", subdomain).patch({[field]: value});
      return hub;
    },
  });

export const deleteHub = mutation({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return await ctx.table("hubs").getX("subdomain", subdomain).delete();
    },
  });

export const getMyRole = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return (await ctx.table("hubs").get("subdomain", subdomain).edge("members").filter(q => q.eq(q.field("userId"), ctx.userId)).first())?.edge("role")
    },
  });

export const getMembers = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return ctx.table("hubs").get("subdomain", subdomain).edge("members").map(async(member) => {
        return {
          ...member,
          user: await ctx.table("users").get(member.userId),
          role: await ctx.table("roles").get(member.roleId),
        }
      });
    },
  });

export const getRoles = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      const roles = await  ctx.table("hubs").get("subdomain", subdomain).edge("roles")
      //sort by created at
      return roles?.sort ((a, b) => a._creationTime - b._creationTime)
    },
  });

export const getInvites = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      return ctx.table("hubs").get("subdomain", subdomain).edge("hubInvites").map(async(invite) => {
        return {
          ...invite,
          user: invite.user ? await ctx.table("users").get(invite.user) : null,
          role: await ctx.table("roles").get(invite.roleId),
        }
      });
    },
  });



export const isAvailable = query({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const {subdomain} = args;
      if(!subdomain || subdomain.length < 2) return false;
      return !await ctx.table("hubs").get("subdomain", subdomain);
    },
  });