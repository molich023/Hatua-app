import { pgTable, text, timestamp, integer, uuid, doublePrecision, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  plan: text("plan").default("free"),
  trialExpires: timestamp("trialExpires", { mode: "date" }),
  points: integer("points").default(0),
});

export const activities = pgTable("activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  distanceKm: doublePrecision("distance_km").notNull(),
  pointsEarned: integer("points_earned").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  isOutdoor: boolean("is_outdoor").default(true),
});
