import { v } from "convex/values";

import { action } from "./_generated/server";

const key = process.env.PLAUSIBLE_API_KEY;
const site = "simbo.casa";
const baseUrl = "https://plausible.io/api/v2";
const baseUrlV1 = "https://plausible.io/api/v1";


const getOnlineUsers = async(hostname: string | undefined) => {
    const data = await fetch(
        `${baseUrlV1}/stats/realtime/visitors?site_id=${site}${hostname ? `&event:hostname==${hostname}` : ""}`,
        {
        method: "GET",
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
        },
        },
    );
    if (!data.ok) 
        throw new Error(`Error fetching: ${data.statusText}`);


    const online = await data.json();
    return online as number;
    }




export const get = action({
  args: {
    hostname: v.optional(v.string()),
    date_range: v.optional(v.union(
      v.array(v.string()),
      v.literal("day"),
      v.literal("7d"),
      v.literal("30d"),
      v.literal("all"),
    )),
  }, // Define args to include subdomain
  handler: async (ctx, args) => {
    // Ensure the API key is available
    if (!key) {
      throw new Error("Plausible API key is not set in environment variables.");
    }
    const metrics: { [key: string]: number } = {
      visitors: 0,
      pageviews: 0,
      visits: 0,
    };
    type Dimensions = {
      [key: string]: { [key: string]: number };
    };

    const dimensions: Dimensions = {
      "visit:country": {},
      time: {},
      "visit:device": {},
      "event:page": {},
    };
    const online = await getOnlineUsers(args.hostname);

    console.log("date_range", args.date_range);

    try {
      const payload = {
        site_id: site,
        metrics: Object.keys(metrics),
        date_range: args.date_range || "day",
        filters: args.hostname
          ? [["is", "event:hostname", [args.hostname]]]
          : [],
        dimensions: Object.keys(dimensions),
      };

      const response = await fetch(`${baseUrl}/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const analytics = await response.json();


      analytics.results.forEach((result: any) => {
        Object.keys(metrics).forEach((key, index) => {
          metrics[key] += result.metrics[index];
        });
        Object.keys(dimensions).forEach((key, index) => {
          if(!dimensions[key][result.dimensions[index]]) {
            dimensions[key][result.dimensions[index]] = 0;
          }
          dimensions[key][result.dimensions[index]] += result.metrics[0];   //0 for unique visitors
        });
      });
        return { online: online, metrics: metrics, dimensions: dimensions };
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      throw new Error("Failed to fetch analytics data.");
    }
  },
});
