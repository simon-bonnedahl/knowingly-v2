import { addEntRules } from "convex-ents";
import { entDefinitions } from "./schema";
import { QueryCtx } from "./types";
import { Id } from "./_generated/dataModel";
 
export function getEntDefinitionsWithRules(
  ctx: QueryCtx,
): typeof entDefinitions {
  return addEntRules(entDefinitions, {
   
  });
}
 
// Example: Retrieve viewer ID using `ctx.auth`:
export async function getUserId(
  ctx: Omit<QueryCtx, "table" | "userId" | "user" | "userX">,
): Promise<Id<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  const user = await ctx.skipRules
    .table("users")
    .get("tokenIdentifier", identity.subject);

    if(user === null) {
        return null;
     }
  return user?._id;
}