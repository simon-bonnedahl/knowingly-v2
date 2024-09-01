import { entsTableFactory } from "convex-ents";
import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";

import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import {
  ActionCtx,
  action as baseAction,
  internalMutation as baseInternalMutation,
  internalQuery as baseInternalQuery,
  mutation as baseMutation,
  query as baseQuery,
  MutationCtx,
  QueryCtx,
} from "./_generated/server";
import { getEntDefinitionsWithRules, getUserId } from "./rules";
import { entDefinitions } from "./schema";
import { Ent, Permissions } from "./types";
import { noPermissions } from "./constants";

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
export const action = customAction(
  baseAction,
  customCtx(async (baseCtx) => {
    return await actionCtx(baseCtx);
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
  const permissions = async (hubId: Id<"hubs">): Promise<Permissions & { canDoAnything: boolean}> => {
    const hub = await table("hubs").getX(hubId);
    const user = await userX();
    const membership = user
      .edge("memberships")
      .filter((q) => q.eq(q.field("hubId"), hub._id))
      .first();
    if (!membership) 
      return { ...noPermissions, canDoAnything: user.role ==="SUPERUSER" };
    const permissions = (await membership.edge("role"))!.permissions;
    return { ...permissions, canDoAnything: user.role ==="SUPERUSER" };
  };
  return { ...ctx, table, user, userX, userId, permissions };
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
  const permissions = async (hubId: Id<"hubs">): Promise<Permissions & { canDoAnything: boolean}> => {
    const hub = await table("hubs").getX(hubId);
    const user = await userX();
    const membership = user
      .edge("memberships")
      .filter((q) => q.eq(q.field("hubId"), hub._id))
      .first();
    if (!membership) 
      return { ...noPermissions, canDoAnything: user.role ==="SUPERUSER" };
    const permissions = (await membership.edge("role"))!.permissions;
    return { ...permissions, canDoAnything: user.role ==="SUPERUSER" };
  };

  return { ...ctx, table, user, userX, userId, permissions };
}

async function actionCtx(baseCtx: ActionCtx) {
  const tokenIdentifier = (await baseCtx.auth.getUserIdentity())?.subject;
  const user = async () : Promise<Ent<"users">| null> => {
    if (!tokenIdentifier) return null;
    const u = await baseCtx.runQuery(api.users.getByTokenIdentifier, {
      tokenIdentifier,
    });
    return u;
  };

  const userX = async () => {
    const ent = await user();
    if (ent === null) {
      throw new Error("Expected authenticated viewer");
    }
    return ent;
  };
  const permissions = async (hubId: Id<"hubs">) : Promise<Permissions & { canDoAnything: boolean}> => {
    const hub = await baseCtx.runQuery(api.hubs.getHub, { id: hubId });
    if(!hub) throw new Error("Hub not found");
    const user = await userX();
    const membership = user
      .edge("memberships")
      .filter((q) => q.eq(q.field("hubId"), hub._id))
      .first();
    if (!membership) 
      return { ...noPermissions, canDoAnything: user.role ==="SUPERUSER" };
    const permissions = (await membership.edge("role"))!.permissions;
    return { ...permissions, canDoAnything: user.role ==="SUPERUSER" };
  };

  return { ...baseCtx,  user, userX,  permissions };
}
