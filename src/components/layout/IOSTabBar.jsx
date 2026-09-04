import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, FileText, Pill, Users, Search, Clock, Stethoscope, Plus } from 'lucide-react';

export default function IOSTabBar() {
  const { currentMode, activeTab, setActiveTab } = useApp();

  if (currentMode === 'doctor') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 ios-tab-blur border-t border-black/[0.08] pb-safe">
        <div className="max-w-md mx-auto h-[50px] flex items-center justify-around px-2">
          
          <button
            type="button"
            onClick={() => setActiveTab('doctor_search')}
            className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
              activeTab === 'doctor_search' ? 'text-emerald-600' : 'text-[#8E8E93]'
            }`}
          >
            <Search className={`w-5 h-5 ${activeTab === 'doctor_search' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'doctor_search' ? 'font-semibold' : 'font-normal'}`}>
              Search
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('doctor_recent')}
            className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
              activeTab === 'doctor_recent' ? 'text-emerald-600' : 'text-[#8E8E93]'
            }`}
          >
            <Clock className={`w-5 h-5 ${activeTab === 'doctor_recent' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'doctor_recent' ? 'font-semibold' : 'font-normal'}`}>
              History
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('doctor_profile')}
            className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
              activeTab === 'doctor_profile' ? 'text-emerald-600' : 'text-[#8E8E93]'
            }`}
          >
            <Stethoscope className={`w-5 h-5 ${activeTab === 'doctor_profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${activeTab === 'doctor_profile' ? 'font-semibold' : 'font-normal'}`}>
              Doctor ID
            </span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 ios-tab-blur border-t border-black/[0.08] pb-safe">
      <div className="max-w-md mx-auto h-[50px] flex items-center justify-around px-2">
        
        {/* Tab 1: Summary (Apple Health Style) */}
        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
            activeTab === 'timeline' ? 'text-blue-600' : 'text-[#8E8E93]'
          }`}
        >
          <Heart className={`w-5 h-5 ${activeTab === 'timeline' ? 'fill-blue-600 stroke-blue-600' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 ${activeTab === 'timeline' ? 'font-semibold' : 'font-normal'}`}>
            Summary
          </span>
        </button>

        {/* Tab 2: Prescriptions */}
        <button
          type="button"
          onClick={() => setActiveTab('records')}
          className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
            activeTab === 'records' ? 'text-blue-600' : 'text-[#8E8E93]'
          }`}
        >
          <FileText className={`w-5 h-5 ${activeTab === 'records' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 ${activeTab === 'records' ? 'font-semibold' : 'font-normal'}`}>
            Prescriptions
          </span>
        </button>

        {/* Tab 3: Medications */}
        <button
          type="button"
          onClick={() => setActiveTab('medications')}
          className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
            activeTab === 'medications' ? 'text-blue-600' : 'text-[#8E8E93]'
          }`}
        >
          <Pill className={`w-5 h-5 ${activeTab === 'medications' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 ${activeTab === 'medications' ? 'font-semibold' : 'font-normal'}`}>
            Medications
          </span>
        </button>

        {/* Tab 4: Family */}
        <button
          type="button"
          onClick={() => setActiveTab('family')}
          className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
            activeTab === 'family' ? 'text-blue-600' : 'text-[#8E8E93]'
          }`}
        >
          <Users className={`w-5 h-5 ${activeTab === 'family' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 ${activeTab === 'family' ? 'font-semibold' : 'font-normal'}`}>
            Family
          </span>
        </button>
      </div>
    </nav>
  );
}
