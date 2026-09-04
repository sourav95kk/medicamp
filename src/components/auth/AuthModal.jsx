import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { formatAadhaar, cleanAadhaar, isValidAadhaar } from '../../utils/aadhaarUtils';
import { 
  X, Mail, Lock, User, Phone, ShieldCheck, Stethoscope, 
  Building, Award, CheckCircle, AlertCircle, Sparkles, 
  KeyRound, ArrowRight, Loader2, Database, Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal() {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    signIn, 
    signUp, 
    loginAsDemoUser 
  } = useApp();

  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup_patient' | 'signup_doctor'
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    aadhaar: '',
    bloodGroup: 'O+',
    // Doctor specific
    doctorRegNumber: '',
    doctorCouncil: 'National Medical Commission',
    doctorSpecialty: 'Internal Medicine / Consultant Physician',
    doctorHospital: 'Max Super Speciality Hospital / Apollo Clinic',
    doctorDegrees: 'MBBS, MD',
    doctorExperience: '8'
  });

  if (!showAuthModal) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn(formData.email, formData.password);
      if (res.error) {
        setError(res.error.message || 'Failed to sign in. Check email and password.');
      } else {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
        setShowAuthModal(false);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleInitiateSignUp = (e) => {
    e.preventDefault();
    setError('');

    const cleanedAadhaar = cleanAadhaar(formData.aadhaar);
    if (cleanedAadhaar.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    if (authMode === 'signup_doctor' && !formData.doctorRegNumber) {
      setError('Please provide your Medical Registration Number.');
      return;
    }

    // Advance to simulated Aadhaar OTP verification step
    setStep('otp');
  };

  const handleVerifyOtpAndSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otpCode.length < 4) {
      setError('Please enter the verification code sent to your Aadhaar-linked mobile.');
      setLoading(false);
      return;
    }

    try {
      const isDoctor = authMode === 'signup_doctor';
      const res = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        aadhaar: cleanAadhaar(formData.aadhaar),
        bloodGroup: formData.bloodGroup,
        isDoctor,
        doctorDetails: isDoctor ? {
          regNumber: formData.doctorRegNumber,
          council: formData.doctorCouncil,
          specialty: formData.doctorSpecialty,
          hospital: formData.doctorHospital,
          degrees: formData.doctorDegrees,
          experienceYears: Number(formData.doctorExperience) || 5
        } : null
      });

      if (res.error) {
        setError(res.error.message || 'Sign up failed.');
      } else {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        setShowAuthModal(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to complete registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = (role) => {
    loginAsDemoUser(role);
    confetti({ particleCount: 50, spread: 45, origin: { y: 0.6 } });
    setShowAuthModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-blue-950 p-6 text-white relative">
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 backdrop-blur-md flex items-center justify-center border border-sky-400/30">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">MediCamp Health Vault</h3>
              <p className="text-xs text-sky-200 mt-0.5">
                Aadhaar-Linked Unified Electronic Health Records
              </p>
            </div>
          </div>

          {/* Supabase Status Banner */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>Database Backend:</span>
            </div>
            {isSupabaseConfigured() ? (
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Supabase Connected
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-bold rounded-full border border-amber-500/30">
                Local Vault / Supabase Ready
              </span>
            )}
          </div>
        </div>

        {/* Tab Segment Switcher */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex gap-1">
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setStep('form'); setError(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              authMode === 'signin'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('signup_patient'); setStep('form'); setError(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              authMode === 'signup_patient'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Patient Sign Up
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('signup_doctor'); setStep('form'); setError(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              authMode === 'signup_doctor'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Doctor Sign Up
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {authMode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                Sign In to Vault
              </button>

              {/* 1-Click Demo Logins */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Or Instant 1-Click Demo Login:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoSelect('doctor')}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 text-xs font-bold text-left transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-emerald-600" />
                      <span>Dr. Rahul Sharma</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-normal">Cardiologist (Doctor Mode)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoSelect('patient')}
                    className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-900 text-xs font-bold text-left transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>Priya Sharma</span>
                    </div>
                    <span className="text-[10px] text-blue-700 font-normal">Family Patient Profile</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* 2. SIGN UP FORMS (Step 1: Details) */}
          {(authMode === 'signup_patient' || authMode === 'signup_doctor') && step === 'form' && (
            <form onSubmit={handleInitiateSignUp} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={authMode === 'signup_doctor' ? 'Dr. Name' : 'Full Name'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Aadhaar Input */}
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-3.5 space-y-1">
                <label className="block text-xs font-bold text-sky-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  12-Digit Aadhaar Identification *
                </label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: formatAadhaar(e.target.value) })}
                  placeholder="XXXX XXXX XXXX"
                  className="w-full px-3 py-2 bg-white border border-sky-200 rounded-xl text-sm font-mono tracking-widest text-slate-900 focus:outline-none focus:border-sky-500"
                />
                <p className="text-[10px] text-sky-700">
                  Required for unified cross-hospital health record indexing.
                </p>
              </div>

              {/* Doctor Specific Fields */}
              {authMode === 'signup_doctor' && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-emerald-600" />
                    Doctor Credential Verification
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        MCI / State Reg No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.doctorRegNumber}
                        onChange={(e) => setFormData({ ...formData, doctorRegNumber: e.target.value })}
                        placeholder="e.g. MCI-2018-89412"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Specialty *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.doctorSpecialty}
                        onChange={(e) => setFormData({ ...formData, doctorSpecialty: e.target.value })}
                        placeholder="e.g. Cardiologist"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Hospital / Clinic Affiliation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.doctorHospital}
                      onChange={(e) => setFormData({ ...formData, doctorHospital: e.target.value })}
                      placeholder="e.g. Max Super Speciality Hospital"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  authMode === 'signup_doctor'
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
                }`}
              >
                <span>Proceed to Aadhaar Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 3. SIGN UP STEP 2: AADHAAR OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtpAndSignUp} className="space-y-4 text-center py-3">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">Aadhaar OTP Verification</h4>
                <p className="text-xs text-slate-500 mt-1">
                  We've sent a 6-digit verification code to the mobile linked with Aadhaar{' '}
                  <strong className="font-mono text-slate-800">{formData.aadhaar}</strong>.
                </p>
              </div>

              <div className="max-w-xs mx-auto">
                <input
                  type="text"
                  maxLength={6}
                  autoFocus
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full py-3 text-center font-mono text-2xl font-black tracking-widest bg-slate-50 border-2 border-sky-300 rounded-2xl focus:bg-white focus:outline-none focus:border-sky-600"
                />
                <p className="text-[11px] text-slate-400 mt-1">Tip: Enter any 4-6 digits for instant demo validation</p>
              </div>

              <div className="flex gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="px-4 py-2 text-slate-600 text-xs font-semibold hover:bg-slate-100 rounded-xl"
                >
                  ← Back to Details
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  Verify & Create Account
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
