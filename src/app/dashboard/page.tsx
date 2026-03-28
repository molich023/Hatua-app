'use client';

import React, { useState } from 'react';
import Odometer from '@/components/Odometer';
import Leaderboard from '@/components/Leaderboard';
import MpesaRedeem from '@/components/MpesaRedeem';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('track'); // track | rank | wallet
  const [lang, setLang] = useState<'en' | 'sw'>('sw');

  const navItems = [
    { id: 'track', label: { en: 'Track', sw: 'Fuatilia' }, icon: '🏃' },
    { id: 'rank', label: { en: 'Rank', sw: 'Nafasi' }, icon: '🏆' },
    { id: 'wallet', label: { en: 'Wallet', sw: 'Mkoba' }, icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Header */}
      <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-green-700">HATUA</span>
          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {session?.user?.tier || 'Msingi'}
          </span>
        </div>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
          className="text-xs font-bold border-2 border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-100"
        >
          {lang === 'en' ? 'SWAHILI' : 'ENGLISH'}
        </button>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        {/* Welcome Section */}
        <section className="mb-6">
          <h1 className="text-2xl font-black text-slate-800">
            {lang === 'sw' ? 'Habari,' : 'Hello,'} {session?.user?.name || 'Mwanariadha'}!
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {lang === 'sw' ? 'Kila hatua ni ushindi mdogo.' : 'Every step is a small victory.'}
          </p>
        </section>

        {/* Dynamic Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'track' && <Odometer user={session?.user} lang={lang} />}
          {activeTab === 'rank' && <Leaderboard topUsers={mockTopUsers} lang={lang} />}
          {activeTab === 'wallet' && (
            <MpesaRedeem 
              userPoints={session?.user?.points || 20} 
              userPhone={session?.user?.phone || '0700***000'} 
              lang={lang} 
            />
          )}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 min-w-[70px] transition-colors ${
              activeTab === item.id ? 'text-green-700' : 'text-slate-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">
              {item.label[lang]}
            </span>
            {activeTab === item.id && <div className="w-1 h-1 bg-green-700 rounded-full" />}
          </button>
        ))}
      </nav>
    </div>
  );
}

// Mock Data for UI demonstration
const mockTopUsers = [
  { id: '1', avatar: 'Simba', totalMeters: 52000, points: 520 },
  { id: '2', avatar: 'Chui', totalMeters: 48500, points: 485 },
  { id: '3', avatar: 'Nyati', totalMeters: 41000, points: 410 },
];
