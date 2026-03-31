import { auth } from "@/auth";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const history = await db
    .select()
    .from(activities)
    .where(eq(activities.userId, session.user.id))
    .orderBy(desc(activities.timestamp))
    .limit(20); // Last 20 walks

  return NextResponse.json(history);
}
