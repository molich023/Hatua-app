import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      trialExpiresAt?: string;
    } & DefaultSession["user"];
  }

  interface User {
    currentTier?: string;
    trialExpiresAt?: string;
  }
}
