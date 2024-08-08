import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";

import { Button } from "@knowingly/ui/button";
import { Input } from "@knowingly/ui/input";

import { CodeInput } from "./code-input";
import { SignInWithEmailCode } from "./email-code-signin";

export function ResetPasswordWithEmailCode({
  handleCancel,
  provider,
}: {
  handleCancel: () => void;
  provider: string;
}) {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
  const [submitting, setSubmitting] = useState(false);
  return step === "forgot" ? (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">
        Send password reset code
      </h2>
      <SignInWithEmailCode
        handleCodeSent={(email) => setStep({ email })}
        provider={provider}
      >
        <input name="flow" type="hidden" value="reset" />
      </SignInWithEmailCode>
      <Button type="button" variant="link" onClick={handleCancel}>
        Cancel
      </Button>
    </>
  ) : (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">
        Check your email
      </h2>
      <p className="text-sm text-muted-foreground">
        Enter the 8-digit code we sent to your email address and choose a new
        password.
      </p>
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitting(true);
          const formData = new FormData(event.currentTarget);
          signIn(provider, formData).catch((error) => {
            console.error(error);
            toast.error(
              "Code could not be verified or new password is too short, try again",
            );
            setSubmitting(false);
          });
        }}
      >
        <label htmlFor="email">Code</label>
        <CodeInput />
        <label htmlFor="newPassword">New Password</label>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          className="mb-4 "
          autoComplete="new-password"
        />
        <input type="hidden" name="flow" value="reset-verification" />
        <input type="hidden" name="email" value={step.email} />
        <Button type="submit" disabled={submitting}>
          Continue
        </Button>
        <Button type="button" variant="link" onClick={() => setStep("forgot")}>
          Cancel
        </Button>
      </form>
    </>
  );
}
