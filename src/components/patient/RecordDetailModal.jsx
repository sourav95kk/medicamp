import React from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { 
  X, Calendar, Stethoscope, Building, Pill, FileText, 
  Clock, AlertCircle, Share2, Printer, CheckCircle, ExternalLink 
} from 'lucide-react';

export default function RecordDetailModal() {
  const { selectedRecordForDetail, setSelectedRecordForDetail } = useApp();

  if (!selectedRecordForDetail) return null;

  const record = selectedRecordForDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto transition-all max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50">
          <div>
            <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
              {record.department || 'Clinical Consultation'}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {record.diagnosis || 'Medical Consultation Record'}
            </h3>
            <p className="text-xs text-slate-500">
              {record.hospitalName} • {record.date}
            </p>
          </div>
          <button
            onClick={() => setSelectedRecordForDetail(null)}
            className="p-1.5 rounded-full hover:bg-white text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Patient & Doctor Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Patient Identity
              </span>
              <p className="text-sm font-bold text-slate-900">{record.patientName}</p>
              <div className="mt-1">
                <AadhaarBadge aadhaar={record.patientAadhaar} />
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Consultant / Attending Doctor
              </span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                <Stethoscope className="w-4 h-4 text-sky-600" />
                {record.doctorName}
              </p>
              <p className="text-xs text-slate-500">{record.doctorSpecialty}</p>
            </div>
          </div>

          {/* Symptoms & Duration */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Symptoms Reported
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800">
              <p className="font-medium">{record.symptoms || 'General wellness examination'}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                <span>Duration: <strong className="text-slate-800">{record.symptomDuration || 'N/A'}</strong></span>
                <span>•</span>
                <span>Severity: <span className={`font-bold ${
                  record.severity === 'High' ? 'text-rose-600' : record.severity === 'Moderate' ? 'text-amber-600' : 'text-emerald-600'
                }`}>{record.severity || 'Mild'}</span></span>
              </div>
            </div>
          </div>

          {/* Prescription Image */}
          {record.prescriptionImageUrl && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-600" />
                Prescription Document
              </h4>
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900/5 relative group max-h-72">
                <img
                  src={record.prescriptionImageUrl}
                  alt="Prescription Document"
                  className="w-full object-contain max-h-72 bg-white"
                />
              </div>
            </div>
          )}

          {/* Prescribed Medicines */}
          {record.medicines && record.medicines.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-emerald-600" />
                Prescribed Medicines ({record.medicines.length})
              </h4>
              <div className="space-y-2">
                {record.medicines.map((med, i) => (
                  <div key={i} className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">
                        {med.dosage || 'Prescribed'}
                      </span>
                    </div>
                    <div className="text-slate-600 flex flex-wrap items-center gap-3 pt-1">
                      <span>Freq: <strong className="text-emerald-800">{med.frequency}</strong></span>
                      <span>Timing: <strong>{med.timing}</strong></span>
                      <span>Duration: <strong>{med.duration}</strong></span>
                    </div>
                    {med.instructions && (
                      <p className="text-slate-500 italic pt-1">{med.instructions}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctor Notes & Follow-up */}
          {record.doctorNotes && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Doctor's Clinical Notes & Recommendations
              </div>
              <p className="text-slate-700">{record.doctorNotes}</p>
              {record.followUpDate && (
                <p className="text-amber-800 font-semibold pt-1">
                  Next Follow-up Review: {record.followUpDate}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-100 flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Print Record
          </button>
          <button
            type="button"
            onClick={() => setSelectedRecordForDetail(null)}
            className="px-5 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
