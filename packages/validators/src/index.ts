import { z } from "zod";

export const inviteMemberSchema = z.object({
  email: z.string().email(),
  roleId: z.string(),
  message: z.string().optional(),
});

export type InviteMemberSchema = z.infer<typeof inviteMemberSchema>;