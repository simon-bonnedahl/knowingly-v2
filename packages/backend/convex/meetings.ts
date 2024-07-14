"use node";
import { action } from "./_generated/server";
import { StreamClient } from "@stream-io/node-sdk";

export const generateMeetingToken = action({
    args: {},
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();

        if (!user) throw new Error("User is not authenticated");
        if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) throw new Error("Stream API key secret is missing");
        if (!process.env.STREAM_SECRET_KEY) throw new Error("Stream API secret is missing");

        const streamClient = new StreamClient(process.env.NEXT_PUBLIC_STREAM_API_KEY, process.env.STREAM_SECRET_KEY);

        const expirationTime = Math.floor(Date.now() / 1000) + 3600;
        const issuedAt = Math.floor(Date.now() / 1000) - 60;

        const token = streamClient.createToken(
            user.subject,
            expirationTime,
            issuedAt,
        );


        return token;
     
      
    },
  });

