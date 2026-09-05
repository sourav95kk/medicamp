import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, Plus, Clock, FileText, Bookmark, Calendar, 
  BarChart3, Sparkles, ChevronRight, UploadCloud, Stethoscope 
} from 'lucide-react';

export default function PatientHome({ 
  onNavigateAddRecord, 
  onNavigateHistory, 
  onNavigateFamily, 
  onNavigateNotifications,
  onNavigatePrescriptionUpload,
  onNavigateReminders,
  onNavigateReports
}) {
  const { user, allMembers, activeMemberId, setActiveMemberId } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* 1. Header (Screen 8 Top) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          {/* Avatar with initial 'S' */}
          <div className="w-11 h-11 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold text-base shadow-sm">
            {user?.name?.[0] || 'S'}
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A] leading-tight">
              Hello, {user?.name?.split(' ')[0] || 'Sourav'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Take charge of your health
            </p>
          </div>
        </div>

        {/* Notification Bell with red dot */}
        <button
          onClick={onNavigateNotifications}
          className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors ios-tap"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
      </div>

      {/* 2. My Family Section with Horizontal Avatars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">My Family</h3>
          <button
            onClick={onNavigateFamily}
            className="text-xs font-bold text-[#1B64DA] hover:underline"
          >
            See All
          </button>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto pb-1 scrollbar-none">
          {allMembers.map((member, index) => {
            const isMe = member.relation === 'Self';
            const colors = [
              'bg-emerald-500 text-white',
              'bg-pink-500 text-white',
              'bg-orange-500 text-white',
              'bg-amber-600 text-white'
            ];
            const colorClass = colors[index % colors.length];

            return (
              <div
                key={member.id}
                onClick={() => setActiveMemberId(member.id)}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer ios-tap"
              >
                <div className={`w-13 h-13 rounded-full flex items-center justify-center font-bold text-sm shadow-sm relative p-0.5 ${
                  activeMemberId === member.id ? 'ring-2 ring-[#1B64DA] ring-offset-2' : ''
                }`}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                <div className="text-center mt-1.5">
                  <p className="text-[11px] font-bold text-slate-800 truncate max-w-[64px]">
                    {member.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    ({isMe ? 'Me' : member.relation})
                  </p>
                </div>
              </div>
            );
          })}

          {/* Add Member Button */}
          <div
            onClick={onNavigateFamily}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer ios-tap"
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-300 text-blue-600 flex items-center justify-center bg-blue-50/50 hover:bg-blue-100 transition-colors">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <p className="text-[11px] font-bold text-blue-600 mt-1.5">Add</p>
          </div>
        </div>
      </div>

      {/* 3. 2x3 Colorful Feature Grid (Screen 8 Center) */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Card 1: Add Medical Record (Teal) */}
        <div
          onClick={onNavigateAddRecord}
          className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-3 cursor-pointer hover:border-slate-300 shadow-sm transition-all ios-tap"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E6FFFA] text-[#0D9488] flex items-center justify-center flex-shrink-0">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
              Add Medical Record
            </h4>
          </div>
        </div>

        {/* Card 2: View History (Purple) */}
        <div
          onClick={onNavigateHistory}
          className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-3 cursor-pointer hover:border-slate-300 shadow-sm transition-all ios-tap"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
              View History
            </h4>
          </div>
        </div>

        {/* Card 3: Upload Prescription (Blue) */}
        <div
          onClick={onNavigateAddRecord}
          className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-3 cursor-pointer hover:border-slate-300 shadow-sm transition-all ios-tap"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1B64DA] flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
              Upload Prescription
            </h4>
          </div>
        </div>

        {/* Card 4: Bookmarked (Orange) */}
        <div
          onClick={onNavigateHistory}
          className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-3 cursor-pointer hover:border-slate-300 shadow-sm transition-all ios-tap"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center flex-shrink-0">
            <Bookmark className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
              Bookmarked
            </h4>
          </div>
        </div>

        {/* Card 5: Reminders (Violet) */}
        <div
          onClick={onNavigateReminders}
          className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-3 cursor-pointer hover:border-slate-300 shadow-sm transition-all ios-tap"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#6D28D9] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
              Reminders
            </h4>
          </div>
        </div>

        {/* Card 6: Reports & Insights (Cyan) */}
        <div
          onClick={onNavigateReports}
          className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-3 cursor-pointer hover:border-slate-300 shadow-sm transition-all ios-tap"
        >
          <div className="w-10 h-10 rounded-xl bg-[#ECFEFF] text-[#0891B2] flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
              Reports & Insights
            </h4>
          </div>
        </div>

      </div>

      {/* 4. Promo Banner (Screen 8 Bottom) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100/80 flex items-center justify-between gap-3 shadow-sm">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-[#0F172A]">
            Better Health for a Brighter Tomorrow
          </h4>
          <p className="text-[11px] text-teal-700 font-medium">
            Keep your records updated!
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" fill="#E6FFFA" />
            <path d="M50 25 V75 M25 50 H75" stroke="#0D9488" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

    </div>
  );
}
