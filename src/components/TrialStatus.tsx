'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function TrialStatus() {
  const { user } = useUser();
  
  // Grab the claim we set in the Auth0 Action
  const trialExpiry = user?.['https://hatua-fitness.netlify.app/trial_expires'] as string;
  
  if (!trialExpiry) return null;

  const daysLeft = Math.ceil(
    (new Date(trialExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysLeft <= 0) return (
    <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-bold text-center">
      ⚠️ Trial Expired. Upgrade to Simba to keep your points!
    </div>
  );

  return (
    <div className="bg-solar/20 border border-solar text-earth p-3 rounded-lg text-sm text-center">
      🦁 You have <b>{daysLeft} days</b> left in your Simba Trial. 
      <a href="/dashboard/upgrade" className="underline ml-2 font-bold">Upgrade Now</a>
    </div>
  );
}
