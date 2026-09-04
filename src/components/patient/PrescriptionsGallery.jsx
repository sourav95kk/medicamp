import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Calendar, Stethoscope, Building, Pill, Eye, Sparkles } from 'lucide-react';

export default function PrescriptionsGallery() {
  const { activeMember, activeMemberRecords, setSelectedRecordForDetail, setShowAddRecordModal } = useApp();

  const recordsWithPrescriptions = activeMemberRecords.filter(r => r.prescriptionImageUrl || (r.medicines && r.medicines.length > 0));

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-indigo-100 flex items-center gap-1.5 w-max mb-2">
            <FileText className="w-3.5 h-3.5" /> Digital Prescription Vault
          </span>
          <h2 className="text-2xl font-black tracking-tight">Prescriptions Archive</h2>
          <p className="text-xs text-indigo-100 mt-1 max-w-md">
            Scanned Rx documents, handwritten notes, and auto-populated medicine logs for {activeMember?.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddRecordModal(true)}
          className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-xs rounded-2xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2 flex-shrink-0 ios-press"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          Scan New Rx
        </button>
      </div>

      {recordsWithPrescriptions.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4">
          <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">No Prescriptions Uploaded</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Upload prescription photos to keep permanent digital records with automatic medicine extraction.
            </p>
          </div>
          <button
            onClick={() => setShowAddRecordModal(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md"
          >
            + Scan & Upload Prescription
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recordsWithPrescriptions.map((rec) => (
            <div
              key={rec.id}
              onClick={() => setSelectedRecordForDetail(rec)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Prescription Image Preview Header */}
                {rec.prescriptionImageUrl ? (
                  <div className="h-44 bg-slate-900/5 relative overflow-hidden group">
                    <img
                      src={rec.prescriptionImageUrl}
                      alt="Prescription Scan"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <span className="text-white text-xs font-bold flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-sky-400" />
                        Prescription Scan Attached
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-28 bg-gradient-to-br from-indigo-50 to-sky-50 flex items-center justify-center border-b border-indigo-100/50">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-indigo-400 mx-auto mb-1" />
                      <span className="text-xs font-bold text-indigo-900">Digital Consultation Record</span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {rec.diagnosis || 'Clinical Consultation'}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                        {rec.doctorName} • {rec.hospitalName}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex-shrink-0">
                      {rec.date}
                    </span>
                  </div>

                  {/* Medicines Summary Pills */}
                  {rec.medicines && rec.medicines.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Prescribed ({rec.medicines.length} Medicines):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {rec.medicines.map((m, i) => (
                          <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-medium rounded-md">
                            {m.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{rec.department || 'OPD'}</span>
                <span className="font-bold text-indigo-600 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> View Full Prescription →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
