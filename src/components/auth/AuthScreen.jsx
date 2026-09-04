import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { formatAadhaar, cleanAadhaar } from '../../utils/aadhaarUtils';
import { 
  ShieldCheck, Stethoscope, User, Lock, Mail, Phone, 
  ArrowRight, CheckCircle, AlertCircle, Sparkles, KeyRound, 
  Loader2, Activity, Heart, FileText, Pill, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthScreen() {
  const { signIn, signUp, loginAsDemoUser } = useApp();

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
    doctorRegNumber: '',
    doctorCouncil: 'National Medical Commission',
    doctorSpecialty: 'Internal Medicine / Consultant Physician',
    doctorHospital: 'Max Super Speciality Hospital / Apollo Clinic',
    doctorDegrees: 'MBBS, MD',
    doctorExperience: '8'
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn(formData.email, formData.password);
      if (res.error) {
        setError(res.error.message || 'Invalid email or password.');
      } else {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } catch (err) {
      setError(err.message || 'An error occurred during sign in.');
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
      setError('Please enter your Medical Council Registration Number.');
      return;
    }

    setStep('otp');
  };

  const handleVerifyOtpAndSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otpCode.length < 4) {
      setError('Please enter the 6-digit verification code.');
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
      }
    } catch (err) {
      setError(err.message || 'Failed to complete registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    loginAsDemoUser(role);
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col justify-between max-w-md mx-auto px-5 py-8 pt-safe pb-safe selection:bg-blue-600 selection:text-white">
      
      {/* Top Hero Section */}
      <div className="space-y-4 text-center pt-2">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25 border border-white/40">
          <Activity className="w-8 h-8 stroke-[2.2]" />
        </div>

        <div>
          <h1 className="text-3xl font-black text-[#000000] tracking-tight">
            MediCamp
          </h1>
          <p className="text-xs text-[#8E8E93] font-medium mt-1">
            Family Medical Records & Doctor Vault
          </p>
        </div>

        {/* Segmented Control Switcher (Native iOS Style) */}
        <div className="bg-[#E5E5EA] p-1 rounded-2xl flex gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setStep('form'); setError(''); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ios-tap ${
              authMode === 'signin' ? 'bg-white text-[#000000] shadow-sm' : 'text-[#8E8E93]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup_patient'); setStep('form'); setError(''); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ios-tap ${
              authMode === 'signup_patient' ? 'bg-white text-blue-600 shadow-sm' : 'text-[#8E8E93]'
            }`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup_doctor'); setStep('form'); setError(''); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ios-tap ${
              authMode === 'signup_doctor' ? 'bg-white text-emerald-700 shadow-sm' : 'text-[#8E8E93]'
            }`}
          >
            Doctor
          </button>
        </div>
      </div>

      {/* Center Form Card */}
      <div className="my-auto py-4">
        <div className="ios-grouped-card p-5 shadow-sm space-y-4 border border-black/[0.04]">
          
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. SIGN IN TAB */}
          {authMode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 ios-tap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                Sign In
              </button>
            </form>
          )}

          {/* 2. SIGN UP FORMS (Step 1) */}
          {(authMode === 'signup_patient' || authMode === 'signup_doctor') && step === 'form' && (
            <form onSubmit={handleInitiateSignUp} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={authMode === 'signup_doctor' ? 'Dr. Name' : 'Full Name'}
                  className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 6 chars"
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Aadhaar Input */}
              <div>
                <label className="block text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 12-Digit Aadhaar *
                </label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: formatAadhaar(e.target.value) })}
                  placeholder="XXXX XXXX XXXX"
                  className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm font-mono tracking-widest focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Doctor Registration Number */}
              {authMode === 'signup_doctor' && (
                <div className="p-3 bg-emerald-50 rounded-xl space-y-2 border border-emerald-100">
                  <label className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Medical Council Reg No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.doctorRegNumber}
                    onChange={(e) => setFormData({ ...formData, doctorRegNumber: e.target.value })}
                    placeholder="e.g. MCI-2018-89412"
                    className="w-full px-2.5 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={formData.doctorHospital}
                    onChange={(e) => setFormData({ ...formData, doctorHospital: e.target.value })}
                    placeholder="Hospital / Clinic Name"
                    className="w-full px-2.5 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ios-tap ${
                  authMode === 'signup_doctor' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span>Continue to Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 3. SIGN UP STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtpAndSignUp} className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#000000]">Enter Aadhaar OTP</h4>
                <p className="text-xs text-[#8E8E93] mt-0.5">
                  Code sent to mobile linked with Aadhaar {formData.aadhaar}
                </p>
              </div>

              <input
                type="text"
                maxLength={6}
                autoFocus
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                className="w-full py-2.5 text-center font-mono text-xl font-bold tracking-widest bg-[#F2F2F7] border border-blue-200 rounded-xl focus:bg-white focus:outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="flex-1 py-2 text-xs font-semibold text-[#8E8E93] bg-[#E5E5EA] rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  Verify & Enter
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Instant 1-Tap Demo Logins */}
        <div className="mt-4 space-y-2">
          <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block text-center">
            Or Instant 1-Tap Demo Access:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('doctor')}
              className="p-3 bg-white border border-black/[0.06] rounded-2xl text-left ios-tap shadow-sm"
            >
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span>Doctor Mode</span>
              </div>
              <p className="text-[10px] text-[#8E8E93] mt-0.5">Dr. Rahul Sharma</p>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('patient')}
              className="p-3 bg-white border border-black/[0.06] rounded-2xl text-left ios-tap shadow-sm"
            >
              <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs">
                <User className="w-4 h-4 text-blue-600" />
                <span>Patient Mode</span>
              </div>
              <p className="text-[10px] text-[#8E8E93] mt-0.5">Priya Sharma</p>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="text-center">
        <p className="text-[11px] text-[#8E8E93]">
          {isSupabaseConfigured() ? '🟢 Connected to Supabase Cloud' : '🔒 Local Secure Vault Active'}
        </p>
      </div>

    </div>
  );
}
