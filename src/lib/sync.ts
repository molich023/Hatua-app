import { db } from './neon-db';
import { users, activities } from './schema';
import { eq, sql } from 'drizzle-orm';

export async function syncActivity(auth0Id: string, distanceKm: number) {
  const pointsEarned = Math.floor(distanceKm * 10); // 10km = 10 points

  // 1. Update the User's lifetime total and points
  await db.update(users)
    .set({
      totalPoints: sql`${users.totalPoints} + ${pointsEarned}`,
      totalDistanceKm: sql`${users.totalDistanceKm} + ${distanceKm}`,
    })
    .where(eq(users.auth0Id, auth0Id));

  // 2. Log the specific activity
  await db.insert(activities).values({
    auth0Id: auth0Id,
    distance: distanceKm,
    pointsEarned: pointsEarned,
    type: distanceKm > 0 ? 'Outdoor' : 'Indoor',
  });

  return { pointsEarned };
}
