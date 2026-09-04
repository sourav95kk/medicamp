import React from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, User, ShieldAlert, Activity, Plus, LogIn, LogOut, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

export default function IOSHeader() {
  const {
    user,
    session,
    currentMode,
    activeMember,
    setShowRoleSwitcherModal,
    setShowAddRecordModal,
    setShowEmergencyCardModal,
    setShowAuthModal,
    signOut
  } = useApp();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-slate-200/80 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: App Logo & Current Mode Indicator */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-all ${
            currentMode === 'doctor'
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/25'
              : 'bg-gradient-to-tr from-sky-600 to-blue-600 text-white shadow-sky-500/25'
          }`}>
            {currentMode === 'doctor' ? (
              <Stethoscope className="w-5 h-5" />
            ) : (
              <Activity className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                MediCamp
              </span>
              <button
                onClick={() => setShowRoleSwitcherModal(true)}
                className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border transition-all flex items-center gap-1 ${
                  currentMode === 'doctor'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                {currentMode === 'doctor' ? 'Doctor Portal' : 'Patient Mode'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate max-w-[180px] sm:max-w-none">
              {formattedDate} • {currentMode === 'doctor' ? `Dr. ${user.name}` : `${activeMember?.name || 'Self'} (${activeMember?.relation || 'Self'})`}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {currentMode === 'patient' && (
            <>
              <button
                onClick={() => setShowEmergencyCardModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition-all ios-press"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Medical ID
              </button>

              <button
                onClick={() => setShowAddRecordModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:bg-sky-700 transition-all ios-press"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Record</span>
              </button>
            </>
          )}

          {/* Role Switch Pill */}
          <button
            onClick={() => setShowRoleSwitcherModal(true)}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ios-press ${
              currentMode === 'doctor'
                ? 'bg-white text-emerald-700 border-emerald-300 shadow-sm hover:bg-emerald-50'
                : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50'
            }`}
            title="Switch between Patient and Doctor View"
          >
            {currentMode === 'doctor' ? (
              <>
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline font-bold">Doctor Mode</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline font-bold">Doctor View</span>
              </>
            )}
          </button>

          {/* Auth Button */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all ios-press flex items-center gap-1.5"
            title="Login / Account"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
}
