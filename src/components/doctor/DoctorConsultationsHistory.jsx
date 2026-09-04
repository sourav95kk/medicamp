import React from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { Clock, Stethoscope, Building, Pill, Eye, FileText } from 'lucide-react';

export default function DoctorConsultationsHistory() {
  const { records, setSelectedRecordForDetail, user } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-emerald-800/15">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-emerald-100 flex items-center gap-1.5 w-max mb-2">
          <Clock className="w-3.5 h-3.5" /> Clinical Consultation Logs
        </span>
        <h2 className="text-2xl font-black tracking-tight">Recent Clinical Prescriptions</h2>
        <p className="text-xs text-emerald-100 mt-1 max-w-md">
          History of all diagnoses, tests, and prescriptions logged during patient consultations.
        </p>
      </div>

      <div className="space-y-4">
        {records.map((rec) => (
          <div
            key={rec.id}
            onClick={() => setSelectedRecordForDetail(rec)}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-base">{rec.patientName}</h4>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                    EHR Record
                  </span>
                </div>
                <div className="mt-1">
                  <AadhaarBadge aadhaar={rec.patientAadhaar} />
                </div>
              </div>

              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg self-start sm:self-center">
                {rec.date}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Attending Doctor</span>
                <p className="font-bold text-slate-800">{rec.doctorName}</p>
                <p className="text-[10px] text-slate-500">{rec.hospitalName}</p>
              </div>

              <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Diagnosis</span>
                <p className="font-bold text-emerald-950">{rec.diagnosis}</p>
              </div>
            </div>

            {rec.medicines && rec.medicines.length > 0 && (
              <div className="pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Prescribed ({rec.medicines.length} Medicines):
                </span>
                <div className="flex flex-wrap gap-1">
                  {rec.medicines.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium rounded-md">
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
