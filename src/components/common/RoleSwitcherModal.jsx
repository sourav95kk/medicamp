import React from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, User, ShieldCheck, Lock, CheckCircle2, ChevronRight, X, AlertCircle } from 'lucide-react';

export default function RoleSwitcherModal() {
  const {
    user,
    currentMode,
    switchRole,
    showRoleSwitcherModal,
    setShowRoleSwitcherModal,
    setShowDoctorRegisterModal
  } = useApp();

  if (!showRoleSwitcherModal) return null;

  const handleSelectRole = (mode) => {
    if (mode === 'doctor' && !user.isDoctor) {
      setShowRoleSwitcherModal(false);
      setShowDoctorRegisterModal(true);
      return;
    }
    switchRole(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all transform animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag handle for mobile */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Switch Workspace Mode</h3>
            <p className="text-xs text-slate-500">Choose how you want to use MediCamp</p>
          </div>
          <button
            onClick={() => setShowRoleSwitcherModal(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-6 space-y-4">
          {/* Patient Mode Option */}
          <div
            onClick={() => handleSelectRole('patient')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${
              currentMode === 'patient'
                ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                currentMode === 'patient' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-700'
              }`}>
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-base">Patient / Family Mode</span>
                  {currentMode === 'patient' && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage medical history, family Aadhaar profiles, and log prescriptions.
                </p>
              </div>
            </div>
            {currentMode === 'patient' ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
            )}
          </div>

          {/* Doctor Mode Option */}
          <div
            onClick={() => handleSelectRole('doctor')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${
              currentMode === 'doctor'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                currentMode === 'doctor'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : user.isDoctor
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-base">Doctor Mode</span>
                  {user.isDoctor ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Registration Needed
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {user.isDoctor
                    ? `Registered: ${user.doctorDetails?.regNumber || 'MCI Verified'}`
                    : 'Search patient records by Aadhaar and prescribe digital Rx.'}
                </p>
              </div>
            </div>
            {currentMode === 'doctor' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : user.isDoctor ? (
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
            ) : (
              <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
            )}
          </div>

          {!user.isDoctor && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <p className="font-semibold">Doctor verification required</p>
                <p className="text-amber-700 mt-0.5">
                  Doctor mode is restricted to registered medical practitioners to protect patient health data.
                </p>
                <button
                  onClick={() => {
                    setShowRoleSwitcherModal(false);
                    setShowDoctorRegisterModal(true);
                  }}
                  className="mt-2 text-xs font-bold text-amber-900 underline hover:text-amber-950"
                >
                  Register as Doctor now →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setShowRoleSwitcherModal(false)}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
