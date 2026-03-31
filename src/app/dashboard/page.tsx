'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import TrialCountdown from '@/components/TrialCountdown';
import StatsGrid from '@/components/StatsGrid';
import Odometer from '@/components/Odometer';
// import Leaderboard from '@/components/Leaderboard'; // Ensure these components exist
// import MpesaRedeem from '@/components/MpesaRedeem';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('track'); // track | rank | wallet
  const [lang, setLang] = useState<'en' | 'sw'>('sw');

  // Protect the page: If not logged in, go to signin
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const navItems = [
    { id: 'track', label: { en: 'Track', sw: 'Fuatilia' }, icon: '🏃' },
    { id: 'rank', label: { en: 'Rank', sw: 'Nafasi' }, icon: '🏆' },
    { id: 'wallet', label: { en: 'Wallet', sw: 'Mkoba' }, icon: '💰' },
  ];

  // Helper to handle loading state
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center font-bold text-green-700">HATUA Inapakia...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Header */}
      <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-green-700">HATUA</span>
          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {session?.user?.plan === 'simba_trial' ? 'Simba 🦁' : 'Mwanachama'}
          </span>
        </div>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
          className="text-xs font-bold border-2 border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-100"
        >
          {lang === 'en' ? 'SWAHILI' : 'ENGLISH'}
        </button>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Welcome Section */}
        <section>
          <h1 className="text-2xl font-black text-slate-800">
            {lang === 'sw' ? 'Habari,' : 'Hello,'} {session?.user?.name || 'Mwanariadha'}!
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {lang === 'sw' ? 'Kila hatua ni ushindi mdogo.' : 'Every step is a small victory.'}
          </p>
        </section>

        {/* 1. Trial Countdown Component */}
        <TrialCountdown 
          plan={session?.user?.plan} 
          trialExpires={session?.user?.trialExpires} 
        />

        {/* 2. Real-Time Stats Grid */}
        <StatsGrid 
          totalPoints={session?.user?.points || 0} 
          totalDistance={0} // We will link this to the activities table soon
          activityCount={0}
        />

        {/* 3. Dynamic Content Area based on Tabs */}
        <div className="transition-all duration-300">
          {activeTab === 'track' && (
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Odometer user={session?.user} lang={lang} />
             </div>
          )}
          
          {activeTab === 'rank' && (
            <div className="text-center py-10 text-slate-400 font-medium">
                {lang === 'sw' ? 'Nafasi za viongozi zinakuja hivi karibuni!' : 'Leaderboard coming soon!'}
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center py-12">
               <span className="text-4xl mb-2 block">💰</span>
               <p className="font-bold text-slate-800">
                 {lang === 'sw' ? 'Mkoba wa M-Pesa' : 'M-Pesa Wallet'}
               </p>
               <p className="text-sm text-slate-500">
                 {lang === 'sw' ? 'Pointi 1,000 zinahitajika ili kutoa pesa.' : '1,000 points required to withdraw.'}
               </p>
            </div>
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
            {activeTab === item.id && <div className="w-1.5 h-1.5 bg-green-700 rounded-full mt-1" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
