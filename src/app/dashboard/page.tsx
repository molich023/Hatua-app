'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Component Imports
import TrialCountdown from '@/components/TrialCountdown';
import StatsGrid from '@/components/StatsGrid';
import Odometer from '@/components/Odometer';
import Leaderboard from '@/components/Leaderboard';
import ActivityHistory from '@/components/ActivityHistory';
import ShareRank from '@/components/ShareRank';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('track'); 
  const [lang, setLang] = useState<'en' | 'sw'>('sw');
  const [runners, setRunners] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalDistance: 0, activityCount: 0 });
  const [loadingData, setLoadingData] = useState(false);

  // Auth Protection
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  // Global Stats & History Refresh
  const refreshData = () => {
    fetch('/api/stats').then(res => res.json()).then(data => setStats(data));
    fetch('/api/activities').then(res => res.json()).then(data => setHistory(data));
  };

  useEffect(() => {
    if (status === 'authenticated') refreshData();
  }, [status]);

  // Leaderboard fetch
  useEffect(() => {
    if (activeTab === 'rank' && status === 'authenticated') {
      setLoadingData(true);
      fetch('/api/leaderboard')
        .then(res => res.json())
        .then(data => {
          setRunners(data);
          setLoadingData(false);
        });
    }
  }, [activeTab, status]);

  // --- MILESTONE: 100 POINTS BADGE ---
  useEffect(() => {
    if (session?.user?.points && session.user.points >= 100) {
      const hasSeen = localStorage.getItem('badge_100');
      if (!hasSeen) {
        toast.message("Point Centurion! 🎖️", {
          description: "You've earned 100+ points and joined the top tier of runners.",
        });
        localStorage.setItem('badge_100', 'true');
      }
    }
  }, [session?.user?.points]);

  if (status === 'loading') return <div className="min-h-screen bg-white flex items-center justify-center font-black text-green-700">HATUA...</div>;

  const navItems = [
    { id: 'track', label: { en: 'Track', sw: 'Fuatilia' }, icon: '🏃' },
    { id: 'rank', label: { en: 'Rank', sw: 'Nafasi' }, icon: '🏆' },
    { id: 'wallet', label: { en: 'Wallet', sw: 'Mkoba' }, icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-green-700 italic">HATUA</span>
          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {session?.user?.plan === 'simba_trial' ? 'Simba 🦁' : 'Mwanachama'}
          </span>
        </div>
        <button onClick={() => setLang(lang === 'en' ? 'sw' : 'en')} className="text-[10px] font-black border-2 border-slate-200 px-3 py-1 rounded-full uppercase">
          {lang === 'en' ? 'SWAHILI' : 'ENGLISH'}
        </button>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-6">
        <section className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-slate-800">
              {lang === 'sw' ? 'Habari,' : 'Hello,'} {session?.user?.name?.split(' ')[0] || 'Lion'}!
            </h1>
            <p className="text-xs text-slate-500 font-bold italic">Every step counts.</p>
          </div>
          <ShareRank name={session?.user?.name || 'Lion'} points={session?.user?.points || 0} lang={lang} />
        </section>

        <TrialCountdown plan={session?.user?.plan} trialExpires={session?.user?.trialExpires} />
        
        <StatsGrid 
          totalPoints={session?.user?.points || 0} 
          totalDistance={stats.totalDistance} 
          activityCount={stats.activityCount} 
        />

        <div className="transition-all duration-300">
          {activeTab === 'track' && (
             <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <Odometer user={session?.user} lang={lang} />
                </div>
                <ActivityHistory activities={history} lang={lang} />
             </div>
          )}
          
          {activeTab === 'rank' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {loadingData ? <div className="text-center py-20 animate-pulse text-slate-400 font-black">SEARCHING...</div> : <Leaderboard runners={runners} lang={lang} />}
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="bg-white p-8 rounded-[40px] border-2 border-dashed border-slate-200 text-center py-16 flex flex-col items-center">
               <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">💰</div>
               <p className="font-black text-slate-800 text-xl uppercase tracking-tighter">{lang === 'sw' ? 'Mkoba wa M-Pesa' : 'M-Pesa Wallet'}</p>
               <div className="mt-8 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-600 h-full transition-all duration-1000" style={{ width: `${Math.min((session?.user?.points || 0) / 10, 100)}%` }}></div>
               </div>
               <p className="text-[10px] font-black text-slate-400 mt-2">PROGRESS: {session?.user?.points || 0} / 1000</p>
            </div>
          )}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-3 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 min-w-[80px] transition-all ${activeTab === item.id ? 'text-green-700 scale-110' : 'text-slate-400'}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label[lang]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
