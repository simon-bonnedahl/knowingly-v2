"use client";
import { SignIn } from "@clerk/nextjs";
import {  useSearchParams } from "next/navigation";

export default function SigninPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect_url");

  return (
    <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <SignIn
      forceRedirectUrl={redirect}
      routing="hash"
      />
    </div>
  );
}
