import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { formatAadhaar, cleanAadhaar, isValidAadhaar } from '../../utils/aadhaarUtils';
import { Users, Plus, ShieldCheck, Heart, AlertCircle, Trash2, Edit3, UserCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FamilyManager() {
  const {
    allMembers,
    user,
    activeMemberId,
    setActiveMemberId,
    addFamilyMember,
    deleteFamilyMember,
    showAddFamilyModal,
    setShowAddFamilyModal
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    relation: 'Spouse',
    age: '',
    gender: 'Female',
    dob: '',
    aadhaar: '',
    phone: '',
    bloodGroup: 'B+',
    allergies: '',
    chronicConditions: ''
  });

  const [formError, setFormError] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const clean = cleanAadhaar(formData.aadhaar);

    if (clean.length !== 12) {
      setFormError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    // Check duplicate Aadhaar
    if (allMembers.some(m => cleanAadhaar(m.aadhaar) === clean)) {
      setFormError('A family member with this Aadhaar number already exists.');
      return;
    }

    addFamilyMember(formData);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFormData({
      name: '',
      relation: 'Spouse',
      age: '',
      gender: 'Female',
      dob: '',
      aadhaar: '',
      phone: '',
      bloodGroup: 'B+',
      allergies: '',
      chronicConditions: ''
    });
    setFormError('');
    setShowAddFamilyModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header card */}
      <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-sky-600/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-sky-100 flex items-center gap-1.5 w-max mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Aadhaar Linked Vault
          </span>
          <h2 className="text-2xl font-black tracking-tight">Family Health Ecosystem</h2>
          <p className="text-xs text-sky-100 mt-1 max-w-md">
            Manage medical records, chronic conditions, and prescriptions for each family member securely linked by their Aadhaar identity.
          </p>
        </div>

        <button
          onClick={() => setShowAddFamilyModal(true)}
          className="px-5 py-2.5 bg-white text-blue-700 font-bold text-xs rounded-2xl shadow-lg hover:bg-sky-50 transition-all flex items-center gap-2 flex-shrink-0 ios-press"
        >
          <Plus className="w-4 h-4" />
          Add Family Member
        </button>
      </div>

      {/* Family Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allMembers.map((member) => {
          const isSelected = activeMemberId === member.id;
          const isSelf = member.id === 'usr_self';

          return (
            <div
              key={member.id}
              onClick={() => setActiveMemberId(member.id)}
              className={`bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer relative shadow-sm hover:shadow-md ${
                isSelected
                  ? 'border-sky-600 ring-2 ring-sky-600/20 bg-sky-50/20'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Active check pill */}
              {isSelected && (
                <div className="absolute top-4 right-4 bg-sky-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <UserCheck className="w-3 h-3" /> Active Profile
                </div>
              )}

              <div className="flex items-start gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base truncate">
                      {member.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md">
                      {member.relation}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5">
                    {member.gender} • {member.age} yrs • Blood Group: <span className="font-bold text-rose-600">{member.bloodGroup}</span>
                  </p>

                  {/* Aadhaar Badge */}
                  <div className="mt-3">
                    <AadhaarBadge aadhaar={member.aadhaar} />
                  </div>
                </div>
              </div>

              {/* Health Conditions & Allergies */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Chronic Conditions
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.chronicConditions?.length > 0 ? (
                      member.chronicConditions.map((cond, i) => (
                        <span key={i} className="text-[11px] font-semibold text-slate-800">
                          {cond}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-400">None</span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Allergies
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.allergies?.length > 0 ? (
                      member.allergies.map((allg, i) => (
                        <span key={i} className="text-[11px] font-semibold text-rose-700">
                          {allg}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-400">None</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMemberId(member.id);
                  }}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  {isSelected ? 'Viewing Records' : 'Switch to this Member →'}
                </button>

                {!isSelf && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Remove ${member.name} from family profile?`)) {
                        deleteFamilyMember(member.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                    title="Remove family member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Family Member Modal */}
      {showAddFamilyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add Family Member</h3>
                  <p className="text-[11px] text-slate-500">Link with individual Aadhaar identity</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddFamilyModal(false)}
                className="p-1.5 rounded-full hover:bg-white text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relationship *
                  </label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child (Son/Daughter)">Child (Son/Daughter)</option>
                    <option value="Parent (Father/Mother)">Parent (Father/Mother)</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Other Dependent">Other Dependent</option>
                  </select>
                </div>
              </div>

              {/* Aadhaar Input */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4">
                <label className="block text-xs font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  12-Digit Aadhaar Number *
                </label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: formatAadhaar(e.target.value) })}
                  placeholder="XXXX XXXX XXXX"
                  className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-xl text-sm font-mono tracking-widest text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-blue-700 mt-1">
                  Doctors can use this unique Aadhaar ID to search medical records during consultations.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g. 32"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Known Allergies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="e.g. Penicillin, Peanuts, Dust"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chronic Health Conditions (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.chronicConditions}
                  onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                  placeholder="e.g. Asthma, Diabetes, Thyroid"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={() => setShowAddFamilyModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-600/20"
                >
                  Link & Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
