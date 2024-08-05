import { CustomCtx } from "convex-helpers/server/customFunctions";
import { GenericEnt, GenericEntWriter } from "convex-ents";
import { TableNames } from "./_generated/dataModel";
import { mutation, query } from "./functions";
import { entDefinitions } from "./schema";
import { Infer, v } from "convex/values";
 
export type QueryCtx = CustomCtx<typeof query>;
export type MutationCtx = CustomCtx<typeof mutation>;
 
export type Ent<TableName extends TableNames> = GenericEnt<
  typeof entDefinitions,
  TableName
>;
export type EntWriter<TableName extends TableNames> = GenericEntWriter<
  typeof entDefinitions,
  TableName
>;

export const pageType = v.union(
  v.literal("PROFILE"),
  v.literal("EVENT"),
  v.literal("TEMPLATE"),
  v.literal("CUSTOM"),
);
export type PageType = Infer<typeof pageType>;

export const icon = v.object({
  type: v.union(v.literal("URL"), v.literal("EMOJI"), v.literal("ICON")),
  value: v.string(),
});

export type Icon = Infer<typeof icon>;

export const banner = v.object({
  type: v.union(v.literal("URL"), v.literal("COLOR")),
  value: v.string(),
});

export type Banner = Infer<typeof banner>;

export const tier = v.union(v.literal("FREE"), v.literal("PRO"), v.literal("ENTERPRISE"));

export type Tier = Infer<typeof tier>;

export const fieldValue = v.union(
  v.string(),
  v.number(),
  v.boolean(),
  v.array(v.string()),
);

export type FieldValue = Infer<typeof fieldValue>;


export const field = v.object({
  id: v.id("fields"),
  value: fieldValue,
});

export type Field = Infer<typeof field>;

export const fieldType = v.union(
  v.literal("TEXT"),
  v.literal("NUMBER"),
  v.literal("SELECT"),
  v.literal("MULTI_SELECT"),
  v.literal("STATUS"),
  v.literal("EMAIL"),
  v.literal("PHONE"),
  v.literal("URL"),
  v.literal("DATE"),
  v.literal("FILE"),
  v.literal("MEDIA_EMBEDDING")
);

export type FieldType = Infer<typeof fieldType>;

export const fieldOptions = v.object({
  suggestions: v.optional(v.array(v.string())),
  format: v.optional(v.string()),
  showAs: v.optional(v.string()),
});

export type FieldOptions = Infer<typeof fieldOptions>;

export const inviteStatus = v.union(
  v.literal("PENDING"),
  v.literal("ACCEPTED"),
  v.literal("DECLINED"),
  v.literal("EXPIRED"),
);


export type InviteStatus = Infer<typeof inviteStatus>;

export const permissions = v.object({
  canCreatePage: v.boolean(),
  canEditPage: v.boolean(),
  canDeletePage: v.boolean(),
  canCreateField: v.boolean(),
  canEditField: v.boolean(),
  canDeleteField: v.boolean(),
  canInviteMember: v.boolean(),
  canRemoveMember: v.boolean(),
  canEditRole: v.boolean(),
  canSeeAdminPanel: v.boolean(),
  canEditHub: v.boolean(),
  canDeleteHub: v.boolean(),
})

export type Permissions = Infer<typeof permissions>;

export const role = v.union(
  v.literal("USER"),
  v.literal("SUPERUSER"),
);

export type Role = Infer<typeof role>;