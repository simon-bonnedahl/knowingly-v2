"use client";
import { SignInWithGoogle } from "./oauth/google";
import { SignInWithLinkedin } from "./oauth/linkedin";

export function SignInWithOAuth() {
  return (
    <div className="flex flex-col min-[460px]:flex-row w-full gap-2 items-stretch">
      <SignInWithGoogle />
      <SignInWithLinkedin />
    </div>
  );
}