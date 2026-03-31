'use client';
import { Share2 } from "lucide-react";

export default function ShareRank({ name, points, lang }: { name: string, points: number, lang: 'en' | 'sw' }) {
  const handleShare = async () => {
    const text = lang === 'sw' 
      ? `Nimepata pointi ${points} kwenye HATUA! 🦁 Jiunge nami tufanye mazoezi: hatua.fitness`
      : `I just hit ${points} points on HATUA! 🦁 Join me and start earning: hatua.fitness`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'HATUA Fitness', text: text, url: 'https://hatua.fitness' });
      } catch (err) { console.log("Share failed"); }
    } else {
      // Fallback for desktop: Copy to clipboard
      navigator.clipboard.writeText(text);
      alert(lang === 'sw' ? "Imenakiliwa!" : "Copied to clipboard!");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95"
    >
      <Share2 size={14} />
      {lang === 'sw' ? 'SAMBAZA' : 'SHARE RANK'}
    </button>
  );
}
