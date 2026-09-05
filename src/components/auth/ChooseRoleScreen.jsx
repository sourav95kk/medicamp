import React, { useState } from 'react';
import { User, Stethoscope, CheckCircle2, ChevronLeft } from 'lucide-react';

export default function ChooseRoleScreen({ onBack, onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState('patient'); // 'patient' | 'doctor'

  const handleContinue = () => {
    onSelectRole(selectedRole);
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
            Choose How You Want to Use the App
          </h1>
        </div>

        {/* 2 Large Selection Cards */}
        <div className="space-y-4 pt-2">
          
          {/* Patient Card */}
          <div
            onClick={() => setSelectedRole('patient')}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative flex flex-col items-center text-center ios-tap ${
              selectedRole === 'patient'
                ? 'border-[#1B64DA] bg-blue-50/40 shadow-sm'
                : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
            }`}
          >
            {selectedRole === 'patient' && (
              <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#1B64DA] text-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            )}

            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
              selectedRole === 'patient' ? 'bg-blue-100 text-[#1B64DA]' : 'bg-slate-100 text-slate-500'
            }`}>
              <User className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-[#0F172A]">
              As a Patient
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              Manage your and your family's health records
            </p>
          </div>

          {/* Doctor Card */}
          <div
            onClick={() => setSelectedRole('doctor')}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative flex flex-col items-center text-center ios-tap ${
              selectedRole === 'doctor'
                ? 'border-[#1B64DA] bg-blue-50/40 shadow-sm'
                : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
            }`}
          >
            {selectedRole === 'doctor' && (
              <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#1B64DA] text-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            )}

            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
              selectedRole === 'doctor' ? 'bg-blue-100 text-[#1B64DA]' : 'bg-slate-100 text-slate-500'
            }`}>
              <Stethoscope className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-[#0F172A]">
              As a Doctor
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              Access patient records (for verified doctors only)
            </p>
          </div>

        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-6">
        <button
          onClick={handleContinue}
          className="w-full py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all ios-tap"
        >
          Continue
        </button>
      </div>

    </div>
  );
}
