// Inside the registration logic
const newUser = await db.insert(users).values({
  fullName,
  email,
  phone,
  password: hashedPassword,
  points: 20, // Crediting 20 points as requested
  referralCode: generateUniqueCode(),
  avatar: 'Simba' // Default identity protection
}).returning();
