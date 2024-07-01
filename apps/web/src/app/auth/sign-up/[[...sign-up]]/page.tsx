"use client";
import { SignUp } from "@clerk/nextjs";



export default function SignupPage() {
  return (
    <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <SignUp />
    </div>
  );
}
