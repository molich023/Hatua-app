import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const { email, fullName, secret } = await req.json();

  // 1. Security check: Only Auth0 can call this
  if (secret !== process.env.INTERNAL_SYNC_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Upsert (Update or Insert) the user
  const [existingUser] = await db.select().from(users).where(eq(users.email, email));

  if (!existingUser) {
    await db.insert(users).values({
      email,
      fullName,
      points: 20, // Crediting the 20-point welcome bonus!
      referralCode: `HATUA-${nanoid(5).toUpperCase()}`,
      avatar: 'Simba', // Default identity protection
      tier: 'Msingi'
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
