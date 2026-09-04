import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, CheckCircle2, Clock, Sun, Sunset, Moon, Calendar, AlertCircle, Sparkles } from 'lucide-react';

export default function MedicationsTracker() {
  const { activeMember, activeMemberRecords, setShowAddRecordModal } = useApp();
  
  // Track taken status for today (local state simulation)
  const [takenMap, setTakenMap] = useState({});

  // Collect all medicines from active records
  const allMedications = [];
  activeMemberRecords.forEach(record => {
    if (record.medicines && Array.isArray(record.medicines)) {
      record.medicines.forEach((med, idx) => {
        allMedications.push({
          id: `${record.id}_${idx}`,
          ...med,
          prescribedBy: record.doctorName,
          hospital: record.hospitalName,
          prescribedDate: record.date
        });
      });
    }
  });

  const toggleMedication = (id) => {
    setTakenMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getTimeCategory = (timing, freq) => {
    const combined = `${timing} ${freq}`.toLowerCase();
    if (combined.includes('morning') || combined.includes('breakfast') || combined.includes('1-0-0') || combined.includes('empty stomach')) {
      return { label: 'Morning Dose', icon: Sun, color: 'text-amber-500 bg-amber-50 border-amber-200' };
    }
    if (combined.includes('afternoon') || combined.includes('lunch') || combined.includes('0-1-0') || combined.includes('tds')) {
      return { label: 'Afternoon Dose', icon: Sunset, color: 'text-orange-500 bg-orange-50 border-orange-200' };
    }
    return { label: 'Night / Bedtime Dose', icon: Moon, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' };
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-600/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-emerald-100 flex items-center gap-1.5 w-max mb-2">
            <Pill className="w-3.5 h-3.5" /> Daily Dosage Hub
          </span>
          <h2 className="text-2xl font-black tracking-tight">Active Medications</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Showing auto-extracted & logged medicines for <strong className="text-white">{activeMember?.name}</strong>.
          </p>
        </div>

        <button
          onClick={() => setShowAddRecordModal(true)}
          className="px-5 py-2.5 bg-white text-emerald-700 font-bold text-xs rounded-2xl shadow-lg hover:bg-emerald-50 transition-all flex items-center gap-2 flex-shrink-0 ios-press"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Scan New Prescription
        </button>
      </div>

      {allMedications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Pill className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No active medications logged</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Upload a doctor prescription or log a visit to auto-populate medicine schedules.
            </p>
          </div>
          <button
            onClick={() => setShowAddRecordModal(true)}
            className="px-5 py-2 bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 transition-all"
          >
            + Add Record / Upload Rx
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Today's Schedule & Adherence</h3>
            <span className="text-xs text-slate-500 font-medium">
              {Object.values(takenMap).filter(Boolean).length} of {allMedications.length} taken today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allMedications.map((med) => {
              const timeCat = getTimeCategory(med.timing, med.frequency);
              const TimeIcon = timeCat.icon;
              const isTaken = !!takenMap[med.id];

              return (
                <div
                  key={med.id}
                  onClick={() => toggleMedication(med.id)}
                  className={`bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer shadow-sm relative ${
                    isTaken
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl border ${timeCat.color}`}>
                        <TimeIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-slate-900 text-base">
                            {med.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Dosage: <strong className="text-slate-800">{med.dosage || 'Standard'}</strong> • Freq: <span className="font-semibold text-sky-700">{med.frequency}</span>
                        </p>
                      </div>
                    </div>

                    {/* Checkbox button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMedication(med.id);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isTaken
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'border-2 border-slate-300 hover:border-slate-400 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Timing & Instructions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{med.timing || 'As directed'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Course: {med.duration || 'Ongoing'}</span>
                    </div>
                  </div>

                  {med.instructions && (
                    <div className="mt-2.5 p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600 flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{med.instructions}</span>
                    </div>
                  )}

                  <div className="mt-2 text-[10px] text-slate-400">
                    Prescribed by {med.prescribedBy} ({med.hospital}) on {med.prescribedDate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
