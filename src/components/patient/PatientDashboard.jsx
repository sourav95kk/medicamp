import React from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { 
  Plus, Calendar, Stethoscope, Building, Pill, FileText, 
  ShieldAlert, Clock, AlertTriangle, ChevronRight, Sparkles, 
  HeartPulse, Activity, UserPlus, Eye
} from 'lucide-react';

export default function PatientDashboard() {
  const {
    allMembers,
    activeMemberId,
    setActiveMemberId,
    activeMember,
    activeMemberRecords,
    setShowAddRecordModal,
    setShowAddFamilyModal,
    setShowEmergencyCardModal,
    setSelectedRecordForDetail,
    deleteMedicalRecord,
    setActiveTab
  } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      
      {/* 1. Family Members Quick Selector Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none pt-1">
        {allMembers.map((member) => {
          const isSelected = activeMemberId === member.id;
          return (
            <button
              key={member.id}
              onClick={() => setActiveMemberId(member.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl border transition-all flex-shrink-0 ios-press ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full object-cover border border-white/30"
              />
              <div className="text-left">
                <p className="text-xs font-extrabold truncate max-w-[100px]">{member.name}</p>
                <p className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {member.relation}
                </p>
              </div>
            </button>
          );
        })}

        {/* Add Family Member Pill */}
        <button
          onClick={() => setShowAddFamilyModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border-2 border-dashed border-sky-300 text-sky-700 bg-sky-50/50 hover:bg-sky-100/60 transition-all flex-shrink-0 text-xs font-bold"
        >
          <UserPlus className="w-4 h-4 text-sky-600" />
          <span>Add Member</span>
        </button>
      </div>

      {/* 2. Active Member Health Passport Summary Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={activeMember?.avatar}
              alt={activeMember?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-sky-100 shadow-sm flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeMember?.name}
                </h2>
                <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-[11px] font-extrabold rounded-full">
                  {activeMember?.relation}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeMember?.gender} • {activeMember?.age} Years • DOB: {activeMember?.dob || '1992-04-15'}
              </p>
              
              <div className="mt-2.5">
                <AadhaarBadge aadhaar={activeMember?.aadhaar} />
              </div>
            </div>
          </div>

          {/* Key Vitals & Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-600 block">Blood</span>
              <span className="text-lg font-black text-rose-700">{activeMember?.bloodGroup || 'O+'}</span>
            </div>

            <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-sky-600 block">Visits</span>
              <span className="text-lg font-black text-sky-700">{activeMemberRecords.length}</span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-600 block">Allergies</span>
              <span className="text-lg font-black text-emerald-700">
                {activeMember?.allergies?.[0] === 'None' ? 0 : activeMember?.allergies?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Chronic Conditions & Allergies Tags */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Health Notes:
          </span>
          {activeMember?.chronicConditions?.map((c, i) => (
            <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-lg">
              {c}
            </span>
          ))}
          {activeMember?.allergies?.map((a, i) => (
            <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold rounded-lg flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-600" />
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Quick Action Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Upload Prescription with OCR Magic */}
        <div
          onClick={() => setShowAddRecordModal(true)}
          className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-4 text-white shadow-md shadow-sky-600/20 cursor-pointer hover:opacity-95 transition-all ios-press flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm">Scan Prescription</h4>
              <p className="text-[11px] text-sky-100">Auto-populates medicines</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </div>

        {/* Emergency Medical ID Card */}
        <div
          onClick={() => setShowEmergencyCardModal(true)}
          className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 shadow-sm cursor-pointer hover:border-slate-300 transition-all ios-press flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm">Emergency ID</h4>
              <p className="text-[11px] text-slate-500">Blood group & allergies</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>

        {/* Daily Medication Tracker */}
        <div
          onClick={() => setActiveTab('medications')}
          className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 shadow-sm cursor-pointer hover:border-slate-300 transition-all ios-press flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm">Medications</h4>
              <p className="text-[11px] text-slate-500">Dosages & reminders</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* 4. Medical Timeline Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h3 className="text-lg font-black text-slate-900">Medical History & Visits</h3>
          <p className="text-xs text-slate-500">
            Chronological log of consultations, symptoms, and prescriptions
          </p>
        </div>
        <button
          onClick={() => setShowAddRecordModal(true)}
          className="px-3.5 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Log Visit
        </button>
      </div>

      {/* 5. Medical Records Feed */}
      {activeMemberRecords.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">No medical records logged yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Add doctor consultations, symptoms, and prescriptions for {activeMember?.name}.
            </p>
          </div>
          <button
            onClick={() => setShowAddRecordModal(true)}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            + Add First Medical Record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeMemberRecords.map((record) => (
            <div
              key={record.id}
              onClick={() => setSelectedRecordForDetail(record)}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
            >
              {/* Record Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs">
                    <Stethoscope className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      {record.doctorName}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {record.hospitalName} • {record.department || 'OPD'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {record.date}
                  </span>
                </div>
              </div>

              {/* Symptoms & Diagnosis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Symptoms & Duration
                  </span>
                  <p className="font-semibold text-slate-900">{record.symptoms || 'General checkup'}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Duration: <strong>{record.symptomDuration}</strong> • Severity:{' '}
                    <span className={`font-bold ${
                      record.severity === 'High' ? 'text-rose-600' : record.severity === 'Moderate' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {record.severity}
                    </span>
                  </p>
                </div>

                <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100">
                  <span className="text-[10px] uppercase font-bold text-sky-700 block mb-0.5">
                    Clinical Diagnosis
                  </span>
                  <p className="font-bold text-sky-950 text-sm">{record.diagnosis || 'Clinical evaluation'}</p>
                  {record.followUpDate && (
                    <p className="text-[11px] text-sky-700 mt-1">
                      Follow-up: <strong>{record.followUpDate}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Prescribed Medicines Pills */}
              {record.medicines && record.medicines.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-emerald-600" />
                    Prescribed Medications ({record.medicines.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {record.medicines.map((med, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium rounded-lg flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <strong className="font-bold">{med.name}</strong> ({med.frequency})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom footer with prescription indicator & detail button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                {record.prescriptionImageUrl ? (
                  <span className="text-indigo-600 font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    Prescription Scan Attached
                  </span>
                ) : (
                  <span className="text-slate-400">Manual Entry</span>
                )}

                <button
                  type="button"
                  className="text-sky-600 font-bold hover:text-sky-700 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Details & Rx →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
