import React, { useState } from 'react';
import { formatAadhaar, maskAadhaar } from '../../utils/aadhaarUtils';
import { Eye, EyeOff, Copy, Check, ShieldCheck } from 'lucide-react';

export default function AadhaarBadge({ aadhaar, showFullByDefault = false, className = '' }) {
  const [showFull, setShowFull] = useState(showFullByDefault);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!aadhaar) return;
    navigator.clipboard.writeText(aadhaar.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleVisibility = (e) => {
    e.stopPropagation();
    setShowFull(!showFull);
  };

  const formattedDisplay = showFull ? formatAadhaar(aadhaar) : maskAadhaar(aadhaar);

  return (
    <div className={`inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 rounded-full px-3 py-1 text-xs font-medium transition-all ${className}`}>
      <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Aadhaar</span>
      </div>
      <span className="font-mono tracking-wider font-semibold text-slate-900">
        {formattedDisplay}
      </span>
      
      <div className="flex items-center gap-1 border-l border-slate-300 pl-1.5 ml-0.5">
        <button
          type="button"
          onClick={toggleVisibility}
          className="text-slate-500 hover:text-slate-900 p-0.5 rounded transition-colors"
          title={showFull ? "Mask Aadhaar" : "Show full Aadhaar"}
        >
          {showFull ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="text-slate-500 hover:text-blue-600 p-0.5 rounded transition-colors"
          title="Copy Aadhaar Number"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}
