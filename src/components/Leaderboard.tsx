'use client';
import { Medal } from "lucide-react";

interface LeaderboardProps {
  runners: any[];
  lang: 'en' | 'sw';
}

export default function Leaderboard({ runners, lang }: LeaderboardProps) {
  const getTierIcon = (index: number) => {
    if (index === 0) return { icon: "🦁", label: "Simba", color: "text-yellow-600" };
    if (index === 1) return { icon: "🐆", label: "Chui", color: "text-slate-500" };
    if (index === 2) return { icon: "🐃", label: "Nyati", color: "text-orange-700" };
    return { icon: "🏃", label: "Runner", color: "text-slate-400" };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-green-700 p-4 text-white">
        <h3 className="font-black flex items-center gap-2">
          <Medal className="w-5 h-5" />
          {lang === 'sw' ? 'WANAONGOZA' : 'LEADERBOARD'}
        </h3>
      </div>
      
      <div className="divide-y divide-slate-100">
        {runners.map((runner, index) => {
          const tier = getTierIcon(index);
          return (
            <div key={runner.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className={`font-black text-lg ${tier.color} w-4`}>{index + 1}</span>
                <span className="text-2xl">{tier.icon}</span>
                <div>
                  <p className="font-bold text-slate-800 leading-tight">
                    {runner.name || "Mwanariadha"}
                  </p>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                    {tier.label}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-green-700">{runner.points || 0}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Points</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
