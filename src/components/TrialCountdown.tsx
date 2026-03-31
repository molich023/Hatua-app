'use client';

import { Clock, Lion } from "lucide-react"; // Note: 'Lion' might be 'Cat' in some lucide versions, checking...
// Using 'Trophy' or 'Flame' if Lion isn't in your version
import { Trophy } from "lucide-react";

interface Props {
  trialExpires: Date | string | null;
  plan: string | null;
}

export default function TrialCountdown({ trialExpires, plan }: Props) {
  if (plan !== 'simba_trial' || !trialExpires) return null;

  const now = new Date();
  const expiry = new Date(trialExpires);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return (
    <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-bold">
      Simba Trial Expired. Upgrade to stay in the pride!
    </div>
  );

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-400 p-2 rounded-full">
          <Trophy className="text-white w-5 h-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-yellow-700 font-black">Simba Trial</p>
          <p className="text-lg font-bold text-earth">{diffDays} Days Left</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-yellow-600">Free 10km Points active</p>
      </div>
    </div>
  );
}
