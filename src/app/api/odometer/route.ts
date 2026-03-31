import { auth } from "@/auth";
import { db } from "@/db";
import { activities, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { distance } = await req.json(); // distance in km
  
  // Calculate points: 10km = 10 points
  const pointsToAdd = Math.floor(distance / 10) * 10;

  if (pointsToAdd > 0) {
    // 1. Record the activity
    await db.insert(activities).values({
      userId: session.user.id,
      distanceKm: distance,
      pointsEarned: pointsToAdd,
    });

    // 2. Update user's total points
    await db.update(users)
      .set({ points: sql`${users.points} + ${pointsToAdd}` })
      .where(eq(users.id, session.user.id));
  }

  return NextResponse.json({ success: true, pointsEarned: pointsToAdd });
}
