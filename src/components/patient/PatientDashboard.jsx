import React from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { 
  Plus, Calendar, Stethoscope, Building, Pill, FileText, 
  ShieldAlert, Clock, AlertTriangle, ChevronRight, Sparkles, 
  Heart, Activity, UserPlus, Eye, ShieldCheck, Flame, Droplet
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
    setActiveTab
  } = useApp();

  return (
    <div className="space-y-5 animate-fade-in pb-12 max-w-xl mx-auto">
      
      {/* 1. Family Members Quick Profile Switcher (iOS Segmented Avatar Strip) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {allMembers.map((member) => {
          const isSelected = activeMemberId === member.id;
          return (
            <button
              key={member.id}
              onClick={() => setActiveMemberId(member.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ios-tap ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-[#1C1C1E] border border-black/5 hover:bg-slate-100'
              }`}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-5 h-5 rounded-full object-cover border border-white/40"
              />
              <span className="truncate max-w-[80px]">{member.name}</span>
            </button>
          );
        })}

        <button
          onClick={() => setShowAddFamilyModal(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white text-blue-600 border border-blue-200 text-xs font-bold flex-shrink-0 ios-tap"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

      {/* 2. Apple Health Style Highlights (2x2 Widget Grid) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8E8E93]">
            Health Highlights
          </h2>
          <span className="text-xs text-blue-600 font-semibold">
            {activeMember?.relation || 'Self'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          
          {/* Widget 1: Active Medications */}
          <div 
            onClick={() => setActiveTab('medications')}
            className="ios-grouped-card p-4 flex flex-col justify-between cursor-pointer ios-tap hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm">
                <Pill className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-[#8E8E93] uppercase">Medications</span>
              <p className="text-xl font-bold text-[#000000]">
                {activeMemberRecords.reduce((acc, r) => acc + (r.medicines?.length || 0), 0)} Active
              </p>
              <p className="text-[11px] text-[#34C759] font-medium mt-0.5">Dosage On Track</p>
            </div>
          </div>

          {/* Widget 2: Blood Type & Allergies */}
          <div 
            onClick={() => setShowEmergencyCardModal(true)}
            className="ios-grouped-card p-4 flex flex-col justify-between cursor-pointer ios-tap hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#FF3B30] text-white flex items-center justify-center shadow-sm">
                <Droplet className="w-4 h-4 fill-white" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-[#8E8E93] uppercase">Blood Type</span>
              <p className="text-xl font-bold text-[#000000]">
                {activeMember?.bloodGroup || 'O+'}
              </p>
              <p className="text-[11px] text-[#FF9500] font-medium mt-0.5">
                {activeMember?.allergies?.[0] === 'None' ? 'No Allergies' : `${activeMember?.allergies?.length || 0} Allergies`}
              </p>
            </div>
          </div>

          {/* Widget 3: Emergency Medical ID */}
          <div 
            onClick={() => setShowEmergencyCardModal(true)}
            className="ios-grouped-card p-4 flex flex-col justify-between cursor-pointer ios-tap hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-sm">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-[#8E8E93] uppercase">Medical ID</span>
              <p className="text-sm font-bold text-[#000000] truncate">
                {activeMember?.name}
              </p>
              <p className="text-[11px] text-[#8E8E93] mt-0.5">Emergency Card</p>
            </div>
          </div>

          {/* Widget 4: Aadhaar Identity */}
          <div 
            onClick={() => setShowEmergencyCardModal(true)}
            className="ios-grouped-card p-4 flex flex-col justify-between cursor-pointer ios-tap hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">VERIFIED</span>
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-[#8E8E93] uppercase">Aadhaar Link</span>
              <p className="font-mono text-xs font-bold text-[#000000] tracking-tight truncate">
                •••• {activeMember?.aadhaar?.slice(-4)}
              </p>
              <p className="text-[11px] text-blue-600 mt-0.5">Unified Vault</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Prescription OCR Auto-populate Action Banner (iOS Health Promo Card) */}
      <div 
        onClick={() => setShowAddRecordModal(true)}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between cursor-pointer ios-tap"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Scan Prescription (Smart OCR)</h3>
            <p className="text-xs text-blue-100">Upload photo to auto-populate medicines</p>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <Plus className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* 4. Recent Health Records (iOS Inset Grouped List) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8E8E93]">
            Recent Records ({activeMemberRecords.length})
          </h2>
          <button
            onClick={() => setActiveTab('records')}
            className="text-xs text-blue-600 font-semibold"
          >
            See All
          </button>
        </div>

        {activeMemberRecords.length === 0 ? (
          <div className="ios-grouped-card p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">No medical visits logged yet</p>
              <p className="text-xs text-[#8E8E93] mt-0.5">Tap below to add your first doctor consultation</p>
            </div>
            <button
              onClick={() => setShowAddRecordModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              + Log Visit
            </button>
          </div>
        ) : (
          <div className="ios-grouped-card overflow-hidden divide-y divide-black/[0.06]">
            {activeMemberRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => setSelectedRecordForDetail(record)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer transition-colors ios-tap"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#000000] truncate">
                        {record.diagnosis || 'Medical Consultation'}
                      </p>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        record.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {record.severity || 'Mild'}
                      </span>
                    </div>
                    <p className="text-xs text-[#8E8E93] truncate mt-0.5">
                      {record.doctorName} • {record.hospitalName}
                    </p>
                    {record.medicines && record.medicines.length > 0 && (
                      <p className="text-[11px] text-teal-600 font-medium mt-0.5 flex items-center gap-1">
                        <Pill className="w-3 h-3" />
                        {record.medicines.length} Medicines Prescribed
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <span className="text-xs text-[#8E8E93] font-medium">{record.date}</span>
                  <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
