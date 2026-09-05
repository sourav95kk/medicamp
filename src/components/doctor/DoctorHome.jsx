import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DOCTOR_RECENT_PATIENTS } from '../../data/mockData';
import { 
  Bell, Search, QrCode, User, Settings, HelpCircle, 
  ChevronRight, Plus, Stethoscope, ShieldCheck 
} from 'lucide-react';

export default function DoctorHome({ 
  onSelectPatient, 
  onNavigateProfile, 
  onNavigateSettings, 
  onNavigateHelp,
  onNavigateNotifications
}) {
  const { user } = useApp();
  const [searchAadhaar, setSearchAadhaar] = useState('');

  const filteredPatients = DOCTOR_RECENT_PATIENTS.filter(p => {
    if (!searchAadhaar) return true;
    const q = searchAadhaar.toLowerCase().replace(/\s/g, '');
    return p.name.toLowerCase().includes(q) || p.aadhaar.includes(q);
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* 1. Header (Screen 14 Top) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          {/* Blue Avatar with 'D' */}
          <div className="w-11 h-11 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold text-base shadow-sm">
            D
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A] leading-tight">
              Dr. {user?.name || 'Sourav Kumar'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {user?.doctorDetails?.specialty || 'General Physician'}
            </p>
          </div>
        </div>

        {/* Bell with red dot */}
        <button
          onClick={onNavigateNotifications}
          className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors ios-tap"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
      </div>

      {/* 2. Aadhaar Search Bar with QR Scanner (Screen 14) */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchAadhaar}
          onChange={(e) => setSearchAadhaar(e.target.value)}
          placeholder="Search patient by Aadhaar number"
          className="w-full pl-10 pr-10 py-3 bg-white border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#1B64DA] shadow-sm"
        />
        <button className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600">
          <QrCode className="w-4 h-4 text-[#1B64DA]" />
        </button>
      </div>

      {/* 3. Recent Patients List (Screen 14) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">
            Recent Patients
          </h3>
        </div>

        <div className="space-y-2.5">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => onSelectPatient(patient)}
              className="p-3.5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer shadow-sm ios-tap"
            >
              <div className="flex items-center gap-3">
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-100 flex-shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">
                    {patient.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Aadhaar: {patient.maskedAadhaar}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Last visit: {patient.lastVisit}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* View All Patients Button */}
        <div>
          <button
            onClick={() => onSelectPatient(filteredPatients[0])}
            className="w-full py-3 bg-[#EFF6FF] text-[#1B64DA] hover:bg-blue-100 font-bold text-xs rounded-xl transition-colors ios-tap"
          >
            View All Patients
          </button>
        </div>
      </div>

      {/* 4. Quick Actions Grid (Screen 14 Bottom) */}
      <div className="grid grid-cols-3 gap-2.5 pt-2">
        
        <button
          onClick={onNavigateProfile}
          className="p-3 bg-white border border-[#E2E8F0] rounded-2xl flex flex-col items-center text-center hover:border-slate-300 transition-colors shadow-sm ios-tap"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1B64DA] flex items-center justify-center mb-1.5">
            <User className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">My Profile</span>
        </button>

        <button
          onClick={onNavigateSettings}
          className="p-3 bg-white border border-[#E2E8F0] rounded-2xl flex flex-col items-center text-center hover:border-slate-300 transition-colors shadow-sm ios-tap"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center mb-1.5">
            <Settings className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Settings</span>
        </button>

        <button
          onClick={onNavigateHelp}
          className="p-3 bg-white border border-[#E2E8F0] rounded-2xl flex flex-col items-center text-center hover:border-slate-300 transition-colors shadow-sm ios-tap"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center mb-1.5">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Help & Support</span>
        </button>

      </div>

    </div>
  );
}
