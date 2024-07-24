"use node";

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { internalAction } from "./_generated/server";
import { Webhook } from "svix";
import { v } from "convex/values";

export const fulfill = internalAction({
  args: { headers: v.any(), payload: v.string() },
  handler: async (ctx, args) => {
    console.log("Fulfilling webhook");
    console.log(args.payload);
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
    return payload;
  },
});