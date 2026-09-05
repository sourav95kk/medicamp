import React, { useState } from 'react';
import { User, Phone, Lock, Eye, EyeOff, ChevronLeft, CheckSquare, Square } from 'lucide-react';

export default function RegisterScreen({ onBack, onNavigateLogin, onProceedAadhaar }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !phone || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreed) {
      setError('Please agree to the Terms & Privacy Policy.');
      return;
    }

    onProceedAadhaar({ fullName, phone, password });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-8 max-w-md mx-auto animate-fade-in select-none">
      
      {/* Top Header with Back Button */}
      <div className="space-y-6 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            For you and your family's health records
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-3.5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            />
          </div>

          {/* Mobile Number */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-slate-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile Number"
              className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-slate-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-slate-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            />
          </div>

          {/* Terms Agreement */}
          <div 
            onClick={() => setAgreed(!agreed)}
            className="flex items-center gap-2.5 pt-1 cursor-pointer"
          >
            {agreed ? (
              <div className="w-4 h-4 rounded bg-[#1B64DA] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 stroke-white stroke-[3]" viewBox="0 0 24 24" fill="none">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            ) : (
              <div className="w-4 h-4 rounded border border-slate-300 bg-white flex-shrink-0" />
            )}
            <span className="text-[11px] text-slate-600 font-medium">
              I agree to the <span className="text-[#1B64DA] font-bold">Terms & Privacy Policy</span>
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all ios-tap"
          >
            Register
          </button>
        </form>
      </div>

      {/* Footer link */}
      <div className="text-center pt-6">
        <p className="text-xs text-slate-500 font-medium">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-[#1B64DA] font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </div>

    </div>
  );
}
