'use client';
import { Calendar, MapPin } from "lucide-react";

export default function ActivityHistory({ activities, lang }: { activities: any[], lang: 'en' | 'sw' }) {
  if (activities.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">
        {lang === 'sw' ? 'Historia ya Hatua' : 'Step History'}
      </h3>
      {/* Scrollable Container */}
      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 scrollbar-hide">
        {activities.map((item) => (
          <div key={item.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-full text-green-600">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">{item.distanceKm} KM</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-bold">
                  <Calendar size={10} /> {new Date(item.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-700 font-black">+{item.pointsEarned}</p>
              <p className="text-[9px] font-bold text-slate-300 uppercase">Points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
