import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "update embeddings",
  { minutes: 30 }, // every minute
  internal.pages.updateEmbeddings,
);

export default crons;