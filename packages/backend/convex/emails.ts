import { v } from "convex/values";

import { Resend } from 'resend';
import { renderAsync} from "@knowingly/email-renderer"
import { isFile, isUrl} from "@knowingly/utils"


import { action } from "./_generated/server";
import { mutation, query } from "./functions";

export const preview = action({
  args: { json: v.string(), previewText: v.string() },
  handler: async (ctx, args) => {
    const { json, previewText } = args;
    const content = JSON.parse(json);
    const html = await renderAsync(content, {
      preview: previewText,
    });

    return html;
  },
});

export const send = action({
  args: {
    json: v.string(),
    subject: v.string(),
    previewText: v.string(),
    from: v.string(),
    to: v.string(),
    replyTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY not set");
    }
    const { subject, json, previewText, from, replyTo, to } = args;

    const content = JSON.parse(json);
    const html = await renderAsync(content, {
      preview: previewText,
    });
    const resend = new Resend(apiKey);
    const enrichedTo = Array.isArray(to)
      ? to
      : to.split(',').map((email) => email.trim());
    const { error } = await resend.emails.send({
      to: enrichedTo,
      from,
      reply_to: replyTo,
      subject,
      html,
    });

    if (error) {
      return {
        data: null,
        error: {
          message: error.message,
          code: error.name,
        },
      };
    }
    return {
        data: "Email sent",
        error: null,
        };
  },
});

export const listTemplates = query({
    args: {subdomain : v.string()},
    handler: async (ctx, args) => {
        return await ctx.table("hubs").get("subdomain", args.subdomain).edge("emailTemplates")

       
    
    },
    });
export const getTemplate = query({
    args: { id: v.id("emailTemplates")},
    handler: async (ctx, args) => {
        return await ctx.table("emailTemplates").get(args.id)
    },
    });

export const createTemplate = mutation({
    args: {subdomain: v.string()},
    handler: async (ctx, args) => {
      const hub = await ctx.table("hubs").get("subdomain", args.subdomain);
        if(!hub) throw new Error("Hub not found");
      const logo = (isFile(hub.logo) || isUrl(hub.logo)) ? hub.logo : "/logo-small-black.svg";
      const content = `{"type":"doc","content":[{"type":"logo","attrs":{"src":${logo},"alt":null,"title":null,"maily-component":"logo","size":"lg","alignment":"left"}},{"type":"spacer","attrs":{"height":"xl"}},{"type":"heading","attrs":{"textAlign":"left","level":2},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Discover Mailys"}]},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Are you ready to transform your email communication? Introducing Maily, the powerful email editor that enables you to craft captivating emails effortlessly."}]},{"type":"button","attrs":{"mailyComponent":"button","text":"Try Maily Now →","url":"","alignment":"left","variant":"filled","borderRadius":"round","buttonColor":"#141313","textColor":"#ffffff"}},{"type":"spacer","attrs":{"height":"xl"}}]}`
      const user = await ctx.userX();
      const from = `${user.name} <${hub.subdomain}@knowingly.ai>`;
      const replyTo = `${user.name} <${user.email}>`;
      const template = await ctx.table("emailTemplates").insert({
        title: "New Template",
        content,
        from,
        replyTo,
        hubId: hub._id
      });
      return template;
    },
    });
export const updateTemplate = mutation({
    args: {id: v.id("emailTemplates"), field: v.string(), value: v.any()},
    handler: async (ctx, args) => {
 
      const {id, field, value} = args;
      const template = await ctx.table("emailTemplates").getX(id).patch({[field]: value});
      return template;
    },
    });
    
export const deleteTemplate = mutation({
    args: {id: v.id("emailTemplates")},
    handler: async (ctx, args) => {
      const {id} = args;
      return await ctx.table("emailTemplates").getX(id).delete();
    },
    });