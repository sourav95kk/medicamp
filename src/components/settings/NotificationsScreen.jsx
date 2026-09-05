import React, { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';
import { ChevronLeft, Bell, Sparkles, FileText, User, ChevronRight } from 'lucide-react';

export default function NotificationsScreen({ onBack }) {
  const [filter, setFilter] = useState('All'); // 'All' | 'Updates' | 'Reminders'

  const filteredNotifs = MOCK_NOTIFICATIONS.filter(n => {
    if (filter === 'All') return true;
    return n.category === filter;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 19) */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#0F172A]">
          Notifications
        </h1>
      </div>

      {/* Segmented Filter [ All | Updates | Reminders ] (Screen 19) */}
      <div className="bg-[#F1F5F9] p-1 rounded-xl flex gap-1">
        {['All', 'Updates', 'Reminders'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ios-tap ${
              filter === tab
                ? 'bg-[#1B64DA] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List (Screen 19) */}
      <div className="space-y-2.5">
        {filteredNotifs.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer shadow-sm ios-tap"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${item.iconColor}`}>
                {item.type === 'reminder' && <Bell className="w-4 h-4" />}
                {item.type === 'feature' && <Sparkles className="w-4 h-4" />}
                {item.type === 'record' && <FileText className="w-4 h-4" />}
                {item.type === 'profile' && <User className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#0F172A]">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {item.message}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {item.time}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
          </div>
        ))}
      </div>

    </div>
  );
}
