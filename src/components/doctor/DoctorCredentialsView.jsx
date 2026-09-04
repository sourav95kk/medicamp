import React from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { Stethoscope, ShieldCheck, Award, Building, User, Calendar, Edit3 } from 'lucide-react';

export default function DoctorCredentialsView() {
  const { user, setShowDoctorRegisterModal } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-emerald-800/15">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-emerald-100 flex items-center gap-1.5 w-max mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Medical License Verification
        </span>
        <h2 className="text-2xl font-black tracking-tight">Practitioner Credentials</h2>
        <p className="text-xs text-emerald-100 mt-1 max-w-md">
          Official registration and compliance details linked to your MediCamp doctor portal profile.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Dr. {user.name}</h3>
              <p className="text-xs text-slate-500 font-semibold">{user.doctorDetails?.degrees || 'MBBS, MD'}</p>
              <div className="mt-2">
                <AadhaarBadge aadhaar={user.aadhaar} />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowDoctorRegisterModal(true)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Edit3 className="w-4 h-4" />
            Edit Credentials
          </button>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Medical Registration Number
            </span>
            <p className="text-base font-black text-slate-900 font-mono">
              {user.doctorDetails?.regNumber || 'MCI-2018-89412'}
            </p>
            <p className="text-xs text-slate-500">{user.doctorDetails?.council || 'National Medical Commission'}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-sky-600" /> Specialty & Department
            </span>
            <p className="text-base font-black text-slate-900">
              {user.doctorDetails?.specialty || 'Internal Medicine'}
            </p>
            <p className="text-xs text-slate-500">Experience: {user.doctorDetails?.experienceYears || 10}+ Years</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl space-y-1 sm:col-span-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-indigo-600" /> Primary Hospital Affiliation
            </span>
            <p className="text-base font-black text-slate-900">
              {user.doctorDetails?.hospital || 'Max Super Speciality Hospital'}
            </p>
            <p className="text-xs text-slate-500">Authorized OPD & IPD Consultations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
