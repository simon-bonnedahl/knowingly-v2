"use node";

import { v } from "convex/values";
import Stripe from "stripe";

import { action, internalAction } from "./_generated/server";

type Metadata = {
  userId: string;
};

export const pay = action({
  args: {redirect: v.optional(v.string())},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("you must be logged in to subscribe");
    }

    if (!user.emailVerified) {
      throw new Error("you must have a verified email to subscribe");
    }

    const domain = args.redirect ?? "http://app.knowingly.local:3000";
    console.log(domain);
    const stripe = new Stripe(process.env.STRIPE_KEY!);
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: process.env.PRICE_ID!, quantity: 1 }],
      customer_email: user.email,
      metadata: {
        userId: user.subject,
      },
      mode: "subscription",
      success_url: `${domain}`,
      cancel_url: `${domain}`,
    });

    return session.url!;
  },
});

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, args) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!);

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    try {
      const event = stripe.webhooks.constructEvent(
        args.payload,
        args.signature,
        webhookSecret
      );

      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: Metadata;
      };

      if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        const userId = completedEvent.metadata.userId;

        // await ctx.runMutation(internal.users.updateSubscription, {
        //   userId,
        //   subscriptionId: subscription.id,
        //   endsOn: subscription.current_period_end * 1000,
        // });
      }

      if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        // await ctx.runMutation(internal.users.updateSubscriptionBySubId, {
        //   subscriptionId: subscription.items.data[0]?.price.id,
        //   endsOn: subscription.current_period_end * 1000,
        // });
      }

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as { message: string }).message };
    }
  },
});