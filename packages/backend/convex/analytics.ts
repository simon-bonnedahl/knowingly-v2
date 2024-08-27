import { v } from "convex/values";
import { action } from "./_generated/server";

export const doSomething = action({
  args: {subdomain: v.string()},
  handler: async (ctx, args) => {
    const key = process.env.PLAUSIBLE_API_KEY
    const site = "simbo.casa"
    const baseUrl = "https://plausible.io/api/v1"
    console.log(key)
    const data = await fetch(
        `${baseUrl}/stats/realtime/visitors?site_id=${site}&period=day&property=visit:country&filters=hostname=${args.subdomain}.${site}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!data.ok) {
        throw new Error(`Error fetching: ${data.statusText}`);
      }

      const analytics = await data.json();
      console.log("Breakdown Analytics:", analytics);
  },
});