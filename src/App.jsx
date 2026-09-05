import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Auth & Onboarding Screens (Row 1)
import SplashScreen from './components/auth/SplashScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import LinkAadhaarScreen from './components/auth/LinkAadhaarScreen';
import ChooseRoleScreen from './components/auth/ChooseRoleScreen';
import DoctorVerificationScreen from './components/auth/DoctorVerificationScreen';

// Patient Screens (Row 2 & 3)
import PatientHome from './components/patient/PatientHome';
import FamilyMembersScreen from './components/patient/FamilyMembersScreen';
import AddRecordFlow from './components/patient/AddRecordFlow';
import MedicalHistoryScreen from './components/patient/MedicalHistoryScreen';
import RecordDetailsScreen from './components/patient/RecordDetailsScreen';
import MedicationsTracker from './components/patient/MedicationsTracker';

// Doctor Screens (Row 2 & 3)
import DoctorHome from './components/doctor/DoctorHome';
import PatientDossierScreen from './components/doctor/PatientDossierScreen';

// Settings & More Screens (Row 3)
import SettingsScreen from './components/settings/SettingsScreen';
import MyProfileScreen from './components/settings/MyProfileScreen';
import NotificationsScreen from './components/settings/NotificationsScreen';
import DataPrivacyScreen from './components/settings/DataPrivacyScreen';
import HelpSupportScreen from './components/settings/HelpSupportScreen';

// Modals & Navigation
import SwitchModeModal from './components/common/SwitchModeModal';
import { Home, Clock, Users, Menu, Stethoscope, Search, UserCheck } from 'lucide-react';

function MainAppContent() {
  const { 
    isAuthenticated, 
    currentMode, 
    switchRole, 
    user, 
    records 
  } = useApp();

  // Auth Flow Navigation State
  const [authStage, setAuthStage] = useState('splash'); // 'splash' | 'login' | 'register' | 'link_aadhaar' | 'choose_role' | 'doctor_verification'
  const [pendingSignUpData, setPendingSignUpData] = useState(null);

  // Authenticated Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'history' | 'family' | 'more' (for patient) | 'home' | 'patients' | 'more' (for doctor)
  const [activeSubScreen, setActiveSubScreen] = useState(null); // 'add_record' | 'record_details' | 'patient_dossier' | 'profile' | 'notifications' | 'privacy' | 'help'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedDoctorPatient, setSelectedDoctorPatient] = useState(null);

  // Global Switch Mode Modal (Screen 6)
  const [showSwitchModeModal, setShowSwitchModeModal] = useState(false);

  // =========================================================================
  // 1. UNAUTHENTICATED / ONBOARDING FLOW
  // =========================================================================
  if (!isAuthenticated) {
    if (authStage === 'splash') {
      return <SplashScreen onStart={() => setAuthStage('login')} />;
    }

    if (authStage === 'login') {
      return (
        <LoginScreen
          onNavigateRegister={() => setAuthStage('register')}
          onForgotPassword={() => alert('Password reset link sent to your registered email.')}
        />
      );
    }

    if (authStage === 'register') {
      return (
        <RegisterScreen
          onBack={() => setAuthStage('login')}
          onNavigateLogin={() => setAuthStage('login')}
          onProceedAadhaar={(data) => {
            setPendingSignUpData(data);
            setAuthStage('link_aadhaar');
          }}
        />
      );
    }

    if (authStage === 'link_aadhaar') {
      return (
        <LinkAadhaarScreen
          onBack={() => setAuthStage('register')}
          onVerifyAadhaar={(aadhaar) => {
            setPendingSignUpData(prev => ({ ...prev, aadhaar }));
            setAuthStage('choose_role');
          }}
        />
      );
    }

    if (authStage === 'choose_role') {
      return (
        <ChooseRoleScreen
          onBack={() => setAuthStage('link_aadhaar')}
          onSelectRole={(role) => {
            if (role === 'doctor') {
              setAuthStage('doctor_verification');
            } else {
              setAuthStage('login');
              alert('Registration complete! Please log in to your account.');
            }
          }}
        />
      );
    }

    if (authStage === 'doctor_verification') {
      return (
        <DoctorVerificationScreen
          onBack={() => setAuthStage('choose_role')}
          onVerificationSuccess={() => {
            setAuthStage('login');
            alert('Doctor credentials submitted for verification! Please log in.');
          }}
        />
      );
    }
  }

  // =========================================================================
  // 2. AUTHENTICATED FLOW (PATIENT / DOCTOR)
  // =========================================================================
  
  // Render Sub-screens when active
  if (activeSubScreen === 'add_record') {
    return (
      <AddRecordFlow
        onBack={() => setActiveSubScreen(null)}
        onComplete={() => setActiveSubScreen(null)}
      />
    );
  }

  if (activeSubScreen === 'record_details') {
    return (
      <RecordDetailsScreen
        record={selectedRecord || records[0]}
        onBack={() => setActiveSubScreen(null)}
        onEdit={() => setActiveSubScreen('add_record')}
      />
    );
  }

  if (activeSubScreen === 'patient_dossier') {
    return (
      <PatientDossierScreen
        patient={selectedDoctorPatient}
        onBack={() => setActiveSubScreen(null)}
        onAddConsultation={() => setActiveSubScreen('add_record')}
      />
    );
  }

  if (activeSubScreen === 'profile') {
    return (
      <MyProfileScreen
        onBack={() => setActiveSubScreen(null)}
        onEdit={() => alert('Profile edit mode enabled.')}
      />
    );
  }

  if (activeSubScreen === 'notifications') {
    return (
      <NotificationsScreen
        onBack={() => setActiveSubScreen(null)}
      />
    );
  }

  if (activeSubScreen === 'privacy') {
    return (
      <DataPrivacyScreen
        onBack={() => setActiveSubScreen(null)}
      />
    );
  }

  if (activeSubScreen === 'help') {
    return (
      <HelpSupportScreen
        onBack={() => setActiveSubScreen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#1B64DA] selection:text-white">
      
      {/* Main Tab Screen Area */}
      <main className="flex-1 max-w-md w-full mx-auto px-5 pt-4 pb-20">
        
        {/* PATIENT MODE TABS */}
        {currentMode === 'patient' && (
          <>
            {activeTab === 'home' && (
              <PatientHome
                onNavigateAddRecord={() => setActiveSubScreen('add_record')}
                onNavigateHistory={() => setActiveTab('history')}
                onNavigateFamily={() => setActiveTab('family')}
                onNavigateNotifications={() => setActiveSubScreen('notifications')}
                onNavigateReminders={() => setActiveTab('history')}
                onNavigateReports={() => setActiveTab('history')}
              />
            )}

            {activeTab === 'history' && (
              <MedicalHistoryScreen
                onSelectRecord={(rec) => {
                  setSelectedRecord(rec);
                  setActiveSubScreen('record_details');
                }}
              />
            )}

            {activeTab === 'family' && (
              <FamilyMembersScreen
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'more' && (
              <SettingsScreen
                onBack={() => setActiveTab('home')}
                onNavigateProfile={() => setActiveSubScreen('profile')}
                onNavigateNotifications={() => setActiveSubScreen('notifications')}
                onNavigatePrivacy={() => setActiveSubScreen('privacy')}
                onNavigateHelp={() => setActiveSubScreen('help')}
                onOpenSwitchMode={() => setShowSwitchModeModal(true)}
              />
            )}
          </>
        )}

        {/* DOCTOR MODE TABS */}
        {currentMode === 'doctor' && (
          <>
            {activeTab === 'home' && (
              <DoctorHome
                onSelectPatient={(patient) => {
                  setSelectedDoctorPatient(patient);
                  setActiveSubScreen('patient_dossier');
                }}
                onNavigateProfile={() => setActiveSubScreen('profile')}
                onNavigateSettings={() => setActiveTab('more')}
                onNavigateHelp={() => setActiveSubScreen('help')}
                onNavigateNotifications={() => setActiveSubScreen('notifications')}
              />
            )}

            {activeTab === 'patients' && (
              <DoctorHome
                onSelectPatient={(patient) => {
                  setSelectedDoctorPatient(patient);
                  setActiveSubScreen('patient_dossier');
                }}
                onNavigateProfile={() => setActiveSubScreen('profile')}
                onNavigateSettings={() => setActiveTab('more')}
                onNavigateHelp={() => setActiveSubScreen('help')}
                onNavigateNotifications={() => setActiveSubScreen('notifications')}
              />
            )}

            {activeTab === 'more' && (
              <SettingsScreen
                onBack={() => setActiveTab('home')}
                onNavigateProfile={() => setActiveSubScreen('profile')}
                onNavigateNotifications={() => setActiveSubScreen('notifications')}
                onNavigatePrivacy={() => setActiveSubScreen('privacy')}
                onNavigateHelp={() => setActiveSubScreen('help')}
                onOpenSwitchMode={() => setShowSwitchModeModal(true)}
              />
            )}
          </>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 3. NATIVE iOS BOTTOM TAB BAR (Screens 8, 9, 13, 14) */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 pb-safe shadow-sm">
        <div className="max-w-md mx-auto h-[54px] flex items-center justify-around px-4">
          
          {currentMode === 'patient' ? (
            <>
              {/* Home Tab */}
              <button
                type="button"
                onClick={() => { setActiveTab('home'); setActiveSubScreen(null); }}
                className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
                  activeTab === 'home' && !activeSubScreen ? 'text-[#1B64DA]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Home className={`w-5 h-5 ${activeTab === 'home' && !activeSubScreen ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] mt-0.5 ${activeTab === 'home' && !activeSubScreen ? 'font-bold' : 'font-medium'}`}>
                  Home
                </span>
              </button>

              {/* History Tab */}
              <button
                type="button"
                onClick={() => { setActiveTab('history'); setActiveSubScreen(null); }}
                className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
                  activeTab === 'history' && !activeSubScreen ? 'text-[#1B64DA]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Clock className={`w-5 h-5 ${activeTab === 'history' && !activeSubScreen ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] mt-0.5 ${activeTab === 'history' && !activeSubScreen ? 'font-bold' : 'font-medium'}`}>
                  History
                </span>
              </button>

              {/* Family Tab */}
              <button
                type="button"
                onClick={() => { setActiveTab('family'); setActiveSubScreen(null); }}
                className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
                  activeTab === 'family' && !activeSubScreen ? 'text-[#1B64DA]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Users className={`w-5 h-5 ${activeTab === 'family' && !activeSubScreen ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] mt-0.5 ${activeTab === 'family' && !activeSubScreen ? 'font-bold' : 'font-medium'}`}>
                  Family
                </span>
              </button>

              {/* More / Settings Tab */}
              <button
                type="button"
                onClick={() => { setActiveTab('more'); setActiveSubScreen(null); }}
                className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
                  activeTab === 'more' && !activeSubScreen ? 'text-[#1B64DA]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Menu className={`w-5 h-5 ${activeTab === 'more' && !activeSubScreen ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] mt-0.5 ${activeTab === 'more' && !activeSubScreen ? 'font-bold' : 'font-medium'}`}>
                  More
                </span>
              </button>
            </>
          ) : (
            <>
              {/* Doctor Home Tab */}
              <button
                type="button"
                onClick={() => { setActiveTab('home'); setActiveSubScreen(null); }}
                className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
                  activeTab === 'home' && !activeSubScreen ? 'text-[#1B64DA]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Home className={`w-5 h-5 ${activeTab === 'home' && !activeSubScreen ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] mt-0.5 ${activeTab === 'home' && !activeSubScreen ? 'font-bold' : 'font-medium'}`}>
                  Home
                </span>
              </button>

              {/* Patients Search Tab */}
              <button
                type="button"
                onClick={() => { setActiveTab('patients'); setActiveSubScreen(null); }}
                className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
                  activeTab === 'patients' && !activeSubScreen ? 'text-[#1B64DA]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Users className={`w-5 h-5 ${activeTab === 'patients' && !activeSubScreen ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] mt-0.5 ${activeTab === 'patients' && !activeSubScreen ? 'font-bold' : 'font-medium'}`}>
                  Patients
                </span>
              </button>

              {/* More Settings Tab */}
              <button
                type="button"
                onClick={() => { setActiveTab('more'); setActiveSubScreen(null); }}
                className={`flex-1 flex flex-col items-center justify-center py-1 ios-tap ${
                  activeTab === 'more' && !activeSubScreen ? 'text-[#1B64DA]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Menu className={`w-5 h-5 ${activeTab === 'more' && !activeSubScreen ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] mt-0.5 ${activeTab === 'more' && !activeSubScreen ? 'font-bold' : 'font-medium'}`}>
                  More
                </span>
              </button>
            </>
          )}

        </div>
      </nav>

      {/* Switch Mode Bottom Sheet Modal (Screen 6) */}
      <SwitchModeModal
        isOpen={showSwitchModeModal}
        onClose={() => setShowSwitchModeModal(false)}
        onRequireDoctorVerification={() => {
          setActiveSubScreen(null);
          setAuthStage('doctor_verification');
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
