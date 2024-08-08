"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";

import { Button } from "@knowingly/ui/button";

import { CodeInput } from "~/components/auth/code-input";
import { SignInWithOAuth } from "~/components/auth/oauth-signin";
import { SignInWithPassword } from "~/components/auth/password-signin";
import { ResetPasswordWithEmailCode } from "~/components/auth/reset-password";
import { SignInMethodDivider } from "~/components/auth/signin-divider";
import { Authenticated } from "convex/react";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string } | "forgot">(
    "signIn",
  );
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="w-full flex h-full items-center justify-center">
    <div className="mx-auto flex max-w-[384px] flex-col gap-4">
      <Authenticated>
        <p className="text-muted-foreground">You are already signed in</p>
      </Authenticated>
      
      {step === "signIn" ? (
        <>
          <h2 className="text-2xl font-semibold tracking-tight">
            Sign in or create an account
          </h2>
          <SignInWithOAuth />
          <SignInMethodDivider />
          <SignInWithPassword
            handleSent={(email) => setStep({ email })}
            handlePasswordReset={() => setStep("forgot")}
            provider="password-code"
          />
        </>
      ) : step === "forgot" ? (
        <ResetPasswordWithEmailCode
          provider="password-code"
          handleCancel={() => setStep("signIn")}
        />
      ) : (
        <>
          <h2 className="text-2xl font-semibold tracking-tight">
            Check your email
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter the 8-digit code we sent to your email address.
          </p>
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitting(true);
              const formData = new FormData(event.currentTarget);
              signIn("password-code", formData).catch((error) => {
                console.error(error);
                toast("Code could not be verified, try again");
                setSubmitting(false);
              });
            }}
          >
            <label htmlFor="email">Code</label>
            <CodeInput />
            <input name="email" value={step.email} type="hidden" />
            <input name="flow" value="email-verification" type="hidden" />
            <Button type="submit" disabled={submitting}>
              Continue
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </form>
        </>
      )}
    </div>
    </div>
  );
}
