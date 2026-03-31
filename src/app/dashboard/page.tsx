'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import TrialCountdown from '@/components/TrialCountdown';
import StatsGrid from '@/components/StatsGrid';
import Odometer from '@/components/Odometer';
import Leaderboard from '@/components/Leaderboard'; 

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('track'); 
  const [lang, setLang] = useState<'en' | 'sw'>('sw');
  
  // State for the real leaderboard data
  const [runners, setRunners] = useState([]);
  const [loadingRunners, setLoadingRunners] = useState(false);
// Inside your Dashboard function in src/app/dashboard/page.tsx

const [stats, setStats] = useState({ totalDistance: 0, activityCount: 0 });

useEffect(() => {
  // Fetch Stats when the page loads
  fetch('/api/stats')
    .then(res => res.json())
    .then(data => setStats(data));

  // Fetch Leaderboard when 'rank' tab is active
  if (activeTab === 'rank') {
    setLoadingRunners(true);
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        setRunners(data);
        setLoadingRunners(false);
      });
  }
}, [activeTab]);

// ... then in your return statement, update the StatsGrid:
<StatsGrid 
  totalPoints={session?.user?.points || 0} 
  totalDistance={stats.totalDistance} 
  activityCount={stats.activityCount} 
/>
      
  // Protect the page: If not logged in, go to signin
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  // Fetch Leaderboard data when the "Rank" tab is selected
  useEffect(() => {
    if (activeTab === 'rank') {
      setLoadingRunners(true);
      fetch('/api/leaderboard')
        .then((res) => res.json())
        .then((data) => {
          setRunners(data);
          setLoadingRunners(false);
        })
        .catch((err) => {
          console.error("Error fetching leaderboard:", err);
          setLoadingRunners(false);
        });
    }
  }, [activeTab]);

  const navItems = [
    { id: 'track', label: { en: 'Track', sw: 'Fuatilia' }, icon: '🏃' },
    { id: 'rank', label: { en: 'Rank', sw: 'Nafasi' }, icon: '🏆' },
    { id: 'wallet', label: { en: 'Wallet', sw: 'Mkoba' }, icon: '💰' },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <span className="text-4xl mb-4 animate-bounce">🏃</span>
        <div className="font-black text-green-700 tracking-tighter text-xl">HATUA Inapakia...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Header */}
      <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-green-700 italic">HATUA</span>
          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {session?.user?.plan === 'simba_trial' ? 'Simba 🦁' : 'Mwanachama'}
          </span>
        </div>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
          className="text-xs font-black border-2 border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors uppercase"
        >
          {lang === 'en' ? 'SWAHILI' : 'ENGLISH'}
        </button>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Welcome Section */}
        <section>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {lang === 'sw' ? 'Habari,' : 'Hello,'} {session?.user?.name?.split(' ')[0] || 'Mwanariadha'}!
          </h1>
          <p className="text-sm text-slate-500 font-medium italic">
            {lang === 'sw' ? 'Kila hatua ni ushindi mdogo.' : 'Every step is a small victory.'}
          </p>
        </section>

        {/* 1. Trial Countdown */}
        <TrialCountdown 
          plan={session?.user?.plan} 
          trialExpires={session?.user?.trialExpires} 
        />

        {/* 2. Real-Time Stats Grid */}
        <StatsGrid 
          totalPoints={session?.user?.points || 0} 
          totalDistance={0} 
          activityCount={0}
        />

        {/* 3. Dynamic Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'track' && (
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Odometer user={session?.user} lang={lang} />
             </div>
          )}
          
          {activeTab === 'rank' && (
            <div>
              {loadingRunners ? (
                <div className="text-center py-10 font-bold text-slate-400 italic animate-pulse">
                   Inatafuta nafasi...
                </div>
              ) : (
                <Leaderboard runners={runners} lang={lang} />
              )}
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-slate-200 text-center py-12 flex flex-col items-center">
               <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4">💰</div>
               <p className="font-black text-slate-800 text-lg uppercase tracking-tighter">
                 {lang === 'sw' ? 'Mkoba wa M-Pesa' : 'M-Pesa Wallet'}
               </p>
               <p className="text-sm text-slate-500 max-w-[200px] mx-auto mt-1">
                 {lang === 'sw' ? 'Pointi 1,000 zinahitajika ili kutoa pesa.' : '1,000 points required to withdraw.'}
               </p>
               <button className="mt-6 bg-slate-100 text-slate-400 font-black px-6 py-2 rounded-full text-xs cursor-not-allowed">
                  REDEEM NOW
               </button>
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
            className={`flex flex-col items-center gap-1 p-2 min-w-[70px] transition-all ${
              activeTab === item.id ? 'text-green-700 scale-110' : 'text-slate-400'
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
