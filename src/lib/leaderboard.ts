import { db } from "./db";
import { users, activities } from "./schema";
import { desc, sql, sum } from "drizzle-orm";

export async function getTopPerformers(limit = 10) {
  return await db
    .select({
      id: users.id,
      avatar: users.avatar,
      totalMeters: sum(activities.distanceMeters).mapWith(Number),
      points: users.points,
    })
    .from(users)
    .leftJoin(activities, sql`${users.id} = ${activities.userId}`)
    .groupBy(users.id)
    .orderBy(desc(sum(activities.distanceMeters)))
    .limit(limit);
}
