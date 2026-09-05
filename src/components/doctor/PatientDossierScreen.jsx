import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Stethoscope, Droplet, Calendar, FileText, Pill, Plus } from 'lucide-react';

export default function PatientDossierScreen({ patient, onBack, onAddConsultation }) {
  const { records } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'history' | 'reports'

  if (!patient) return null;

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 15) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-[#0F172A]">
            Patient Record
          </h1>
        </div>

        <button
          onClick={onAddConsultation}
          className="text-xs font-bold text-[#1B64DA] hover:underline"
        >
          Edit
        </button>
      </div>

      {/* Patient Header Card */}
      <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center gap-3.5 shadow-sm">
        <img
          src={patient.avatar}
          alt={patient.name}
          className="w-14 h-14 rounded-full object-cover border border-slate-100 flex-shrink-0"
        />
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">
            {patient.name}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Aadhaar: {patient.maskedAadhaar || '**** 1234'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {patient.gender || 'Male'} • {patient.age || 32} yrs
          </p>
        </div>
      </div>

      {/* Segmented Control [ Overview | History | Reports ] */}
      <div className="bg-[#F1F5F9] p-1 rounded-xl flex gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ios-tap ${
            activeTab === 'overview'
              ? 'bg-[#1B64DA] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ios-tap ${
            activeTab === 'history'
              ? 'bg-[#1B64DA] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          History
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ios-tap ${
            activeTab === 'reports'
              ? 'bg-[#1B64DA] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Reports
        </button>
      </div>

      {/* Basic Information Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Basic Information
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Birth</span>
            <span className="text-xs font-bold text-[#0F172A] mt-1 block">
              {patient.dob || '14 Mar 1993'}
            </span>
          </div>

          <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Blood Group</span>
            <span className="text-xs font-bold text-[#0F172A] mt-1 block">
              {patient.bloodGroup || 'O+'}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Medical Consultations */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Consultation History
        </h4>

        <div className="space-y-2">
          {records.slice(0, 2).map((rec) => (
            <div key={rec.id} className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-900">
                <span>{rec.diagnosis}</span>
                <span className="text-slate-400 font-normal">{rec.date}</span>
              </div>
              <p className="text-[11px] text-slate-500">{rec.doctorName} • {rec.hospitalName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prescribe / Write Rx Button */}
      <div>
        <button
          onClick={onAddConsultation}
          className="w-full py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 ios-tap"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Write Digital Prescription</span>
        </button>
      </div>

    </div>
  );
}
