import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Stethoscope, CheckCircle2, X } from 'lucide-react';

export default function SwitchModeModal({ isOpen, onClose, onRequireDoctorVerification }) {
  const { currentMode, switchRole, user } = useApp();

  if (!isOpen) return null;

  const handleSelectMode = (mode) => {
    if (mode === 'doctor' && !user.isDoctor) {
      onClose();
      if (onRequireDoctorVerification) onRequireDoctorVerification();
      return;
    }
    switchRole(mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F172A]">
            Switch Mode
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Options */}
        <div className="p-6 space-y-3">
          
          {/* Option 1: Patient Mode */}
          <div
            onClick={() => handleSelectMode('patient')}
            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ios-tap ${
              currentMode === 'patient'
                ? 'border-blue-200 bg-blue-50/50'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">Patient Mode</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage your and your family's records
                </p>
              </div>
            </div>

            {currentMode === 'patient' ? (
              <div className="w-5 h-5 rounded-full bg-[#1B64DA] text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
            )}
          </div>

          {/* Option 2: Doctor Mode */}
          <div
            onClick={() => handleSelectMode('doctor')}
            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ios-tap ${
              currentMode === 'doctor'
                ? 'border-blue-200 bg-blue-50/50'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1B64DA] text-white flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">Doctor Mode</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Search and view patient records
                </p>
              </div>
            </div>

            {currentMode === 'doctor' ? (
              <div className="w-5 h-5 rounded-full bg-[#1B64DA] text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
