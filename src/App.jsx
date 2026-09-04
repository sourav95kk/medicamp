import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import IOSHeader from './components/layout/IOSHeader';
import IOSTabBar from './components/layout/IOSTabBar';

// Patient Views
import PatientDashboard from './components/patient/PatientDashboard';
import PrescriptionsGallery from './components/patient/PrescriptionsGallery';
import MedicationsTracker from './components/patient/MedicationsTracker';
import FamilyManager from './components/patient/FamilyManager';
import AddRecordModal from './components/patient/AddRecordModal';
import EmergencyHealthCard from './components/patient/EmergencyHealthCard';
import RecordDetailModal from './components/patient/RecordDetailModal';

// Doctor Views
import DoctorPortal from './components/doctor/DoctorPortal';
import DoctorConsultationsHistory from './components/doctor/DoctorConsultationsHistory';
import DoctorCredentialsView from './components/doctor/DoctorCredentialsView';
import DoctorRegisterModal from './components/doctor/DoctorRegisterModal';

// Common & Auth
import RoleSwitcherModal from './components/common/RoleSwitcherModal';
import AuthModal from './components/auth/AuthModal';
import AuthScreen from './components/auth/AuthScreen';
import InstallAppModal from './components/common/InstallAppModal';

function MainAppContent() {
  const { isAuthenticated, currentMode, activeTab, showInstallModal, setShowInstallModal } = useApp();

  // If user is not logged in, show default full-screen Login Screen on app launch
  if (!isAuthenticated) {
    return (
      <>
        <AuthScreen />
        <InstallAppModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
      </>
    );
  }

  // Once authenticated, show full native iOS app
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* iOS Header */}
      <IOSHeader />

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 pt-4 pb-24">
        {currentMode === 'patient' ? (
          <>
            {activeTab === 'timeline' && <PatientDashboard />}
            {activeTab === 'records' && <PrescriptionsGallery />}
            {activeTab === 'medications' && <MedicationsTracker />}
            {activeTab === 'family' && <FamilyManager />}
          </>
        ) : (
          <>
            {activeTab === 'doctor_search' && <DoctorPortal />}
            {activeTab === 'doctor_recent' && <DoctorConsultationsHistory />}
            {activeTab === 'doctor_profile' && <DoctorCredentialsView />}
          </>
        )}
      </main>

      {/* iOS Bottom Navigation Bar */}
      <IOSTabBar />

      {/* Global Modals */}
      <InstallAppModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
      <AuthModal />
      <RoleSwitcherModal />
      <DoctorRegisterModal />
      <AddRecordModal />
      <EmergencyHealthCard />
      <RecordDetailModal />
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
