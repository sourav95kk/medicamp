import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SlidersHorizontal, FileText, ChevronRight, Stethoscope } from 'lucide-react';

export default function MedicalHistoryScreen({ onSelectRecord }) {
  const { records, user } = useApp();
  const [filter, setFilter] = useState('my'); // 'all' | 'my' | 'family'

  const filteredRecords = records.filter(r => {
    if (filter === 'my') return r.isSelf !== false && r.patientAadhaar === user?.aadhaar;
    if (filter === 'family') return r.isSelf === false || r.patientAadhaar !== user?.aadhaar;
    return true; // 'all'
  });

  return (
    <div className="space-y-5 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 13) */}
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-xl font-bold text-[#0F172A]">
          Medical History
        </h1>
        <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Segmented Filter Control [ All | My Records | Family ] */}
      <div className="bg-[#F1F5F9] p-1 rounded-xl flex gap-1">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ios-tap ${
            filter === 'all'
              ? 'bg-[#1B64DA] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('my')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ios-tap ${
            filter === 'my'
              ? 'bg-[#1B64DA] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          My Records
        </button>
        <button
          type="button"
          onClick={() => setFilter('family')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ios-tap ${
            filter === 'family'
              ? 'bg-[#1B64DA] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Family
        </button>
      </div>

      {/* Timeline Cards (Screen 13) */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-2xl space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-600">No medical records found</p>
          </div>
        ) : (
          filteredRecords.map((rec) => (
            <div
              key={rec.id}
              onClick={() => onSelectRecord(rec)}
              className="p-4 bg-white border border-[#E2E8F0] rounded-2xl hover:border-slate-300 transition-colors cursor-pointer shadow-sm ios-tap space-y-3"
            >
              {/* Top Row: Date & Arrow */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  {rec.date}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Center Info: Doctor & Hospital */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1B64DA] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      {rec.doctorName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {rec.hospitalName}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {rec.symptoms}
                    </p>
                  </div>
                </div>

                {/* Medicine Count Badge (Teal) */}
                <div className="flex-shrink-0">
                  <span className="px-2.5 py-1 bg-[#E6FFFA] text-[#0D9488] text-[11px] font-bold rounded-lg border border-[#99F6E4]/50">
                    {rec.medicines?.length || rec.medicinesCount || 1} meds
                  </span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
