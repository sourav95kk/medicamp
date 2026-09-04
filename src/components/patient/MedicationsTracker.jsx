import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, CheckCircle2, Clock, Sun, Sunset, Moon, Sparkles, ChevronRight } from 'lucide-react';

export default function MedicationsTracker() {
  const { activeMember, activeMemberRecords, setShowAddRecordModal } = useApp();
  const [takenMap, setTakenMap] = useState({});

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
      return { label: 'Morning', icon: Sun, color: 'text-amber-500 bg-amber-50' };
    }
    if (combined.includes('afternoon') || combined.includes('lunch') || combined.includes('0-1-0') || combined.includes('tds')) {
      return { label: 'Afternoon', icon: Sunset, color: 'text-orange-500 bg-orange-50' };
    }
    return { label: 'Bedtime', icon: Moon, color: 'text-indigo-500 bg-indigo-50' };
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12 max-w-xl mx-auto">
      
      {/* Overview Progress Card (Apple Health Style) */}
      <div className="ios-grouped-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">Daily Schedule</span>
            <h3 className="text-xl font-bold text-[#000000]">Today's Medications</h3>
          </div>
          <button
            onClick={() => setShowAddRecordModal(true)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm ios-tap flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan Rx</span>
          </button>
        </div>

        <div className="w-full bg-[#E5E5EA] rounded-full h-2 overflow-hidden">
          <div 
            className="bg-teal-500 h-full transition-all duration-300 rounded-full"
            style={{ 
              width: allMedications.length > 0 
                ? `${(Object.values(takenMap).filter(Boolean).length / allMedications.length) * 100}%` 
                : '0%' 
            }}
          />
        </div>

        <p className="text-xs text-[#8E8E93]">
          {Object.values(takenMap).filter(Boolean).length} of {allMedications.length} doses logged for {activeMember?.name}
        </p>
      </div>

      {/* Medications List */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8E8E93] px-1">
          Active Doses
        </h2>

        {allMedications.length === 0 ? (
          <div className="ios-grouped-card p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">No active medications</p>
              <p className="text-xs text-[#8E8E93] mt-0.5">Upload a prescription to auto-populate daily doses</p>
            </div>
            <button
              onClick={() => setShowAddRecordModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              + Add Prescription
            </button>
          </div>
        ) : (
          <div className="ios-grouped-card overflow-hidden divide-y divide-black/[0.06]">
            {allMedications.map((med) => {
              const timeCat = getTimeCategory(med.timing, med.frequency);
              const TimeIcon = timeCat.icon;
              const isTaken = !!takenMap[med.id];

              return (
                <div
                  key={med.id}
                  onClick={() => toggleMedication(med.id)}
                  className="p-4 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer transition-colors ios-tap"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${timeCat.color}`}>
                      <TimeIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${isTaken ? 'line-through text-[#8E8E93]' : 'text-[#000000]'}`}>
                        {med.name}
                      </p>
                      <p className="text-xs text-[#8E8E93] truncate mt-0.5">
                        {med.dosage || '1 Tab'} • {med.frequency} • {med.timing}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMedication(med.id);
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ml-3 ${
                      isTaken
                        ? 'bg-[#34C759] text-white shadow-sm'
                        : 'border-2 border-[#C7C7CC] text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
