import {
    customCtx,
    customMutation,
    customQuery,
  } from "convex-helpers/server/customFunctions";
  import {
    MutationCtx,
    QueryCtx,
    internalMutation as baseInternalMutation,
    internalQuery as baseInternalQuery,
    mutation as baseMutation,
    query as baseQuery,
  } from "./_generated/server";
  import { getEntDefinitionsWithRules, getUserId } from "./rules";
  import { entDefinitions } from "./schema";
import { entsTableFactory } from "convex-ents";
   
  export const query = customQuery(
    baseQuery,
    customCtx(async (baseCtx) => {
      return await queryCtx(baseCtx);
    }),
  );
   
  export const internalQuery = customQuery(
    baseInternalQuery,
    customCtx(async (baseCtx) => {
      return await queryCtx(baseCtx);
    }),
  );
   
  export const mutation = customMutation(
    baseMutation,
    customCtx(async (baseCtx) => {
      return await mutationCtx(baseCtx);
    }),
  );
   
  export const internalMutation = customMutation(
    baseInternalMutation,
    customCtx(async (baseCtx) => {
      return await mutationCtx(baseCtx);
    }),
  );
   
  async function queryCtx(baseCtx: QueryCtx) {
    const ctx = {
      db: baseCtx.db as unknown as undefined,
      skipRules: { table: entsTableFactory(baseCtx, entDefinitions) },
    };
    
    const entDefinitionsWithRules = getEntDefinitionsWithRules(ctx as any);
    const userId = await getUserId({ ...baseCtx, ...ctx });
    (ctx as any).userId = userId;
    const table = entsTableFactory(baseCtx, entDefinitionsWithRules);
    (ctx as any).table = table;
    const user = async () =>
      userId !== null ? await table("users").get(userId) : null;
    (ctx as any).user = user;
    const userX = async () => {
      const ent = await user();
      if (ent === null) {
        throw new Error("Expected authenticated viewer");
      }
      return ent;
    };
    (ctx as any).userX = userX;
    return { ...ctx, table, user, userX, userId };
  }
   
  async function mutationCtx(baseCtx: MutationCtx) {
    const ctx = {
      db: baseCtx.db as unknown as undefined,
      skipRules: { table: entsTableFactory(baseCtx, entDefinitions) },
    };
    const entDefinitionsWithRules = getEntDefinitionsWithRules(ctx as any);
    const userId = await getUserId({ ...baseCtx, ...ctx });
    (ctx as any).userId = userId;
    const table = entsTableFactory(baseCtx, entDefinitionsWithRules);
    (ctx as any).table = table;
    const user = async () =>
      userId !== null ? await table("users").get(userId) : null;
    (ctx as any).user = user;
    const userX = async () => {
      const ent = await user();
      if (ent === null) {
        throw new Error("Expected authenticated viewer");
      }
      return ent;
    };
    (ctx as any).userX = userX;
    return { ...ctx, table, user, userX, userId };
  }