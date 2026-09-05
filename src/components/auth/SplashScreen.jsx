import React from 'react';
import MyHealthLogo from '../common/MyHealthLogo';
import { ArrowRight } from 'lucide-react';

export default function SplashScreen({ onStart }) {
  return (
    <div 
      onClick={onStart}
      className="min-h-screen bg-white flex flex-col justify-between items-center px-6 py-12 cursor-pointer select-none animate-fade-in"
    >
      {/* Top spacer */}
      <div className="w-full h-10" />

      {/* Center Logo & Brand Tagline */}
      <div className="flex flex-col items-center">
        <MyHealthLogo size="large" showTagline={true} />
        
        <button
          onClick={(e) => { e.stopPropagation(); onStart(); }}
          className="mt-8 px-6 py-2.5 bg-[#1B64DA] text-white text-xs font-bold rounded-full shadow-md shadow-blue-500/20 flex items-center gap-2 hover:bg-blue-700 transition-all ios-tap"
        >
          <span>Get Started</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Footer Tagline */}
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          Secure • Personal • For Family
        </p>
      </div>
    </div>
  );
}
