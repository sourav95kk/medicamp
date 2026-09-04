import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, FileText, Pill, Users, Search, PlusCircle, Stethoscope } from 'lucide-react';

export default function IOSTabBar() {
  const { currentMode, activeTab, setActiveTab, setShowAddRecordModal } = useApp();

  if (currentMode === 'doctor') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 glass-sheet border-t border-slate-200/80 pb-safe">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-around">
          <button
            onClick={() => setActiveTab('doctor_search')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'doctor_search' ? 'text-emerald-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Aadhaar Search</span>
          </button>

          <button
            onClick={() => setActiveTab('doctor_recent')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'doctor_recent' ? 'text-emerald-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Consultations</span>
          </button>

          <button
            onClick={() => setActiveTab('doctor_profile')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'doctor_profile' ? 'text-emerald-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">My Credentials</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-sheet border-t border-slate-200/80 pb-safe">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'timeline' ? 'text-sky-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Timeline</span>
        </button>

        <button
          onClick={() => setActiveTab('records')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'records' ? 'text-sky-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Prescriptions</span>
        </button>

        {/* Center Prominent Add Button */}
        <button
          onClick={() => setShowAddRecordModal(true)}
          className="flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 border-4 border-[#F2F2F7]">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-bold text-sky-700 mt-0.5">Log Visit</span>
        </button>

        <button
          onClick={() => setActiveTab('medications')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'medications' ? 'text-sky-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Pill className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Medicines</span>
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'family' ? 'text-sky-600 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Family</span>
        </button>
      </div>
    </div>
  );
}
