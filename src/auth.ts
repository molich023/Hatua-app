import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { render } from "@react-email/components";
import React from "react";

// 1. Import your database and schema
import { db } from "./db"; 
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

// 2. Import your custom Lion email template
import { WelcomeMagicLink } from "./emails/WelcomeMagicLink";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Link Auth.js to your Neon Database
  adapter: DrizzleAdapter(db),
  
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      // Make sure this matches your verified domain in Resend!
      from: "HATUA <hello@hatua.fitness>", 
      
      async sendVerificationRequest({ identifier, url, provider }) {
        try {
          // Render the React template to HTML string
          const emailHtml = await render(
            React.createElement(WelcomeMagicLink, { url })
          );

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: provider.from,
              to: identifier,
              subject: "Your HATUA Magic Link 🦁",
              html: emailHtml,
            }),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to send email");
          }
        } catch (error) {
          console.error("Resend Error:", error);
          throw new Error("SEND_VERIFICATION_EMAIL_ERROR");
        }
      },
    }),
  ],

  // 3. Automation Logic
  events: {
    // This runs ONLY the first time a user is created in your DB
    async createUser({ user }) {
      if (!user.id) return;

      const trialDays = 7;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + trialDays);

      try {
        // Update the user record with the Simba Trial details
        await db.update(users)
          .set({
            plan: "simba_trial",
            trialExpires: expiresAt,
            points: 0,
          })
          .where(eq(users.id, user.id));

        console.log(`🦁 Welcome to the Pride: ${user.email} (Trial ends: ${expiresAt.toDateString()})`);
      } catch (error) {
        console.error("Failed to set Simba Trial:", error);
      }
    },
  },

  // 4. Custom Pages (Tells Auth.js where your login page lives)
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/signin", // Stay on same page to show "Check Email" message
  },

  // 5. Session Strategy
  session: {
    strategy: "database", // Since we use an adapter, we store sessions in Neon
  },
});
