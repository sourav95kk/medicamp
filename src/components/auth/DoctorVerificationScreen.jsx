import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Stethoscope, Upload, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DoctorVerificationScreen({ onBack, onVerificationSuccess }) {
  const { registerAsDoctor } = useApp();
  const [regNumber, setRegNumber] = useState('');
  const [qualification, setQualification] = useState('MBBS, MD');
  const [hospital, setHospital] = useState('City Care Hospital');
  const [certificateFile, setCertificateFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!regNumber) {
      setError('Please enter your Medical Registration Number.');
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    registerAsDoctor({
      regNumber,
      council: 'State Medical Council',
      specialty: 'General Physician',
      hospital: hospital || 'City Care Hospital',
      degrees: qualification,
      experienceYears: 8
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setLoading(false);
    if (onVerificationSuccess) onVerificationSuccess();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-8 max-w-md mx-auto animate-fade-in select-none">
      
      {/* Top Header */}
      <div className="space-y-5 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1B64DA] flex items-center justify-center mx-auto">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Doctor Verification
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            To access doctor features, your account must be verified as a registered medical practitioner.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Medical Registration Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Medical Registration Number
            </label>
            <input
              type="text"
              required
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="e.g. MCI/State Reg. No."
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            />
          </div>

          {/* Qualification Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Qualification (e.g. MBBS, MD)
            </label>
            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            >
              <option value="MBBS">MBBS</option>
              <option value="MBBS, MD">MBBS, MD</option>
              <option value="MBBS, MS">MBBS, MS</option>
              <option value="MBBS, DNB">MBBS, DNB</option>
              <option value="BAMS">BAMS</option>
              <option value="BHMS">BHMS</option>
              <option value="BDS, MDS">BDS, MDS</option>
            </select>
          </div>

          {/* Upload Registration Certificate */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Upload Registration Certificate
            </label>
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-5 text-center bg-[#F8FAFC] hover:bg-slate-100 transition-colors relative cursor-pointer">
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1B64DA] flex items-center justify-center mx-auto mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900">
                {certificateFile || 'Tap to upload'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                PDF, JPG or PNG (Max 5 MB)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 ios-tap"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>Submit for Verification</span>
          </button>
        </form>
      </div>

    </div>
  );
}
