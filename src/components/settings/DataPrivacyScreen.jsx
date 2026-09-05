import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Lock, Trash2 } from 'lucide-react';

export default function DataPrivacyScreen({ onBack }) {
  const [shareRecords, setShareRecords] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 20) */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#0F172A]">
          Data & Privacy
        </h1>
      </div>

      {/* Grouped Privacy Options */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl divide-y divide-[#F1F5F9] shadow-sm overflow-hidden text-xs">
        
        {/* How your data is used */}
        <div 
          onClick={() => alert('Your data is end-to-end encrypted and used only for your health tracking and doctor consultations.')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <span className="font-bold text-[#0F172A]">How your data is used</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Data Security */}
        <div 
          onClick={() => alert('All medical records and Aadhaar IDs are protected with 256-bit encryption and strict Row Level Security (RLS).')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
        >
          <span className="font-bold text-[#0F172A]">Data Security</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Share My Records Toggle */}
        <div className="p-4 flex items-center justify-between">
          <div className="pr-4">
            <h4 className="font-bold text-[#0F172A]">Share My Records</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Allow doctors to view your records using Aadhaar
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShareRecords(!shareRecords)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors flex-shrink-0 ${
              shareRecords ? 'bg-[#1B64DA]' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              shareRecords ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Delete Account */}
        <div 
          onClick={() => {
            if (confirm('Are you sure you want to permanently delete your account and all associated health records?')) {
              alert('Account deletion request registered.');
            }
          }}
          className="p-4 flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 cursor-pointer transition-colors ios-tap"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Account</span>
        </div>

      </div>

    </div>
  );
}
