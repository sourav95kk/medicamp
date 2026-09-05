import React, { useState } from 'react';
import { formatAadhaar, cleanAadhaar } from '../../utils/aadhaarUtils';
import { ChevronLeft, ShieldCheck, Lock } from 'lucide-react';

export default function LinkAadhaarScreen({ onBack, onVerifyAadhaar }) {
  const [aadhaar, setAadhaar] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    const clean = cleanAadhaar(aadhaar);
    if (clean.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    onVerifyAadhaar(clean);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-8 max-w-md mx-auto animate-fade-in select-none">
      
      {/* Top Header */}
      <div className="space-y-6 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Link Your Aadhaar
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            This helps keep your health records secure and uniquely linked to you.
          </p>
        </div>

        {/* Aadhaar Graphic Illustration */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shadow-inner relative">
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              {/* Stylized Aadhaar Emblem */}
              <circle cx="50" cy="50" r="18" fill="#E11D48" />
              <path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <path d="M25 25 L32 32 M68 68 L75 75 M25 75 L32 68 M68 32 L75 25" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              <path d="M42 45 Q50 35 58 45 Q62 55 50 62 Q38 55 42 45" fill="#FBBF24" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
            Aadhaar Health Link
          </span>
        </div>

        {/* Aadhaar Input Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Enter 12 digit Aadhaar Number
            </label>
            <input
              type="text"
              required
              maxLength={14}
              value={aadhaar}
              onChange={(e) => {
                setError('');
                setAadhaar(formatAadhaar(e.target.value));
              }}
              placeholder="0000 0000 0000"
              className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center text-base font-mono font-bold tracking-widest text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all ios-tap"
          >
            Verify Aadhaar
          </button>
        </form>
      </div>

      {/* Security Note Footer */}
      <div className="pt-6 pb-2 text-center flex items-center justify-center gap-1.5 text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <p className="text-[11px] font-medium">
          Your information is encrypted and secure
        </p>
      </div>

    </div>
  );
}
