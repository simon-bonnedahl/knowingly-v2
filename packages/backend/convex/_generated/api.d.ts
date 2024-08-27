/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.13.2.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as analytics from "../analytics.js";
import type * as blocknote from "../blocknote.js";
import type * as blogPosts from "../blogPosts.js";
import type * as calls from "../calls.js";
import type * as clerk from "../clerk.js";
import type * as collections from "../collections.js";
import type * as constants from "../constants.js";
import type * as crons from "../crons.js";
import type * as emails from "../emails.js";
import type * as fields from "../fields.js";
import type * as files from "../files.js";
import type * as flags from "../flags.js";
import type * as functions from "../functions.js";
import type * as http from "../http.js";
import type * as hubInvites from "../hubInvites.js";
import type * as hubs from "../hubs.js";
import type * as inviteRequests from "../inviteRequests.js";
import type * as meetings from "../meetings.js";
import type * as members from "../members.js";
import type * as messages from "../messages.js";
import type * as notifications from "../notifications.js";
import type * as pages from "../pages.js";
import type * as roles from "../roles.js";
import type * as rules from "../rules.js";
import type * as seed_flags from "../seed/flags.js";
import type * as stripe from "../stripe.js";
import type * as supportTickets from "../supportTickets.js";
import type * as types from "../types.js";
import type * as users from "../users.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  analytics: typeof analytics;
  blocknote: typeof blocknote;
  blogPosts: typeof blogPosts;
  calls: typeof calls;
  clerk: typeof clerk;
  collections: typeof collections;
  constants: typeof constants;
  crons: typeof crons;
  emails: typeof emails;
  fields: typeof fields;
  files: typeof files;
  flags: typeof flags;
  functions: typeof functions;
  http: typeof http;
  hubInvites: typeof hubInvites;
  hubs: typeof hubs;
  inviteRequests: typeof inviteRequests;
  meetings: typeof meetings;
  members: typeof members;
  messages: typeof messages;
  notifications: typeof notifications;
  pages: typeof pages;
  roles: typeof roles;
  rules: typeof rules;
  "seed/flags": typeof seed_flags;
  stripe: typeof stripe;
  supportTickets: typeof supportTickets;
  types: typeof types;
  users: typeof users;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
