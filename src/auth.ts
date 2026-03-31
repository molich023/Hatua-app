import { WelcomeMagicLink } from "./emails/WelcomeMagicLink";
import { render } from "@react-email/components";
// ... other imports

export const { handlers, auth } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "HATUA <onboarding@resend.dev>", // Change once domain is verified
      async sendVerificationRequest({ identifier, url, provider }) {
        const { host } = new URL(url);
        const resend = new Resend(provider.apiKey);
        
        // Render the React template to HTML
        const html = await render(WelcomeMagicLink({ url }));

        const result = await resend.emails.send({
          from: provider.from as string,
          to: identifier,
          subject: `Your Login Link for HATUA 🦁`,
          html: html,
        });

        if (result.error) throw new Error(result.error.message);
      },
    }),
  ],
  // ... rest of your config
});
