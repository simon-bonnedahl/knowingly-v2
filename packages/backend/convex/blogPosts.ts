import { v } from "convex/values";
import slugify from "slugify";

import { mutation, query } from "./functions";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.table("blogPosts").map(async (blogPosts) => {
      const author = await blogPosts.edge("author");
      return {
        ...blogPosts,
        author,
      };
    });
  },
});

export const get = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    const blogPosts = await ctx.table("blogPosts").get(args.id);
    if (!blogPosts) return null;
    const author = await blogPosts?.edge("author");
    return {
      ...blogPosts,
      author,
    };
  },
});
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const blogPosts = await ctx.table("blogPosts").get("slug", args.slug);
    if (!blogPosts) return null;
    const author = await blogPosts?.edge("author");
    return {
      ...blogPosts,
      author,
    };
  },
});

export const create = mutation({
  args: {},
  handler: async (ctx, args) => {
    if (!ctx.userId)
      throw new Error("You must be logged in to create a blog post");
    const content =
      '[{"id":"26f187a2-6470-4899-b555-25e124b38888","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"80d1b3a2-44ef-451a-9a6d-8ece731364b8","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center","level":2},"content":[{"type":"text","text":"Welcome to your new hub!","styles":{}}],"children":[]},{"id":"fb45c621-fd25-4557-a7db-1c5f5f7ecd94","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"51d7b532-9667-4e18-a42b-850cdf8ab136","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center"},"content":[{"type":"text","text":"This content is fully customizable with a \\"notion\\" style editor ⭐️","styles":{}}],"children":[]},{"id":"d8492284-be69-49ee-a5c5-4dd6c93796b8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center"},"content":[{"type":"text","text":"You can re-arrange blocks by dragging the handles on the left\\n","styles":{}}],"children":[]},{"id":"a0339710-7fbc-40ac-893c-77d936e06a2f","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"1e568ef3-cb6c-4199-9ad7-68c5ac41bbae","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"By pressing \\"/\\" you can find the available blocks to use.","styles":{"bold":true,"italic":true}}],"children":[]},{"id":"f1e9a5eb-bd5d-4cbb-a813-714dc152c455","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"c15c8606-c765-4288-b510-7adb96f45614","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"Few examples","styles":{"underline":true}}],"children":[]},{"id":"5ebceea2-ac7c-456c-a0b5-a321b2d7a3a8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"2745b9db-fb37-497a-bcc5-311247e22382","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Numbered List","styles":{}}],"children":[]},{"id":"ad4043d7-3846-4b6d-bec4-f583a8fc2bf8","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"👨‍🔧","styles":{}}],"children":[]},{"id":"8334d2e5-7bf3-47b7-ad60-e92b319242e5","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"👩🏻‍🍳","styles":{}}],"children":[]},{"id":"919aec10-5781-4585-9344-cdb926a7d9a5","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"264e9a0c-8fdf-4450-9214-122e0ff48d07","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Button","styles":{}}],"children":[]},{"id":"55f76be8-e654-4fa3-886f-7cc666a398da","type":"button","props":{"textAlignment":"left","actionPath":""},"content":[{"type":"text","text":"👉 Apply now!","styles":{}}],"children":[]},{"id":"9472e548-8cda-4270-8dbb-5000b42c7970","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"0e7328d5-e635-4121-895f-a83d6391a038","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Image","styles":{}}],"children":[]},{"id":"81e72b3d-49e9-423b-8b0c-55dfb9d77e98","type":"image","props":{"backgroundColor":"default","textAlignment":"left","name":"logo-fullwhite.svg","url":"https://confident-terrier-401.convex.site/api/image/kg2e5tzzacv5q4w2srxqevb6sx6xhb3t","caption":"","showPreview":true,"previewWidth":512},"children":[]},{"id":"96175989-28a0-431b-ab3f-037c51bc1283","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"1f0de711-8d1e-4f29-84a5-cc7f08c81a0c","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]';
    const title = "New Blog Post-" + Date.now();
    return await ctx
      .table("blogPosts")
      .insert({
        title,
        content,
        banner: "/banner.png",
        slug: slugify(title, { lower: true }),
        userId: ctx.userId,
        isPublished: false,
      })
      .get();
  },
});
export const update = mutation({
  args: { id: v.id("blogPosts"), field: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    if (args.field === "title") {
      const slug = slugify(args.value, { lower: true });
      return await ctx
        .table("blogPosts")
        .getX(args.id)
        .patch({
          [args.field]: args.value,
          slug,
        });
    }
    return await ctx
      .table("blogPosts")
      .getX(args.id)
      .patch({
        [args.field]: args.value,
      });
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    return await ctx.table("blogPosts").getX(args.id).delete();
  },
});
