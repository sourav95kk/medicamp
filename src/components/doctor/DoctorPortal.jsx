import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { formatAadhaar, cleanAadhaar } from '../../utils/aadhaarUtils';
import { 
  Stethoscope, Search, ShieldCheck, UserCheck, AlertTriangle, 
  Calendar, Building, Pill, FileText, Plus, CheckCircle, 
  Clock, HeartPulse, User, ChevronRight, X, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DoctorPortal() {
  const { 
    user, 
    searchPatientByAadhaar, 
    addDoctorConsultation, 
    allMembers,
    setSelectedRecordForDetail 
  } = useApp();

  const [searchAadhaar, setSearchAadhaar] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

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

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const cleaned = cleanAadhaar(searchAadhaar);
    if (!cleaned || cleaned.length < 12) {
      alert('Please enter a 12-digit Aadhaar number.');
      return;
    }

    const res = searchPatientByAadhaar(cleaned);
    setSearchResults(res);
    setHasSearched(true);
  };

  const handleQuickPatientSelect = (aadhaarNumber) => {
    setSearchAadhaar(formatAadhaar(aadhaarNumber));
    const res = searchPatientByAadhaar(aadhaarNumber);
    setSearchResults(res);
    setHasSearched(true);
  };

  // Add medicine row in doctor consultation form
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

  // Submit doctor consultation to patient's Aadhaar record
  const handleSaveConsultation = (e) => {
    e.preventDefault();
    if (!searchResults?.patient) return;

    const validMeds = consultForm.medicines.filter(m => m.name.trim().length > 0);

    const newRec = addDoctorConsultation(searchResults.patient.aadhaar, {
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

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    // Refresh current search results
    const updated = searchPatientByAadhaar(searchResults.patient.aadhaar);
    setSearchResults(updated);
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
    <div className="space-y-6 animate-fade-in pb-20">
      
      {/* 1. Doctor Verification Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-6 text-white shadow-xl shadow-emerald-700/15 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 flex-shrink-0">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Dr. {user.name}
                </h2>
                <span className="px-2.5 py-0.5 bg-emerald-400/30 text-emerald-100 text-[10px] font-extrabold rounded-full flex items-center gap-1 border border-emerald-300/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Physician
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                {user.doctorDetails?.specialty || 'Internal Medicine'} • {user.doctorDetails?.hospital || 'Hospital OPD'}
              </p>
              <p className="text-[11px] text-emerald-200/90 font-mono mt-1">
                License Reg: <span className="font-bold text-white">{user.doctorDetails?.regNumber || 'MCI-2018-89412'}</span> ({user.doctorDetails?.council || 'National Medical Commission'})
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-center w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-emerald-200 block">Access Clearance</span>
            <span className="text-xs font-bold text-white">Full EHR / Aadhaar Query</span>
          </div>
        </div>
      </div>

      {/* 2. Aadhaar Search Engine Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            Patient Aadhaar Lookup Engine
          </h3>
          <p className="text-xs text-slate-500">
            Type a patient's 12-digit Aadhaar number to retrieve their unified lifetime medical history across all hospitals.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <ShieldCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              maxLength={14}
              value={searchAadhaar}
              onChange={(e) => setSearchAadhaar(formatAadhaar(e.target.value))}
              placeholder="Enter 12-Digit Aadhaar (e.g. 5482 9103 8472)"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-base font-mono font-bold tracking-wider text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all flex-shrink-0 ios-press"
          >
            <Search className="w-4 h-4" />
            Search Patient Dossier
          </button>
        </form>

        {/* Quick Demo Search Chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Quick Test Patients:</span>
          {allMembers.map((member) => (
            <button
              key={member.id}
              type="button"
              onClick={() => handleQuickPatientSelect(member.aadhaar)}
              className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5"
            >
              <img src={member.avatar} alt={member.name} className="w-4 h-4 rounded-full" />
              <span>{member.name} ({member.relation})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Search Results & Patient Lifetime Dossier */}
      {hasSearched && (
        <div className="space-y-6 animate-fade-in">
          {searchResults && searchResults.found ? (
            <>
              {/* Patient Header Summary */}
              <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500/80 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={searchResults.patient.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={searchResults.patient.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-200 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-slate-900">
                          {searchResults.patient.name}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                          Aadhaar Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {searchResults.patient.gender} • {searchResults.patient.age} Years • Blood Group: <strong className="text-rose-600">{searchResults.patient.bloodGroup || 'O+'}</strong>
                      </p>
                      <div className="mt-2">
                        <AadhaarBadge aadhaar={searchResults.patient.aadhaar} showFullByDefault={true} />
                      </div>
                    </div>
                  </div>

                  {/* Doctor Action: Add Consultation */}
                  <button
                    onClick={() => setShowConsultationModal(true)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all ios-press"
                  >
                    <Plus className="w-4 h-4" />
                    + Prescribe & Add Clinical Note
                  </button>
                </div>

                {/* Critical Allergy Warning Banner */}
                {searchResults.patient.allergies && searchResults.patient.allergies.length > 0 && searchResults.patient.allergies[0] !== 'None' && (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-rose-900 uppercase tracking-wider">
                        Critical Allergy Warning
                      </h4>
                      <p className="text-xs text-rose-800 font-semibold mt-0.5">
                        Patient has documented adverse drug reactions to: <span className="underline">{searchResults.patient.allergies.join(', ')}</span>. Exercise caution when prescribing.
                      </p>
                    </div>
                  </div>
                )}

                {/* Chronic conditions */}
                {searchResults.patient.chronicConditions && searchResults.patient.chronicConditions.length > 0 && searchResults.patient.chronicConditions[0] !== 'None' && (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                      Chronic Conditions:
                    </span>
                    {searchResults.patient.chronicConditions.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Patient's Unified Medical History Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    Unified Lifetime History ({searchResults.records.length} Consultations)
                  </h4>
                  <span className="text-xs text-slate-500">Cross-hospital records linked by Aadhaar</span>
                </div>

                {searchResults.records.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                    <p className="text-sm font-semibold text-slate-700">No past hospital visits on record.</p>
                    <button
                      onClick={() => setShowConsultationModal(true)}
                      className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                    >
                      Create First Consultation Note
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searchResults.records.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setSelectedRecordForDetail(rec)}
                        className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-sm cursor-pointer transition-all space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                              <Stethoscope className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900 text-sm">
                                {rec.doctorName}
                              </h5>
                              <p className="text-xs text-slate-500">
                                {rec.hospitalName} • {rec.department || 'Consultation'}
                              </p>
                            </div>
                          </div>

                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg self-start sm:self-center">
                            {rec.date}
                          </span>
                        </div>

                        {/* Symptoms & Diagnosis */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="bg-slate-50 p-2.5 rounded-xl">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Symptoms</span>
                            <p className="font-medium text-slate-800">{rec.symptoms || 'Regular checkup'}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Duration: {rec.symptomDuration} • Severity: {rec.severity}</p>
                          </div>

                          <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Diagnosis</span>
                            <p className="font-bold text-emerald-950">{rec.diagnosis}</p>
                          </div>
                        </div>

                        {/* Prescribed Meds */}
                        {rec.medicines && rec.medicines.length > 0 && (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              Prescribed Medicines:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {rec.medicines.map((m, i) => (
                                <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold rounded-md">
                                  {m.name} ({m.frequency})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">No Patient Found with this Aadhaar</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No active records linked to Aadhaar <strong className="font-mono">{searchAadhaar}</strong> were found in the database. Please verify the 12-digit number.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Doctor Add Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div 
            className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto transition-all max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  New Clinical Consultation & Digital Prescription
                </h3>
                <p className="text-xs text-emerald-100">
                  Patient: {searchResults?.patient?.name} (Aadhaar: {formatAadhaar(searchResults?.patient?.aadhaar)})
                </p>
              </div>
              <button
                onClick={() => setShowConsultationModal(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Consultation Form */}
            <form onSubmit={handleSaveConsultation} className="p-6 space-y-5 overflow-y-auto flex-1">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinical Diagnosis *
                  </label>
                  <input
                    type="text"
                    required
                    value={consultForm.diagnosis}
                    onChange={(e) => setConsultForm({ ...consultForm, diagnosis: e.target.value })}
                    placeholder="e.g. Acute Bronchitis / Stage-1 HTN"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinical Department
                  </label>
                  <input
                    type="text"
                    value={consultForm.department}
                    onChange={(e) => setConsultForm({ ...consultForm, department: e.target.value })}
                    placeholder="e.g. Cardiology OPD"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Symptoms Observed
                </label>
                <textarea
                  rows={2}
                  value={consultForm.symptoms}
                  onChange={(e) => setConsultForm({ ...consultForm, symptoms: e.target.value })}
                  placeholder="e.g. Bilateral wheezing, fever since 3 days"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Prescribe Medicines */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-emerald-600" />
                    Digital Rx (Prescription)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMedRow}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Medicine
                  </button>
                </div>

                <div className="space-y-2">
                  {consultForm.medicines.map((med, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) => handleUpdateMed(idx, 'name', e.target.value)}
                          placeholder="Medicine Name (e.g. Augmentin 625 Duo)"
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
                        />
                        {consultForm.medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMed(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => handleUpdateMed(idx, 'dosage', e.target.value)}
                          placeholder="Dosage"
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) => handleUpdateMed(idx, 'frequency', e.target.value)}
                          placeholder="Freq (1-0-1)"
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={med.timing}
                          onChange={(e) => handleUpdateMed(idx, 'timing', e.target.value)}
                          placeholder="Timing (After meals)"
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={med.duration}
                          onChange={(e) => handleUpdateMed(idx, 'duration', e.target.value)}
                          placeholder="Duration (5 days)"
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={consultForm.followUpDate}
                    onChange={(e) => setConsultForm({ ...consultForm, followUpDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Advice & Instructions
                  </label>
                  <input
                    type="text"
                    value={consultForm.doctorNotes}
                    onChange={(e) => setConsultForm({ ...consultForm, doctorNotes: e.target.value })}
                    placeholder="e.g. Bed rest, avoid cold drinks"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={() => setShowConsultationModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20"
                >
                  Save Consultation to Patient EHR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
