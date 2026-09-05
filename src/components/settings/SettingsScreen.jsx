import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronLeft, User, ShieldCheck, Lock, Bell, 
  ShieldAlert, Globe, HelpCircle, ChevronRight, LogOut, Stethoscope 
} from 'lucide-react';

export default function SettingsScreen({ 
  onBack, 
  onNavigateProfile, 
  onNavigateNotifications, 
  onNavigatePrivacy, 
  onNavigateHelp,
  onOpenSwitchMode
}) {
  const { signOut, user } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 17) */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#0F172A]">
          Settings
        </h1>
      </div>

      {/* Inset Grouped Settings List (Screen 17) */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl divide-y divide-[#F1F5F9] shadow-sm overflow-hidden">
        
        {/* Profile Information */}
        <div
          onClick={onNavigateProfile}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-[#0F172A]">Profile Information</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Linked Aadhaar */}
        <div
          onClick={onNavigateProfile}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-[#0F172A]">Linked Aadhaar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#E6FFFA] text-[#0D9488] text-[10px] font-bold rounded-md border border-[#99F6E4]/60">
              Verified
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Change Password */}
        <div
          onClick={() => alert('Password reset email sent to your registered email.')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-[#0F172A]">Change Password</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Notifications */}
        <div
          onClick={onNavigateNotifications}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-[#0F172A]">Notifications</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Data & Privacy */}
        <div
          onClick={onNavigatePrivacy}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-[#0F172A]">Data & Privacy</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Language */}
        <div
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-[#0F172A]">Language</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">English</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Help & Support */}
        <div
          onClick={onNavigateHelp}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-[#0F172A]">Help & Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

      </div>

      {/* Switch Mode / Log Out Buttons */}
      <div className="space-y-2">
        <button
          onClick={onOpenSwitchMode}
          className="w-full py-3 bg-[#EFF6FF] text-[#1B64DA] font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors ios-tap"
        >
          <Stethoscope className="w-4 h-4" />
          <span>Switch Patient / Doctor Mode</span>
        </button>

        <button
          onClick={signOut}
          className="w-full py-3 bg-red-50 text-red-600 font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors ios-tap"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
}
