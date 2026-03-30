'use client';

import { useState } from 'react';

export default function UpgradeButton({ userId }: { userId: string }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mpesa/push', {
        method: 'POST',
        body: JSON.stringify({ 
          phone: phone.replace('+', ''), // Format: 2547XXXXXXXX
          amount: 1000, // Simba Tier Price
          userId: userId 
        }),
      });
      
      if (res.ok) {
        alert("Check your phone for the M-Pesa PIN prompt!");
      }
    } catch (err) {
      alert("Payment failed to initialize.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-solar rounded-2xl bg-white shadow-md">
      <h3 className="text-xl font-bold text-earth">Become a Simba 🦁</h3>
      <p className="text-sm text-gray-600 mb-4">KSH 1,000 / Year • Double Points • Elite Badge</p>
      
      <input 
        type="text" 
        placeholder="254712345678" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3 text-earth"
      />
      
      <button 
        onClick={handleUpgrade}
        disabled={loading || !phone}
        className="w-full bg-savanna text-white font-bold py-3 rounded-lg hover:bg-opacity-90 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "PAY VIA M-PESA"}
        const handleUpgrade = async () => {
  // Validation: Ensure it's a Kenyan number starting with 254
  if (!phone.startsWith('254') || phone.length !== 12) {
    alert("Please use format 2547XXXXXXXX");
    return;
  }

  setLoading(true);
  // ... rest of your fetch logic
        }
        
      </button>
    </div>
  );
}
