import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { formatAadhaar, cleanAadhaar } from '../../utils/aadhaarUtils';
import { 
  Stethoscope, Search, ShieldCheck, UserCheck, AlertTriangle, 
  Calendar, Building, Pill, FileText, Plus, CheckCircle, 
  Clock, HeartPulse, User, ChevronRight, X, Sparkles, Droplet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DoctorPortal() {
  const { 
    user, 
    searchPatientByAadhaar, 
    addDoctorConsultation, 
    allMembers,
    records,
    setSelectedRecordForDetail 
  } = useApp();

  const [searchAadhaar, setSearchAadhaar] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(allMembers[1] || allMembers[0]);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New Consultation Form State
  const [consultForm, setConsultForm] = useState({
    diagnosis: '',
    department: user.doctorDetails?.specialty || 'General Medicine',
    symptoms: '',
    symptomDuration: '3 days',
    severity: 'Moderate',
    doctorNotes: '',
    followUpDate: '',
    medicines: [
      {
        name: '',
        dosage: '1 Tab',
        frequency: '1-0-1 (Twice daily)',
        timing: 'After meals',
        duration: '5 days',
        instructions: ''
      }
    ]
  });

  // Filter patient list based on search bar (by name or Aadhaar)
  const filteredPatients = allMembers.filter(m => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().replace(/\s/g, '');
    const nameMatch = m.name.toLowerCase().includes(q);
    const aadhaarMatch = m.aadhaar.includes(q);
    return nameMatch || aadhaarMatch;
  });

  // Active patient's records
  const patientRecords = records.filter(
    r => cleanAadhaar(r.patientAadhaar) === cleanAadhaar(selectedPatient?.aadhaar)
  );

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchAadhaar(formatAadhaar(patient.aadhaar));
  };

  // Add medicine row
  const handleAddMedRow = () => {
    setConsultForm(prev => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        {
          name: '',
          dosage: '1 Tab',
          frequency: '1-0-1 (Twice daily)',
          timing: 'After meals',
          duration: '5 days',
          instructions: ''
        }
      ]
    }));
  };

  const handleUpdateMed = (index, field, value) => {
    setConsultForm(prev => {
      const meds = [...prev.medicines];
      meds[index] = { ...meds[index], [field]: value };
      return { ...prev, medicines: meds };
    });
  };

  const handleRemoveMed = (index) => {
    setConsultForm(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  // Submit doctor consultation
  const handleSaveConsultation = (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const validMeds = consultForm.medicines.filter(m => m.name.trim().length > 0);

    addDoctorConsultation(selectedPatient.aadhaar, {
      patientName: selectedPatient.name,
      diagnosis: consultForm.diagnosis || 'Clinical Consultation',
      department: consultForm.department,
      symptoms: consultForm.symptoms,
      symptomDuration: consultForm.symptomDuration,
      severity: consultForm.severity,
      doctorNotes: consultForm.doctorNotes,
      followUpDate: consultForm.followUpDate,
      medicines: validMeds,
      prescriptionImageUrl: validMeds.length > 0 ? 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80' : ''
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setShowConsultationModal(false);

    // Reset form
    setConsultForm({
      diagnosis: '',
      department: user.doctorDetails?.specialty || 'General Medicine',
      symptoms: '',
      symptomDuration: '3 days',
      severity: 'Moderate',
      doctorNotes: '',
      followUpDate: '',
      medicines: [
        {
          name: '',
          dosage: '1 Tab',
          frequency: '1-0-1 (Twice daily)',
          timing: 'After meals',
          duration: '5 days',
          instructions: ''
        }
      ]
    });
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12 max-w-xl mx-auto">
      
      {/* 1. Doctor Clinic Header Card (Apple Style) */}
      <div className="ios-grouped-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-[#000000]">
                  Dr. {user.name}
                </h2>
                <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-[#8E8E93]">
                {user.doctorDetails?.specialty || 'Internal Medicine'} • {user.doctorDetails?.hospital || 'Apollo / Max Hospital'}
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Quick Stats Strip */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/[0.04]">
          <div className="p-2 bg-[#F2F2F7] rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-[#8E8E93] block">License</span>
            <span className="text-xs font-bold text-[#000000] font-mono truncate block">
              {user.doctorDetails?.regNumber || 'MCI-89412'}
            </span>
          </div>

          <div className="p-2 bg-[#F2F2F7] rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-[#8E8E93] block">Patients</span>
            <span className="text-xs font-bold text-emerald-700 block">
              {allMembers.length} Indexed
            </span>
          </div>

          <div className="p-2 bg-[#F2F2F7] rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-[#8E8E93] block">Records</span>
            <span className="text-xs font-bold text-blue-600 block">
              {records.length} Total
            </span>
          </div>
        </div>
      </div>

      {/* 2. iOS Native Aadhaar & Patient Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by 12-Digit Aadhaar or Patient Name..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/[0.08] rounded-2xl text-sm font-medium focus:outline-none focus:border-emerald-500 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. Patient Roster / Quick Select Chips */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] px-1">
          Select Patient Dossier ({filteredPatients.length})
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filteredPatients.map((patient) => {
            const isSelected = selectedPatient?.id === patient.id;
            return (
              <button
                key={patient.id}
                onClick={() => handleSelectPatient(patient)}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 flex-shrink-0 transition-all ios-tap ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-[1.02]'
                    : 'bg-white text-slate-900 border-black/[0.06] hover:bg-slate-50'
                }`}
              >
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/30"
                />
                <div className="min-w-0 pr-1">
                  <p className="text-xs font-bold truncate max-w-[90px]">{patient.name}</p>
                  <p className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-[#8E8E93]'}`}>
                    {patient.relation || 'Patient'} • {patient.bloodGroup}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Patient Lifetime Health Dossier */}
      {selectedPatient && (
        <div className="space-y-4">
          
          {/* Patient Overview Card */}
          <div className="ios-grouped-card p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-black/10 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-[#000000]">
                      {selectedPatient.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-md">
                      Aadhaar Linked
                    </span>
                  </div>
                  <p className="text-xs text-[#8E8E93] mt-0.5">
                    {selectedPatient.gender} • {selectedPatient.age} yrs • Blood Group: <strong className="text-red-500">{selectedPatient.bloodGroup || 'O+'}</strong>
                  </p>
                  <div className="mt-1.5">
                    <AadhaarBadge aadhaar={selectedPatient.aadhaar} showFullByDefault={true} />
                  </div>
                </div>
              </div>

              {/* Add Consultation Button */}
              <button
                onClick={() => setShowConsultationModal(true)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 flex-shrink-0 ios-tap"
              >
                <Plus className="w-4 h-4" />
                <span>Prescribe Rx</span>
              </button>
            </div>

            {/* Critical Allergy Warning Banner */}
            {selectedPatient.allergies && selectedPatient.allergies.length > 0 && selectedPatient.allergies[0] !== 'None' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Adverse Drug Reaction Warning:</span>
                  <span>Known allergy to <strong className="underline">{selectedPatient.allergies.join(', ')}</strong></span>
                </div>
              </div>
            )}

            {/* Chronic Conditions Tags */}
            {selectedPatient.chronicConditions && selectedPatient.chronicConditions.length > 0 && selectedPatient.chronicConditions[0] !== 'None' && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
                <span className="text-[10px] font-bold uppercase text-[#8E8E93]">Chronic:</span>
                {selectedPatient.chronicConditions.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-semibold text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Patient Lifetime Visit History */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                Lifetime Medical Records ({patientRecords.length} Consultations)
              </h3>
              <span className="text-[11px] text-emerald-600 font-semibold">Unified Aadhaar EHR</span>
            </div>

            {patientRecords.length === 0 ? (
              <div className="ios-grouped-card p-6 text-center space-y-2">
                <p className="text-xs font-bold text-slate-700">No previous hospital consultations on file.</p>
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  + Add First Consultation
                </button>
              </div>
            ) : (
              <div className="ios-grouped-card overflow-hidden divide-y divide-black/[0.06]">
                {patientRecords.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecordForDetail(rec)}
                    className="p-4 hover:bg-slate-50/80 cursor-pointer transition-colors ios-tap space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <Stethoscope className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#000000]">{rec.diagnosis}</p>
                          <p className="text-xs text-[#8E8E93]">{rec.doctorName} • {rec.hospitalName}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#8E8E93] font-medium">{rec.date}</span>
                    </div>

                    {rec.symptoms && (
                      <p className="text-xs text-slate-600 bg-[#F2F2F7] p-2 rounded-lg">
                        <strong>Symptoms:</strong> {rec.symptoms} ({rec.symptomDuration})
                      </p>
                    )}

                    {rec.medicines && rec.medicines.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {rec.medicines.map((m, i) => (
                          <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-semibold rounded">
                            {m.name} ({m.frequency})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* 5. Doctor Write Consultation / Digital Rx Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

            {/* Header */}
            <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div>
                <h3 className="font-bold text-base flex items-center gap-1.5">
                  <Stethoscope className="w-5 h-5" />
                  Prescribe Digital Rx & Diagnosis
                </h3>
                <p className="text-xs text-emerald-100">
                  Patient: {selectedPatient?.name} (Aadhaar: {formatAadhaar(selectedPatient?.aadhaar)})
                </p>
              </div>
              <button
                onClick={() => setShowConsultationModal(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveConsultation} className="p-6 space-y-4 overflow-y-auto flex-1">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Diagnosis *</label>
                <input
                  type="text"
                  required
                  value={consultForm.diagnosis}
                  onChange={(e) => setConsultForm({ ...consultForm, diagnosis: e.target.value })}
                  placeholder="e.g. Acute Pharyngitis / Stage-1 HTN"
                  className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Findings & Symptoms</label>
                <textarea
                  rows={2}
                  value={consultForm.symptoms}
                  onChange={(e) => setConsultForm({ ...consultForm, symptoms: e.target.value })}
                  placeholder="e.g. Fever 101F, throat congestion, body pain"
                  className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Prescribe Medicines */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-emerald-600" /> Prescribed Medicines
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMedRow}
                    className="text-xs text-emerald-700 font-bold hover:underline"
                  >
                    + Add Medicine
                  </button>
                </div>

                {consultForm.medicines.map((med, idx) => (
                  <div key={idx} className="p-3 bg-[#F2F2F7] rounded-xl space-y-2 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleUpdateMed(idx, 'name', e.target.value)}
                        placeholder="Medicine Name (e.g. Augmentin 625 Duo)"
                        className="flex-1 px-2.5 py-1.5 bg-white rounded-lg text-xs font-semibold focus:outline-none"
                      />
                      {consultForm.medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMed(idx)}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleUpdateMed(idx, 'dosage', e.target.value)}
                        placeholder="Dose (1 Tab)"
                        className="px-2 py-1 bg-white rounded-md text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        value={med.frequency}
                        onChange={(e) => handleUpdateMed(idx, 'frequency', e.target.value)}
                        placeholder="Freq (1-0-1)"
                        className="px-2 py-1 bg-white rounded-md text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleUpdateMed(idx, 'duration', e.target.value)}
                        placeholder="Duration (5 days)"
                        className="px-2 py-1 bg-white rounded-md text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor Advice / Notes</label>
                <input
                  type="text"
                  value={consultForm.doctorNotes}
                  onChange={(e) => setConsultForm({ ...consultForm, doctorNotes: e.target.value })}
                  placeholder="e.g. Plenty of oral fluids, review in 5 days"
                  className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConsultationModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Save to Patient EHR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
