import { z } from "zod";
import type { SupportCategory, Tier, } from "@knowingly/backend/convex/types";

export const inviteMemberSchema = z.object({
  email: z.string().email(),
  roleId: z.string(),
  message: z.string().optional(),
});

export type InviteMemberSchema = z.infer<typeof inviteMemberSchema>;


export const createHubSchema = z.object({
  name: z.string(),
  subdomain: z.string(),
  isPublic: z.boolean(),
  description: z.string().optional(),
  tier: z.enum(["FREE", "PRO", "ENTERPRISE"] as [Tier, ...Tier[]]),
});

export type CreateHubSchema = z.infer<typeof createHubSchema>;

export const requestInviteSchema = z.object({
  email: z.string().email().optional(),
  roleId: z.string(),
  message: z.string().optional(),
});

export type RequestInviteSchema = z.infer<typeof requestInviteSchema>;


export const supportTicketSchema = z.object({
  category: z.enum( ["SUPPORT", "BUG", "FEATURE_REQUEST"] as [SupportCategory, ...SupportCategory[]]),
  title: z.string(),
  body: z.string(),
  files: z.array(z.string()).optional(),
});

export type SupportTicketSchema = z.infer<typeof supportTicketSchema>;