"use client";
import { UserButton, ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const LoginButton = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin size-4" />
          </ClerkLoading>
        </>
      ) : (
        <Link href="/auth/sign-in">Login</Link>
      )}
    </div>
  );
};
