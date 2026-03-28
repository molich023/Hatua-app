'use client';

import React, { useState } from 'react';
import { POINT_TO_KSH_RATE } from '@/lib/mpesa-service';

export default function MpesaRedeem({ userPoints, userPhone, lang = 'sw' }) {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const kshValue = (userPoints * POINT_TO_KSH_RATE).toFixed(2);
  
  const t = {
    en: { title: "Cash Out", balance: "Your Balance", value: "Estimated Value", btn: "Redeem to M-Pesa", min: "Min. 500 points required", success: "Sent to" },
    sw: { title: "Toa Pesa", balance: "Salio Lako", value: "Thamani ya Pesa", btn: "Tuma kwa M-Pesa", min: "Inahitajika angalau pointi 500", success: "Imetumwa kwa" }
  }[lang];

  const handleRedeem = async () => {
    if (userPoints < 500) return;
    setIsRedeeming(true);
    
    // Simulate API call to Netlify Function /api/mpesa/payout
    setTimeout(() => {
      setIsRedeeming(false);
      setSuccessId("MTC8291HX0"); // Mock M-Pesa Ref
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-2xl text-green-700 font-black">M</div>
        <h2 className="text-xl font-black uppercase text-slate-800">{t.title}</h2>
      </div>

      {/* Point Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs opacity-60 font-bold uppercase mb-1">{t.balance}</p>
          <p className="text-4xl font-black mb-4">{userPoints} <span className="text-sm font-normal">pts</span></p>
          
          <div className="h-[1px] bg-white/10 w-full mb-4" />
          
          <p className="text-xs opacity-60 font-bold uppercase mb-1">{t.value}</p>
          <p className="text-2xl font-black text-yellow-400">KSH {kshValue}</p>
        </div>
        {/* Subtle decorative circle */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />
      </div>

      {!successId ? (
        <>
          <p className="text-[10px] text-center text-gray-400 font-bold uppercase mb-4">
            {t.success} M-PESA: {userPhone.replace(/.(?=.{4})/g, '*')}
          </p>
          
          <button 
            disabled={userPoints < 500 || isRedeeming}
            onClick={handleRedeem}
            className={`w-full py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 ${
              userPoints < 500 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-[#2EB82E] text-white hover:shadow-lg active:scale-95'
            }`}
          >
            {isRedeeming ? 'Tafadhali subiri...' : t.btn}
          </button>
          
          {userPoints < 500 && (
            <p className="text-center text-red-500 text-[10px] font-bold mt-2 uppercase">
              {t.min}
            </p>
          )}
        </>
      ) : (
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-green-700 font-bold">✓ {t.success} {userPhone}</p>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">Ref: {successId}</p>
        </div>
      )}
    </div>
  );
}
