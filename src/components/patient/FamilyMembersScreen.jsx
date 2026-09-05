import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Plus, Trash2, X, AlertCircle } from 'lucide-react';
import { formatAadhaar, cleanAadhaar } from '../../utils/aadhaarUtils';
import confetti from 'canvas-confetti';

export default function FamilyMembersScreen({ onBack }) {
  const { allMembers, addFamilyMember, deleteFamilyMember, setActiveMemberId } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Member Form
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
  const [error, setError] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    const clean = cleanAadhaar(formData.aadhaar);
    if (clean.length !== 12) {
      setError('Please enter a 12-digit Aadhaar number.');
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
    setError('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-md mx-auto select-none">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors ios-tap"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#0F172A]">
          My Family Members
        </h1>
      </div>

      {/* Family Members List */}
      <div className="space-y-3">
        {allMembers.map((member) => {
          const isSelf = member.relation === 'Self';
          const maskedAadhaar = member.maskedAadhaar || `**** ${member.aadhaar?.slice(-4)}`;

          return (
            <div
              key={member.id}
              onClick={() => setActiveMemberId(member.id)}
              className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer shadow-sm ios-tap"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-100 flex-shrink-0"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-mono">
                    Aadhaar: {maskedAadhaar}
                  </p>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {member.relation}
                  </span>
                </div>
              </div>

              {!isSelf && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Remove ${member.name}?`)) {
                      deleteFamilyMember(member.id);
                    }
                  }}
                  className="p-2 text-slate-300 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Family Member Button */}
      <div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-3.5 border-2 border-dashed border-blue-300 text-[#1B64DA] bg-blue-50/40 hover:bg-blue-50 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all ios-tap"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1" />

            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Add Family Member</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-6 space-y-4 overflow-y-auto flex-1">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anita Kumar"
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none focus:border-[#1B64DA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="30"
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">12-Digit Aadhaar *</label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: formatAadhaar(e.target.value) })}
                  placeholder="0000 0000 0000"
                  className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-mono tracking-widest focus:outline-none focus:border-[#1B64DA]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1B64DA] text-white text-xs font-bold rounded-xl shadow-md"
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
