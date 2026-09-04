import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AadhaarBadge from '../common/AadhaarBadge';
import { formatAadhaar, cleanAadhaar } from '../../utils/aadhaarUtils';
import { Users, Plus, ShieldCheck, Heart, AlertCircle, Trash2, Edit3, UserCheck, X, ChevronRight } from 'lucide-react';
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

    if (allMembers.some(m => cleanAadhaar(m.aadhaar) === clean)) {
      setFormError('A family member with this Aadhaar number already exists.');
      return;
    }

    addFamilyMember(formData);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

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
    <div className="space-y-5 animate-fade-in pb-12 max-w-xl mx-auto">
      
      {/* Header Info */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8E8E93]">
          Linked Family Profiles ({allMembers.length})
        </h2>
        <button
          onClick={() => setShowAddFamilyModal(true)}
          className="text-xs text-blue-600 font-semibold flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Member
        </button>
      </div>

      {/* Family Inset Grouped Table */}
      <div className="ios-grouped-card overflow-hidden divide-y divide-black/[0.06]">
        {allMembers.map((member) => {
          const isSelected = activeMemberId === member.id;
          const isSelf = member.id === 'usr_self';

          return (
            <div
              key={member.id}
              onClick={() => setActiveMemberId(member.id)}
              className={`p-4 flex items-center justify-between cursor-pointer transition-colors ios-tap ${
                isSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border border-black/10 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-[#000000] truncate">
                      {member.name}
                    </p>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E5E5EA] text-[#1C1C1E]">
                      {member.relation}
                    </span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#8E8E93] mt-0.5">
                    {member.gender} • {member.age} yrs • Blood: <strong className="text-red-500">{member.bloodGroup}</strong>
                  </p>

                  <div className="mt-1.5">
                    <AadhaarBadge aadhaar={member.aadhaar} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {!isSelf && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Remove ${member.name}?`)) {
                        deleteFamilyMember(member.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Family Member Modal */}
      {showAddFamilyModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

            <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Add Family Member</h3>
                <p className="text-xs text-[#8E8E93]">Link with 12-digit Aadhaar</p>
              </div>
              <button
                onClick={() => setShowAddFamilyModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {formError && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:outline-none"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child (Son/Daughter)">Child</option>
                    <option value="Parent (Father/Mother)">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Dependent">Dependent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="32"
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">12-Digit Aadhaar Number *</label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: formatAadhaar(e.target.value) })}
                  placeholder="XXXX XXXX XXXX"
                  className="w-full px-3 py-2.5 bg-[#F2F2F7] border border-transparent rounded-xl text-sm font-mono tracking-widest focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-transparent rounded-xl text-sm"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddFamilyModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
