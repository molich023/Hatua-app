'use client';

import React from 'react';

const AVATAR_ICONS: Record<string, string> = {
  Simba: '🦁',
  Chui: '🐆',
  Nyati: '🦬',
  Tembo: '🐘',
  Kifaru: '🦏'
};

export default function Leaderboard({ topUsers, lang = 'sw' }) {
  const t = {
    en: { title: "Top Performers", rank: "Rank", user: "Athlete", dist: "Dist (KM)" },
    sw: { title: "Wachezaji Bora", rank: "Nafasi", user: "Mwanariadha", dist: "Umbali (KM)" }
  }[lang];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-green-700 to-green-600 p-6 text-white text-center">
        <h2 className="text-2xl font-black italic uppercase tracking-wider">{t.title}</h2>
      </div>

      <div className="p-4">
        {/* Podium for Top 3 */}
        <div className="flex justify-around items-end mb-8 pt-4">
          {topUsers.slice(0, 3).map((user, index) => (
            <div key={user.id} className="flex flex-col items-center">
              <span className="text-4xl mb-1">{AVATAR_ICONS[user.avatar] || '🏃'}</span>
              <div className={`w-16 rounded-t-lg flex items-center justify-center font-bold text-white ${
                index === 0 ? 'h-24 bg-yellow-500' : index === 1 ? 'h-16 bg-gray-400' : 'h-12 bg-orange-600'
              }`}>
                {index + 1}
              </div>
              <p className="text-xs font-bold mt-2 uppercase">{user.avatar}</p>
            </div>
          ))}
        </div>

        {/* The List */}
        <div className="space-y-2">
          {topUsers.map((user, index) => (
            <div key={user.id} className={`flex items-center justify-between p-3 rounded-xl ${
              index < 3 ? 'bg-green-50 border border-green-100' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-4">
                <span className="font-black text-gray-400 w-4">{index + 1}</span>
                <span className="text-2xl">{AVATAR_ICONS[user.avatar]}</span>
                <div>
                  <p className="font-bold leading-tight">{user.avatar} #{user.id.slice(0,4)}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">{user.points} Points</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-green-700">{(user.totalMeters / 1000).toFixed(1)}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold">KM</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
