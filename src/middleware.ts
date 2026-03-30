import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const user = session?.user;
  const url = req.nextUrl.pathname;

  // 1. Get custom claims (Role and Trial Expiry)
  // Tip: You can pass 'trial_expires_at' from Auth0 Actions to avoid a DB hit here
  const userRole = user?.['https://hatua-fitness.netlify.app/role'] || 'Cheetah';
  const trialExpiresAt = user?.['https://hatua-fitness.netlify.app/trial_expires'] || 0;
  
  const isTrialActive = new Date(trialExpiresAt) > new Date();

  // 2. Protect the "Simba Lounge"
  // Allow access if they are a Simba OR if their 7-day trial is still active
  if (url.startsWith('/dashboard/simba-lounge')) {
    if (userRole !== 'Simba' && !isTrialActive) {
      return NextResponse.redirect(new URL('/dashboard/upgrade', req.url));
    }
  }

  // 3. Protect the "Chui Track"
  if (url.startsWith('/dashboard/chui-track')) {
    if (userRole === 'Cheetah' && !isTrialActive) {
      return NextResponse.redirect(new URL('/dashboard/training', req.url));
    }
  }

  return res;
});

export const config = {
  // CRITICAL: We exclude the M-Pesa callback and static assets
  matcher: [
    '/dashboard/:path*', 
    '/leaderboard/:path*',
    '/((?!api/mpesa/callback|api/auth|auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
