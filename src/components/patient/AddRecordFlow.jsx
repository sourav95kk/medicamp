import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { processPrescriptionImage } from '../../services/ocrService';
import { SAMPLE_PRESCRIPTION_PRESETS } from '../../data/mockData';
import { 
  ChevronLeft, Calendar, Building, Stethoscope, FileText, 
  Upload, Sparkles, Check, Plus, Edit2, Trash2, CheckCircle2, Loader2, X 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AddRecordFlow({ onBack, onComplete }) {
  const { allMembers, addMedicalRecord } = useApp();

  const [currentStep, setCurrentStep] = useState(1); // 1: Visit Details, 2: Upload Prescription, 3: Extracted Medicines
  const [selectedMemberId, setSelectedMemberId] = useState(allMembers[0]?.id || 'usr_sourav');
  
  // Step 1 Form Data
  const [date, setDate] = useState('12 Sep 2025');
  const [hospitalName, setHospitalName] = useState('City Care Hospital');
  const [doctorName, setDoctorName] = useState('Dr. Rakesh Sharma');
  const [specialization, setSpecialization] = useState('General Physician');
  const [symptoms, setSymptoms] = useState('Fever, cough, body ache for 3 days');
  
  // Step 2 Form Data
  const [prescriptionImage, setPrescriptionImage] = useState('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80');
  const [autoDetect, setAutoDetect] = useState(true);
  const [isExtracting, setIsExtracting] = useState(false);

  // Step 3 Form Data (Extracted Medicines matching screen 12)
  const [medicines, setMedicines] = useState([
    {
      id: 'm1',
      selected: true,
      name: 'Paracetamol 500 mg',
      dosage: '1 tablet',
      frequency: 'Twice daily',
      timing: 'After meals',
      duration: '5 days'
    },
    {
      id: 'm2',
      selected: true,
      name: 'Azithromycin 500 mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      timing: 'After lunch',
      duration: '3 days'
    },
    {
      id: 'm3',
      selected: true,
      name: 'Cetirizine 10 mg',
      dosage: '1 tablet',
      frequency: 'At night',
      timing: 'Bedtime',
      duration: '5 days'
    },
    {
      id: 'm4',
      selected: true,
      name: 'Pantoprazole 40 mg',
      dosage: '1 tablet',
      frequency: 'Before food',
      timing: 'Empty stomach (Morning)',
      duration: '5 days'
    }
  ]);
  const [notes, setNotes] = useState('');

  const targetMember = allMembers.find(m => m.id === selectedMemberId) || allMembers[0];

  // Handle Prescription Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPrescriptionImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Step 2 -> Step 3 transition
  const handleContinueToExtraction = async () => {
    if (autoDetect) {
      setIsExtracting(true);
      try {
        const ocrRes = await processPrescriptionImage(SAMPLE_PRESCRIPTION_PRESETS[0].id);
        if (ocrRes.medicines && ocrRes.medicines.length > 0) {
          setMedicines(ocrRes.medicines.map((m, i) => ({
            id: `m_${i}`,
            selected: true,
            name: m.name,
            dosage: m.dosage || '1 tablet',
            frequency: m.frequency || 'Twice daily',
            timing: m.timing || 'After meals',
            duration: m.duration || '5 days'
          })));
        }
      } catch (e) {
        console.warn('Extraction notice:', e);
      } finally {
        setIsExtracting(false);
      }
    }
    setCurrentStep(3);
  };

  // Toggle medicine checkbox
  const toggleMedicineCheckbox = (id) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, selected: !m.selected } : m));
  };

  // Add Manual Medicine
  const handleAddManualMedicine = () => {
    const name = prompt('Enter Medicine Name (e.g. Dolo 650):');
    if (!name) return;
    setMedicines(prev => [
      ...prev,
      {
        id: `m_${Date.now()}`,
        selected: true,
        name,
        dosage: '1 tablet',
        frequency: 'Twice daily',
        timing: 'After meals',
        duration: '5 days'
      }
    ]);
  };

  // Final Save
  const handleSaveRecord = () => {
    const activeMeds = medicines.filter(m => m.selected);
    addMedicalRecord({
      patientAadhaar: targetMember.aadhaar,
      patientName: targetMember.name,
      date,
      doctorName: doctorName || 'Dr. Rakesh Sharma',
      doctorSpecialty: specialization,
      hospitalName: hospitalName || 'City Care Hospital',
      department: specialization,
      symptoms,
      symptomDuration: '3 days',
      severity: 'Moderate',
      diagnosis: symptoms.includes('Fever') ? 'Viral Fever' : 'Clinical Consultation',
      prescriptionImageUrl: prescriptionImage,
      medicines: activeMeds,
      doctorNotes: notes
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    if (onComplete) onComplete();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-8 max-w-md mx-auto animate-fade-in select-none">
      
      {/* ========================================================================= */}
      {/* STEP 1: ADD MEDICAL RECORD DETAILS (Screen 10) */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-5 pt-2 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Add Medical Record
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Add details about your doctor visit, symptoms, diagnosis and medicines.
              </p>
            </div>

            {/* "For" Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">For</label>
              <div className="relative">
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none appearance-none"
                >
                  {allMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.relation === 'Self' ? '(Me)' : `(${m.relation})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date of Visit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date of Visit</label>
              <div className="relative">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="12 Sep 2025"
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Hospital / Clinic */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hospital / Clinic</label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="City Care Hospital"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none"
              />
            </div>

            {/* Doctor Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Name</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Dr. Rakesh Sharma"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none"
              >
                <option value="General Physician">General Physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Orthopedic">Orthopedic</option>
              </select>
            </div>

            {/* Reason for Visit / Symptoms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit / Symptoms</label>
              <textarea
                rows={2}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Fever, cough, headache..."
                className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none"
              />
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all ios-tap"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: UPLOAD PRESCRIPTION (Screen 11) */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-6 pt-2 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Upload Prescription
              </h1>
            </div>

            {/* Upload Container (Screen 11 Center) */}
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-3xl p-10 text-center bg-[#F8FAFC] hover:bg-slate-100 transition-colors relative cursor-pointer flex flex-col items-center justify-center">
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B64DA] flex items-center justify-center mb-3">
                <FileText className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-[#0F172A]">
                Tap to upload prescription
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                PDF, JPG or PNG (Max 10 MB)
              </p>
            </div>

            {/* Auto-detect Toggle (Screen 11) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">
                  Auto-detect medicines
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 max-w-[220px]">
                  We'll extract medicine names from the prescription using AI.
                </p>
              </div>

              {/* iOS Switch Toggle */}
              <button
                type="button"
                onClick={() => setAutoDetect(!autoDetect)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                  autoDetect ? 'bg-[#1B64DA]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  autoDetect ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-6">
            <button
              onClick={handleContinueToExtraction}
              disabled={isExtracting}
              className="w-full py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 ios-tap"
            >
              {isExtracting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>{isExtracting ? 'Scanning with AI OCR...' : 'Continue'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: EXTRACTED MEDICINES (Screen 12) */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-5 pt-2 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Extracted Medicines
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Review and edit the detected medicines.
              </p>
            </div>

            {/* Extracted Medicines List with Checkboxes */}
            <div className="space-y-2.5">
              {medicines.map((med) => (
                <div
                  key={med.id}
                  onClick={() => toggleMedicineCheckbox(med.id)}
                  className="p-3.5 rounded-2xl border border-[#E2E8F0] bg-white flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors shadow-sm ios-tap"
                >
                  <div className="flex items-center gap-3">
                    {/* Blue Checkbox */}
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      med.selected ? 'bg-[#1B64DA] text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {med.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A]">
                        {med.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {med.dosage}, {med.frequency}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newDosage = prompt('Edit Dosage & Frequency:', `${med.dosage}, ${med.frequency}`);
                      if (newDosage) {
                        setMedicines(prev => prev.map(m => m.id === med.id ? { ...m, frequency: newDosage } : m));
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-[#1B64DA]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* + Add Medicine Manually */}
            <div>
              <button
                type="button"
                onClick={handleAddManualMedicine}
                className="w-full py-2.5 text-xs font-bold text-[#1B64DA] hover:underline flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Medicine Manually</span>
              </button>
            </div>

            {/* Notes (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional instructions..."
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none"
              />
            </div>
          </div>

          {/* Save Record Button */}
          <div className="pt-6">
            <button
              onClick={handleSaveRecord}
              className="w-full py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all ios-tap"
            >
              Save Record
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
