import { Hono } from "hono";
import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
import { cors } from "hono/cors";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, embed, streamText } from "ai";
import { ActionCtx } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { customContentToMarkdown } from "./blocknote";

const app: HonoWithConvex<ActionCtx> = new Hono();
app.use("/api/*", cors());

app.post("/api/chat", async (c) => {
  // Extract the `messages` from the body of the request
  const { messages  } = await c.req.json() as { messages: CoreMessage[] };

  const subdomain = c.req.header("origin")!.split(".")[0].replace("https://", "").replace("http://", "");

  const hub = await c.env.runQuery(api.hubs.getHub, { subdomain });
  if(!hub) throw new Error("Hub not found");
   const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: messages.map(m => m.content).join("\n"),
  });

  const results = await c.env.vectorSearch("pages", "by_embedding", {
    vector: embedding,
    limit: 16,
    filter: (q) => q.eq("hubId", hub._id),
  });
  const pages = await c.env.runQuery(api.pages.getPages, { ids: results.map((r) => r._id) });
  let pageContext = ""
  for (const page of pages) {
    pageContext += `Name: ${page.name} `;
    pageContext += `Slug: ${page.slug} `;
    pageContext += `Type: ${page.type} `;
    pageContext += `Image: ${page.image} `;
    pageContext += `Icon: ${page.icon} `;
    pageContext += `Custom Fields:  `;
    for (const field of page.customFields) {
      const f = await c.env.runQuery(api.customFields.get, { id: field.id });
      if (!f) continue;
      pageContext += `${f.name}: ${field.value} `;
    }
    pageContext += `Custom Content: ${customContentToMarkdown(page.customContent)} `;
    pageContext += "\n \n"

  }



  messages.unshift({
    role: "system",
    content: "You can be a helpful assistant that can provide information based on context from pages on the current hub." +
    " Pages context: " + pageContext +
    " You can use /slug to link to a page. But if you do it, do it on a separate line and mask the link with the page name" + 
    "You can also provide any image you see fits" +
    "If you respond with information about any page, always link to the page" +
    "Feel free to use plenty of emojis and gifs to make the conversation more engaging." +
    "If the user asks for a something that doesn't exist in any of your context, just provide a short response about it. And lets them know there is no result in the hub."
  });
  

  // Call the language model
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
      console.log(text);
    },
  });

  // Respond with the stream
  return result.toAIStreamResponse();
});

app.post("/api/stripe", async (c) => {
  // Extract the `messages` from the body of the request
  const signature = c.req.header("stripe-signature") as string;

  const result = await c.env.runAction(internal.stripe.fulfill, {
    payload: await c.req.text(),
    signature,
  });

//   if (result.success) {
//     return new Response(null, {
//       status: 200,
//     });
//   } else {
//     return new Response("Webhook Error", {
//       status: 400,
//     });
//   }
// }),



});

app.post("/api/clerk", async (c, ctx) => {
  // Extract the `messages` from the body of the request
  console.log("Webhook received", c);
  const payload = await c.req.text();
  console.log(payload);
  try {
    const result = await c.env.runAction(internal.clerk.fulfill, {
      payload,
      headers: {
        "svix-id": c.req.header("svix-id")!,
        "svix-timestamp": c.req.header("svix-timestamp")!,
        "svix-signature": c.req.header("svix-signature")!,
      },
    });

    switch (result.type) {
      case "user.created":
        await c.env.runMutation(internal.users.createUser, {
          email: result.data.email_addresses[0]?.email_address,
          tokenIdentifier: result.data.id,
          name: result.data.first_name + " " + result.data.last_name,
          imageUrl: result.data.image_url,
        });
        
    }

    return new Response(null, {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Webhook Error", {
      status: 400,
    });
  }
});

app.get("/api/image/:storageId", async (c, ctx) => {
  const storageId = c.req.param("storageId");
  const url = await c.env.storage.getUrl(storageId);
  return new Response(null, {
    status: 301,
    headers: {
      location: url || "",
    },
  });
}
);







export default new HttpRouterWithHono(app);