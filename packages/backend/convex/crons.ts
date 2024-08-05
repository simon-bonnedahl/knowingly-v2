import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "update page-embeddings",
  { minutes: 30 },
  internal.pages.updateEmbeddings,
  { updateInterval: 30 }
);

crons.interval(
  "update hub-embeddings",
  { minutes: 30 },
  internal.hubs.updateEmbeddings,
  { updateInterval: 30 }
);

export default crons;