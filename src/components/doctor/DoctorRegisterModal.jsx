import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, ShieldCheck, X, Building, Award, FileText, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DoctorRegisterModal() {
  const { user, registerAsDoctor, showDoctorRegisterModal, setShowDoctorRegisterModal } = useApp();

  const [formData, setFormData] = useState({
    regNumber: user.doctorDetails?.regNumber || 'MCI-2018-77491',
    council: user.doctorDetails?.council || 'State Medical Council',
    specialty: user.doctorDetails?.specialty || 'General Physician / Internal Medicine',
    hospital: user.doctorDetails?.hospital || 'Apollo Hospitals / Max Healthcare',
    degrees: user.doctorDetails?.degrees || 'MBBS, MD',
    experienceYears: user.doctorDetails?.experienceYears || '8'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!showDoctorRegisterModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.regNumber || !formData.specialty || !formData.hospital) {
      setError('Please fill in your Medical Registration Number, Specialty, and Hospital affiliation.');
      return;
    }

    registerAsDoctor(formData);
    setSuccess(true);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSuccess(false);
      setShowDoctorRegisterModal(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-5 text-white relative">
          <button
            onClick={() => setShowDoctorRegisterModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Doctor Verification & Onboarding</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Register as a certified medical practitioner to search Aadhaar records
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Doctor Credentials Verified!</h4>
            <p className="text-sm text-slate-600">
              Welcome Dr. {user.name}. You now have full access to Doctor Mode and Aadhaar search vault.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {error}
              </div>
            )}

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Linked Identity (Aadhaar & Account)
              </div>
              <div className="text-sm font-bold text-slate-900">{user.name}</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Aadhaar: {user.aadhaar.replace(/(\d{4})/g, '$1 ').trim()} • {user.phone}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  MCI / State Reg. Number *
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.regNumber}
                    onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                    placeholder="e.g. MCI-2018-89412"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Medical Council Name
                </label>
                <input
                  type="text"
                  value={formData.council}
                  onChange={(e) => setFormData({ ...formData, council: e.target.value })}
                  placeholder="e.g. Delhi Medical Council"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specialty / Department *
              </label>
              <div className="relative">
                <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="e.g. Cardiologist, General Physician, Pediatrician"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Hospital / Clinic Affiliation *
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  placeholder="e.g. Max Super Speciality Hospital, Saket"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degrees / Qualifications
                </label>
                <input
                  type="text"
                  value={formData.degrees}
                  onChange={(e) => setFormData({ ...formData, degrees: e.target.value })}
                  placeholder="e.g. MBBS, MD, DM"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  placeholder="e.g. 10"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDoctorRegisterModal(false)}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
              >
                Verify & Unlock Doctor Mode
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
