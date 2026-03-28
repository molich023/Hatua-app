import { handleAuth } from '@auth0/nextjs-auth0';

// This single line creates /api/auth/login, /api/auth/logout, and /api/auth/callback
export const GET = handleAuth();
