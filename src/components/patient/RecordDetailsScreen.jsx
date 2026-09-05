import React from 'react';
import { ChevronLeft, Stethoscope, Building, Pill, FileText, Calendar, Edit2 } from 'lucide-react';

export default function RecordDetailsScreen({ record, onBack, onEdit }) {
  if (!record) return null;

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 16) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-[#0F172A]">
            Record Details
          </h1>
        </div>

        <button
          onClick={onEdit}
          className="text-xs font-bold text-[#1B64DA] hover:underline"
        >
          Edit
        </button>
      </div>

      {/* Date Header Tag */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
        <Calendar className="w-4 h-4" />
        <span>{record.date}</span>
      </div>

      {/* Doctor & Hospital Card */}
      <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl space-y-1 shadow-sm">
        <h3 className="text-base font-bold text-[#0F172A]">
          {record.doctorName}
        </h3>
        <p className="text-xs text-slate-500">
          {record.doctorSpecialty || 'General Physician'}
        </p>
        <p className="text-xs text-slate-400">
          {record.hospitalName}
        </p>
      </div>

      {/* Symptoms Card */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Symptoms
        </h4>
        <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-slate-700">
          {record.symptoms || 'General wellness checkup'}
        </div>
      </div>

      {/* Diagnosis Card */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Diagnosis
        </h4>
        <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#1B64DA]">
          {record.diagnosis || 'Viral Fever'}
        </div>
      </div>

      {/* Prescribed Medicines List */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Medicines ({record.medicines?.length || 3})
        </h4>

        <div className="space-y-2">
          {record.medicines && record.medicines.length > 0 ? (
            record.medicines.map((med, i) => (
              <div
                key={i}
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-[#0F172A]">
                    {med.name}
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {med.dosage}, {med.frequency}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl">
                <h5 className="text-xs font-bold text-[#0F172A]">Paracetamol 500 mg</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">1 tablet, Twice daily</p>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl">
                <h5 className="text-xs font-bold text-[#0F172A]">Azithromycin 500 mg</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">1 tablet, Once daily</p>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl">
                <h5 className="text-xs font-bold text-[#0F172A]">Cetirizine 10 mg</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">1 tablet, At night</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Prescription Attachment Scan Preview */}
      {record.prescriptionImageUrl && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Prescription Scan
          </h4>
          <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <img
              src={record.prescriptionImageUrl}
              alt="Prescription Scan"
              className="w-full object-cover max-h-48"
            />
          </div>
        </div>
      )}

    </div>
  );
}
