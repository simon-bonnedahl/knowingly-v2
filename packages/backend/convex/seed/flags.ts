import { Infer, v } from "convex/values";

const flags = [
  {
    key: "feature_create_hub",
    name: "Create Hub",
    description: "Allow users to create a hub",
    value: true,
  },
  {
    key: "feature_ai_chat",
    name: "AI Chat",
    description: "Enable AI chat for users",
    value: true,
  },
];

export const flagKey = v.union(
  v.literal("feature_create_hub"),
  v.literal("feature_ai_chat"),
);

export type FlagKey = Infer<typeof flagKey>;