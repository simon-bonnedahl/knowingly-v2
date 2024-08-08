import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import Google from "@auth/core/providers/google";
import Resend from "@auth/core/providers/resend";
import Linkedin from "@auth/core/providers/linkedin";
import { ResendOTPPasswordReset } from "./emails/resendOTPReset";
import { ResendOTP } from "./emails/resendOTPEmail";

export const { auth, signIn, signOut, store } = convexAuth({
    providers: [
        Password,
        Password({ id: "password-with-reset", reset: ResendOTPPasswordReset }),
        Password({
            id: "password-code",
            reset: ResendOTPPasswordReset,
            verify: ResendOTP,
          }),
        Google,
        Linkedin,
        Resend({
            from: process.env.AUTH_EMAIL ?? "Auth <auth@knowingly.ai>",
          }),
    ],
    callbacks: {
        // `args.type` is one of "oauth" | "email" | "phone" | "credentials" | "verification"
        // `args.provider` is the currently used provider config
        async createOrUpdateUser(ctx, args) {
          if (args.existingUserId) {
            // Optionally merge updated fields into the existing user object here
            return args.existingUserId;
          }
     
          // Implement your own account linking logic:
          const existingUser = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), args.profile.email)).unique();
          if (existingUser) return existingUser._id;
     
          // Implement your own user creation:
          return ctx.db.insert("users", {
            email: args.profile.email,
            name: args.profile.email?.split("@")[0],
            imageUrl: `https://avatar.iran.liara.run/public`,
            role: "USER",
            uploads: [],
            pageVisits: [],
            // Add any other fields you want to save here
          });
        },
      },
  });