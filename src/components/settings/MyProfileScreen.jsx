import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft } from 'lucide-react';

export default function MyProfileScreen({ onBack, onEdit }) {
  const { user } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 18) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-[#0F172A]">
            My Profile
          </h1>
        </div>

        <button
          onClick={onEdit}
          className="text-xs font-bold text-[#1B64DA] hover:underline"
        >
          Edit
        </button>
      </div>

      {/* Profile Card with Large Avatar */}
      <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold text-2xl shadow-sm flex-shrink-0">
          {user?.avatarInitial || user?.name?.[0] || 'S'}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0F172A]">
            {user?.name || 'Sourav Kumar'}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Aadhaar: {user?.maskedAadhaar || '**** 1234'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {user?.email || 'sourav@example.com'}
          </p>
          <p className="text-xs text-slate-400">
            {user?.phone || '+91 98765 43210'}
          </p>
        </div>
      </div>

      {/* Personal Details Section (Screen 18) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Personal Details
        </h4>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl divide-y divide-[#F1F5F9] shadow-sm overflow-hidden text-xs">
          <div className="p-3.5 flex justify-between">
            <span className="text-slate-400 font-medium">Date of Birth</span>
            <span className="font-bold text-[#0F172A]">14 Mar 1993</span>
          </div>

          <div className="p-3.5 flex justify-between">
            <span className="text-slate-400 font-medium">Gender</span>
            <span className="font-bold text-[#0F172A]">Male</span>
          </div>

          <div className="p-3.5 flex justify-between">
            <span className="text-slate-400 font-medium">Blood Group</span>
            <span className="font-bold text-[#0F172A]">O+</span>
          </div>

          <div className="p-3.5 flex justify-between">
            <span className="text-slate-400 font-medium">Address</span>
            <span className="font-bold text-[#0F172A]">Bengaluru, Karnataka</span>
          </div>
        </div>
      </div>

    </div>
  );
}
