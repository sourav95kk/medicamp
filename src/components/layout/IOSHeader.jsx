import React from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, User, ShieldCheck, Plus, Sparkles, ChevronDown } from 'lucide-react';

export default function IOSHeader() {
  const {
    user,
    currentMode,
    activeMember,
    activeTab,
    setShowRoleSwitcherModal,
    setShowAddRecordModal,
    setShowAuthModal,
    setShowEmergencyCardModal
  } = useApp();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  const getPageTitle = () => {
    if (currentMode === 'doctor') {
      if (activeTab === 'doctor_search') return 'Patient Search';
      if (activeTab === 'doctor_recent') return 'Consultations';
      return 'Doctor Portal';
    }
    if (activeTab === 'timeline') return 'Health Summary';
    if (activeTab === 'records') return 'Prescriptions';
    if (activeTab === 'medications') return 'Medications';
    if (activeTab === 'family') return 'Family Vault';
    return 'MediCamp';
  };

  return (
    <header className="sticky top-0 z-40 ios-nav-blur border-b border-black/[0.06] transition-all pt-safe">
      <div className="max-w-xl mx-auto px-4 pt-3 pb-2 flex items-center justify-between">
        
        {/* Left: App Identity / Role Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRoleSwitcherModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ios-tap ${
              currentMode === 'doctor'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                : 'bg-white/80 text-blue-600 border-blue-200/80 shadow-sm'
            }`}
          >
            {currentMode === 'doctor' ? (
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            )}
            <span className="text-[11px] font-bold">
              {currentMode === 'doctor' ? 'Doctor Mode' : 'Patient Mode'}
            </span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
        </div>

        {/* Right: Quick Action & Profile Avatar (Apple Health Style) */}
        <div className="flex items-center gap-2">
          {currentMode === 'patient' && (
            <button
              onClick={() => setShowAddRecordModal(true)}
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm hover:bg-blue-700 transition-all ios-tap"
              title="Add Medical Record"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}

          {/* Profile Avatar Button */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10 shadow-sm ios-tap"
            title="Account & Settings"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* iOS Large Title Section */}
      <div className="max-w-xl mx-auto px-4 pt-1 pb-2 flex items-baseline justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">
            {formattedDate}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight">
            {getPageTitle()}
          </h1>
        </div>

        {currentMode === 'patient' && activeMember && (
          <div className="text-right">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {activeMember.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
