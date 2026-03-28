export async function processReferral(referrerCode: string, newUserId: string) {
  return await db.transaction(async (tx) => {
    // 1. Find the inviter
    const [inviter] = await tx.select().from(users).where(eq(users.referralCode, referrerCode));
    
    if (inviter) {
      // 2. Award 20 points to inviter
      await tx.update(users)
        .set({ points: sql`${users.points} + 20` })
        .where(eq(users.id, inviter.id));

      // 3. Link the new user
      await tx.update(users)
        .set({ referredBy: inviter.id })
        .where(eq(users.id, newUserId));
    }
  });
}
