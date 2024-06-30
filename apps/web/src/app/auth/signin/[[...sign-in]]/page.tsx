"use client";
import { env } from "~/env";
import { SignIn, useUser } from "@clerk/nextjs";

export default function SigninPage() {

  return (
    <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <SignIn
        
    
      />
    </div>
  );
}
