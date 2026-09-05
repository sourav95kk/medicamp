import React from 'react';
import { 
  ChevronLeft, ChevronRight, HelpCircle, Mail, AlertTriangle, 
  BookOpen, FileCheck, ShieldCheck 
} from 'lucide-react';

export default function HelpSupportScreen({ onBack }) {
  const items = [
    { title: 'FAQs', icon: HelpCircle, action: () => alert('Frequently Asked Questions:\n1. How is Aadhaar linked? It provides a unique health ID across clinics.\n2. Is prescription scan free? Yes, AI OCR automatically extracts medicine schedules.') },
    { title: 'Contact Us', icon: Mail, action: () => alert('Contact Support: support@myhealthplus.local | +91 800-425-0000') },
    { title: 'Report an Issue', icon: AlertTriangle, action: () => alert('Issue report form logged. Our technical support team will contact you.') },
    { title: 'App Guide', icon: BookOpen, action: () => alert('App Guide:\n- Add visits under Add Medical Record.\n- Upload prescription photo for auto-population.\n- Switch to Doctor Mode with verified MCI license.') },
    { title: 'Terms & Conditions', icon: FileCheck, action: () => alert('Terms & Conditions: MyHealth+ complies with national electronic health record privacy standards.') },
    { title: 'Privacy Policy', icon: ShieldCheck, action: () => alert('Privacy Policy: We do not sell or share health information with third-party advertisers.') }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header (Screen 21) */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#0F172A]">
          Help & Support
        </h1>
      </div>

      {/* Help Items Grouped Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl divide-y divide-[#F1F5F9] shadow-sm overflow-hidden text-xs">
        {items.map((item, i) => {
          const IconComponent = item.icon;
          return (
            <div
              key={i}
              onClick={item.action}
              className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ios-tap"
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-[#0F172A]">{item.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          );
        })}
      </div>

    </div>
  );
}
