import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { processPrescriptionImage } from '../../services/ocrService';
import { SAMPLE_PRESCRIPTION_PRESETS } from '../../data/mockData';
import { 
  X, Upload, Sparkles, Plus, Trash2, CheckCircle, FileText, 
  Calendar, Stethoscope, Building, Pill, AlertTriangle, Loader2,
  Clock, ShieldCheck, Image as ImageIcon, Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AddRecordModal() {
  const { 
    showAddRecordModal, 
    setShowAddRecordModal, 
    allMembers, 
    activeMemberId, 
    addMedicalRecord 
  } = useApp();

  const [selectedPatientId, setSelectedPatientId] = useState(activeMemberId || 'usr_self');
  const [hospitalName, setHospitalName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('General Medicine');
  const [department, setDepartment] = useState('Outpatient (OPD)');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Symptoms & Clinical info
  const [symptoms, setSymptoms] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('3 days');
  const [severity, setSeverity] = useState('Mild');
  const [diagnosis, setDiagnosis] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // Prescription & OCR
  const [prescriptionImage, setPrescriptionImage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Medicines List
  const [medicines, setMedicines] = useState([
    {
      name: '',
      dosage: '',
      frequency: '1-0-1 (Twice daily)',
      timing: 'After meals',
      duration: '5 days',
      instructions: ''
    }
  ]);

  if (!showAddRecordModal) return null;

  const targetPatient = allMembers.find(m => m.id === selectedPatientId) || allMembers[0];

  // Handle File Upload for Prescription
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPrescriptionImage(event.target.result);
        setScanSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run OCR on the uploaded image or preset
  const runPrescriptionOCR = async (imageInput) => {
    const targetImg = imageInput || prescriptionImage;
    if (!targetImg) return;

    setIsScanning(true);
    setOcrProgress({ progress: 10, message: 'Starting OCR engine...' });

    try {
      const result = await processPrescriptionImage(targetImg, (progress) => {
        setOcrProgress(progress);
      });

      if (result.success) {
        if (result.doctorName && !doctorName) setDoctorName(result.doctorName);
        if (result.hospitalName && !hospitalName) setHospitalName(result.hospitalName);
        
        if (result.medicines && result.medicines.length > 0) {
          setMedicines(result.medicines);
        }
        setScanSuccess(true);
        
        // Confetti feedback
        confetti({
          particleCount: 50,
          spread: 45,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  // Select Sample Preset
  const handleSelectPreset = (preset) => {
    setPrescriptionImage(preset.imageUrl);
    setDoctorName(preset.doctor);
    setHospitalName(preset.hospital);
    runPrescriptionOCR(preset.id);
  };

  // Add empty medicine row
  const handleAddMedicineRow = () => {
    setMedicines(prev => [
      ...prev,
      {
        name: '',
        dosage: '',
        frequency: '1-0-1 (Twice daily)',
        timing: 'After meals',
        duration: '5 days',
        instructions: ''
      }
    ]);
  };

  // Update specific medicine field
  const handleUpdateMedicine = (index, field, value) => {
    setMedicines(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Remove medicine
  const handleRemoveMedicine = (index) => {
    setMedicines(prev => prev.filter((_, i) => i !== index));
  };

  // Save Record
  const handleSubmit = (e) => {
    e.preventDefault();

    const validMedicines = medicines.filter(m => m.name.trim().length > 0);

    addMedicalRecord({
      patientAadhaar: targetPatient.aadhaar,
      patientName: targetPatient.name,
      date,
      doctorName: doctorName || 'Attending Physician',
      doctorSpecialty,
      hospitalName: hospitalName || 'General Hospital / Clinic',
      department,
      symptoms,
      symptomDuration,
      severity,
      diagnosis: diagnosis || 'Clinical Consultation',
      prescriptionImageUrl: prescriptionImage || (validMedicines.length > 0 ? 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80' : ''),
      medicines: validMedicines,
      followUpDate,
      doctorNotes
    });

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 }
    });

    setShowAddRecordModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto transition-all max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              Add Medical Record & Prescription
            </h3>
            <p className="text-xs text-slate-500">Log visit details, symptoms, and scan doctor prescription</p>
          </div>
          <button
            onClick={() => setShowAddRecordModal(false)}
            className="p-1.5 rounded-full hover:bg-white text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Patient Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Record For Family Member
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {allMembers.map((member) => (
                <button
                  type="button"
                  key={member.id}
                  onClick={() => setSelectedPatientId(member.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    selectedPatientId === member.id
                      ? 'border-sky-600 bg-sky-50/80 text-sky-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{member.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{member.relation}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visit & Hospital Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-4 h-4 text-sky-600" />
              Doctor & Hospital Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Doctor Visited
                </label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="e.g. Dr. Ramesh Sethi"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hospital / Clinic Name
                </label>
                <input
                  type="text"
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="e.g. Max Healthcare, Apollo Clinic"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specialty / Department
                </label>
                <input
                  type="text"
                  value={doctorSpecialty}
                  onChange={(e) => setDoctorSpecialty(e.target.value)}
                  placeholder="e.g. Cardiology, Pediatrics, General Medicine"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Visit Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms, Duration & Severity */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600" />
              Symptoms & Health Condition
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Symptoms Experienced *
              </label>
              <textarea
                rows={2}
                required
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. High fever, dry cough, throat pain, headache"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duration of Symptoms
                </label>
                <input
                  type="text"
                  value={symptomDuration}
                  onChange={(e) => setSymptomDuration(e.target.value)}
                  placeholder="e.g. 4 days, 2 weeks"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Severity Level
                </label>
                <div className="flex gap-1.5">
                  {['Mild', 'Moderate', 'High'].map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setSeverity(lvl)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        severity === lvl
                          ? lvl === 'High' 
                            ? 'bg-rose-600 text-white border-rose-600'
                            : lvl === 'Moderate'
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Doctor Diagnosis / Notes
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Viral URI, Acute Gastritis"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Prescription Upload & Smart OCR Auto-populate */}
          <div className="bg-gradient-to-br from-indigo-50/50 via-sky-50/50 to-emerald-50/50 border-2 border-indigo-200/80 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Prescription Scanner & Auto-Populator
                </h4>
                <p className="text-[11px] text-slate-500">
                  Upload prescription image to auto-detect & populate medicine names & dosages
                </p>
              </div>
              {scanSuccess && (
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Auto-Populated!
                </span>
              )}
            </div>

            {/* Upload Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-4 text-center hover:bg-indigo-50/40 transition-colors relative flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-indigo-900">Upload Prescription Photo</p>
                <p className="text-[10px] text-indigo-600 mt-0.5">Drag & drop or take a photo</p>
              </div>

              {/* Sample Presets for Fast Demo */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-600">Or test with demo prescription:</p>
                {SAMPLE_PRESCRIPTION_PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="w-full text-left p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs flex items-center justify-between transition-all"
                  >
                    <span className="font-semibold text-slate-800 truncate">{preset.title}</span>
                    <span className="text-[10px] text-indigo-600 font-bold flex-shrink-0">Load & OCR →</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded Image Preview & Trigger OCR */}
            {prescriptionImage && (
              <div className="bg-white p-3 rounded-xl border border-indigo-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={prescriptionImage}
                    alt="Prescription"
                    className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Prescription Attached</p>
                    <p className="text-[10px] text-slate-500">Ready for automated medicine parsing</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => runPrescriptionOCR()}
                  disabled={isScanning}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-1.5 disabled:opacity-50 transition-all ios-press"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Auto-Populate Meds
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Scan Progress Feedback */}
            {isScanning && ocrProgress && (
              <div className="bg-white p-3 rounded-xl border border-indigo-200 space-y-1.5 animate-pulse">
                <div className="flex justify-between text-xs text-indigo-900 font-semibold">
                  <span>{ocrProgress.message}</span>
                  <span>{ocrProgress.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${ocrProgress.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Medicines List & Auto-populated Fields */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-emerald-600" />
                  Prescribed Medicines ({medicines.filter(m => m.name).length})
                </h4>
                <p className="text-[11px] text-slate-500">Verify or adjust medicines, dosages, and schedules</p>
              </div>
              <button
                type="button"
                onClick={handleAddMedicineRow}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Medicine
              </button>
            </div>

            <div className="space-y-3">
              {medicines.map((med, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={med.name}
                      onChange={(e) => handleUpdateMedicine(index, 'name', e.target.value)}
                      placeholder="Medicine Name (e.g. Dolo 650 / Paracetamol)"
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500"
                    />
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(index)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Dosage</label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleUpdateMedicine(index, 'dosage', e.target.value)}
                        placeholder="e.g. 650mg / 1 tab"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Frequency</label>
                      <input
                        type="text"
                        value={med.frequency}
                        onChange={(e) => handleUpdateMedicine(index, 'frequency', e.target.value)}
                        placeholder="e.g. 1-0-1 / TDS"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Timing</label>
                      <input
                        type="text"
                        value={med.timing}
                        onChange={(e) => handleUpdateMedicine(index, 'timing', e.target.value)}
                        placeholder="e.g. After food"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Duration</label>
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleUpdateMedicine(index, 'duration', e.target.value)}
                        placeholder="e.g. 5 days"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up & Additional Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Follow-up / Review Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctor's Special Advice
              </label>
              <input
                type="text"
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                placeholder="e.g. Low sodium diet, drink 3L water, warm saline gargle"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
            <button
              type="button"
              onClick={() => setShowAddRecordModal(false)}
              className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/20 transition-all ios-press"
            >
              Save Record to Aadhaar Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
