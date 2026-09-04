import React from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { formatAadhaar } from '../../utils/aadhaarUtils';
import { ShieldAlert, Heart, Phone, AlertTriangle, X, QrCode, Share2, Printer } from 'lucide-react';

export default function EmergencyHealthCard() {
  const { activeMember, showEmergencyCardModal, setShowEmergencyCardModal } = useApp();

  if (!showEmergencyCardModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card Header (Apple Wallet / Medical ID Style) */}
        <div className="bg-gradient-to-br from-rose-600 via-red-600 to-amber-600 p-6 text-white relative">
          <button
            onClick={() => setShowEmergencyCardModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-rose-100">
              Emergency Medical ID
            </span>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={activeMember.avatar}
              alt={activeMember.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md"
            />
            <div>
              <h3 className="text-2xl font-black">{activeMember.name}</h3>
              <p className="text-xs text-rose-100 font-semibold">
                {activeMember.gender} • {activeMember.age} Years • DOB: {activeMember.dob || '1992-04-15'}
              </p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          
          {/* Aadhaar Badge Full */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Universal Health Identity
              </span>
              <span className="font-mono text-sm font-extrabold text-slate-900 tracking-wider">
                {formatAadhaar(activeMember.aadhaar)}
              </span>
            </div>
            <div className="px-2.5 py-1 bg-blue-100 text-blue-800 text-[10px] font-extrabold rounded-full">
              VERIFIED
            </div>
          </div>

          {/* Blood Group & Primary Condition */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
              <span className="text-[10px] uppercase font-bold text-rose-600 block">
                Blood Type
              </span>
              <span className="text-xl font-black text-rose-700">
                {activeMember.bloodGroup || 'O+'}
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">
                Relationship
              </span>
              <span className="text-sm font-extrabold text-amber-900">
                {activeMember.relation || 'Self'}
              </span>
            </div>
          </div>

          {/* Critical Allergies */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Critical Allergies
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeMember.allergies && activeMember.allergies.length > 0 ? (
                activeMember.allergies.map((a, i) => (
                  <span key={i} className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-bold rounded-lg">
                    {a}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">No known drug allergies</span>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Emergency Contact
              </span>
              <p className="text-xs font-bold text-slate-900">
                {activeMember.emergencyContact?.name || 'Primary Next of Kin'}
              </p>
              <p className="text-xs text-slate-600 font-mono">
                {activeMember.emergencyContact?.phone || activeMember.phone}
              </p>
            </div>
            <a
              href={`tel:${activeMember.emergencyContact?.phone || activeMember.phone}`}
              className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* QR Simulation for Paramedics */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <QrCode className="w-6 h-6 text-slate-700" />
              <span>Scan for Paramedic & ER Access</span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
