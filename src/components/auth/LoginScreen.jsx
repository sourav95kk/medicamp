import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, Lock, Eye, EyeOff, Loader2, Apple } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoginScreen({ onNavigateRegister, onForgotPassword }) {
  const { signIn, loginAsDemoUser } = useApp();
  const [role, setRole] = useState('patient'); // 'patient' | 'doctor'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const email = identifier.includes('@') ? identifier : `${identifier.replace(/\D/g, '')}@medicamp.local`;
      const res = await signIn(email, password);
      if (res.error) {
        setError(res.error.message || 'Invalid credentials');
      } else {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (targetRole) => {
    loginAsDemoUser(targetRole);
    confetti({ particleCount: 50, spread: 45, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-10 max-w-md mx-auto animate-fade-in select-none">
      
      {/* Top Header */}
      <div className="space-y-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Login to your account
          </p>
        </div>

        {/* Segmented Control [ Patient / Family | Doctor ] */}
        <div className="bg-[#F1F5F9] p-1 rounded-xl flex gap-1">
          <button
            type="button"
            onClick={() => { setRole('patient'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ios-tap ${
              role === 'patient'
                ? 'bg-[#1B64DA] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Patient / Family
          </button>
          <button
            type="button"
            onClick={() => { setRole('doctor'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ios-tap ${
              role === 'doctor'
                ? 'bg-[#1B64DA] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Doctor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Identifier Input */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-slate-400">
              {identifier.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
            </span>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Mobile Number or Email"
              className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-[#1B64DA] focus:outline-none transition-colors"
            />
          </div>

          {/* Password Input */}
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

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-bold text-[#1B64DA] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1B64DA] hover:bg-[#1553B7] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 ios-tap"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>Login</span>
          </button>
        </form>

        {/* Social Continue */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-medium">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleQuickDemo(role)}
              className="flex-1 py-2.5 border border-[#E2E8F0] rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors ios-tap"
            >
              <Apple className="w-5 h-5 text-slate-900" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo(role)}
              className="flex-1 py-2.5 border border-[#E2E8F0] rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors ios-tap"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="text-center pt-6">
        <p className="text-xs text-slate-500 font-medium">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onNavigateRegister}
            className="text-[#1B64DA] font-bold hover:underline"
          >
            Register
          </button>
        </p>
      </div>

    </div>
  );
}
