import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { INITIAL_USER, INITIAL_FAMILY, INITIAL_RECORDS } from '../data/mockData';
import { cleanAadhaar } from '../utils/aadhaarUtils';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Session & Auth state
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('medicamp_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [familyMembers, setFamilyMembers] = useState(() => {
    const saved = localStorage.getItem('medicamp_family');
    return saved ? JSON.parse(saved) : INITIAL_FAMILY;
  });

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('medicamp_records');
    return saved ? JSON.parse(saved) : INITIAL_RECORDS;
  });

  const [currentMode, setCurrentMode] = useState(() => {
    const saved = localStorage.getItem('medicamp_mode');
    return saved ? JSON.parse(saved) : 'patient';
  });

  const [activeMemberId, setActiveMemberId] = useState('usr_self');
  const [activeTab, setActiveTab] = useState('timeline');
  const [loading, setLoading] = useState(false);

  // Modals state
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRoleSwitcherModal, setShowRoleSwitcherModal] = useState(false);
  const [showDoctorRegisterModal, setShowDoctorRegisterModal] = useState(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const [showEmergencyCardModal, setShowEmergencyCardModal] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);

  // Local Storage Sync
  useEffect(() => {
    localStorage.setItem('medicamp_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('medicamp_family', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('medicamp_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('medicamp_mode', JSON.stringify(currentMode));
  }, [currentMode]);

  // Supabase Auth Listener (if configured)
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserDataFromSupabase(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        loadUserDataFromSupabase(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch live profile & records from Supabase
  const loadUserDataFromSupabase = async (authUser) => {
    try {
      setLoading(true);
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*, doctor_profiles(*)')
        .eq('id', authUser.id)
        .single();

      if (profile) {
        const isDoc = Boolean(profile.is_doctor);
        setUser({
          id: profile.id,
          name: profile.full_name,
          email: profile.email,
          phone: profile.phone,
          aadhaar: profile.aadhaar,
          bloodGroup: profile.blood_group || 'O+',
          gender: profile.gender || 'Male',
          isDoctor: isDoc,
          allergies: profile.allergies || [],
          chronicConditions: profile.chronic_conditions || [],
          avatar: profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          doctorDetails: profile.doctor_profiles?.[0] ? {
            regNumber: profile.doctor_profiles[0].reg_number,
            council: profile.doctor_profiles[0].council,
            specialty: profile.doctor_profiles[0].specialty,
            hospital: profile.doctor_profiles[0].hospital,
            degrees: profile.doctor_profiles[0].degrees,
            experienceYears: profile.doctor_profiles[0].experience_years
          } : null
        });

        if (isDoc) {
          setCurrentMode('doctor');
        }
      }

      // Fetch Family Members
      const { data: dbFamily } = await supabase
        .from('family_members')
        .select('*')
        .eq('primary_user_id', authUser.id);

      if (dbFamily && dbFamily.length > 0) {
        setFamilyMembers(dbFamily);
      }

      // Fetch Medical Records
      const { data: dbRecords } = await supabase
        .from('medical_records')
        .select('*, prescribed_medicines(*)');

      if (dbRecords && dbRecords.length > 0) {
        const formatted = dbRecords.map(r => ({
          id: r.id,
          patientAadhaar: r.patient_aadhaar,
          patientName: r.patient_name,
          date: r.date,
          doctorName: r.doctor_name,
          doctorSpecialty: r.doctor_specialty,
          hospitalName: r.hospital_name,
          department: r.department,
          symptoms: r.symptoms,
          symptomDuration: r.symptom_duration,
          severity: r.severity,
          diagnosis: r.diagnosis,
          prescriptionImageUrl: r.prescription_image_url,
          followUpDate: r.follow_up_date,
          doctorNotes: r.doctor_notes,
          medicines: r.prescribed_medicines || []
        }));
        setRecords(formatted);
      }
    } catch (err) {
      console.warn('Supabase fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sign In Action
  const signIn = async (email, password) => {
    if (isSupabaseConfigured() && supabase) {
      const res = await supabase.auth.signInWithPassword({ email, password });
      return res;
    } else {
      // Local fallback signin simulation
      if (email.toLowerCase().includes('doc') || user.isDoctor) {
        loginAsDemoUser('doctor');
      } else {
        loginAsDemoUser('patient');
      }
      return { data: { user }, error: null };
    }
  };

  // Sign Up Action
  const signUp = async (signUpData) => {
    if (isSupabaseConfigured() && supabase) {
      const res = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            full_name: signUpData.fullName,
            phone: signUpData.phone,
            aadhaar: signUpData.aadhaar,
            blood_group: signUpData.bloodGroup,
            is_doctor: signUpData.isDoctor,
            doctor_reg_number: signUpData.doctorDetails?.regNumber,
            doctor_council: signUpData.doctorDetails?.council,
            doctor_specialty: signUpData.doctorDetails?.specialty,
            doctor_hospital: signUpData.doctorDetails?.hospital,
            doctor_degrees: signUpData.doctorDetails?.degrees,
            doctor_experience: signUpData.doctorDetails?.experienceYears
          }
        }
      });
      return res;
    } else {
      // Offline/Local account creation
      const newUser = {
        id: `usr_${Date.now()}`,
        name: signUpData.fullName,
        email: signUpData.email,
        phone: signUpData.phone,
        aadhaar: signUpData.aadhaar,
        bloodGroup: signUpData.bloodGroup,
        gender: 'Male',
        isDoctor: signUpData.isDoctor,
        doctorDetails: signUpData.doctorDetails,
        allergies: ['None'],
        chronicConditions: ['None'],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
      setUser(newUser);
      if (signUpData.isDoctor) {
        setCurrentMode('doctor');
      } else {
        setCurrentMode('patient');
      }
      return { data: { user: newUser }, error: null };
    }
  };

  // Sign Out Action
  const signOut = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setCurrentMode('patient');
    setShowAuthModal(true);
  };

  // 1-Click Demo Login Helper
  const loginAsDemoUser = (role) => {
    if (role === 'doctor') {
      setUser(INITIAL_USER);
      setCurrentMode('doctor');
      setActiveMemberId('usr_self');
    } else {
      setUser({
        ...INITIAL_FAMILY[0],
        id: 'usr_self',
        relation: 'Self',
        isDoctor: false,
        doctorDetails: null
      });
      setCurrentMode('patient');
      setActiveMemberId('usr_self');
    }
  };

  // Computed all family members
  const allMembers = [
    { ...user, relation: 'Self' },
    ...familyMembers
  ];

  const activeMember = allMembers.find(m => m.id === activeMemberId) || allMembers[0];

  const activeMemberRecords = records.filter(
    r => cleanAadhaar(r.patientAadhaar) === cleanAadhaar(activeMember?.aadhaar)
  );

  // Role Switching
  const switchRole = (newMode) => {
    if (newMode === 'doctor') {
      if (!user.isDoctor) {
        setShowDoctorRegisterModal(true);
        return false;
      }
    }
    setCurrentMode(newMode);
    setShowRoleSwitcherModal(false);
    return true;
  };

  // Register as Doctor
  const registerAsDoctor = async (doctorData) => {
    const updatedUser = {
      ...user,
      isDoctor: true,
      doctorDetails: {
        regNumber: doctorData.regNumber,
        council: doctorData.council,
        specialty: doctorData.specialty,
        hospital: doctorData.hospital,
        degrees: doctorData.degrees,
        experienceYears: doctorData.experienceYears
      }
    };
    setUser(updatedUser);
    setCurrentMode('doctor');

    if (isSupabaseConfigured() && supabase && session?.user) {
      await supabase.from('profiles').update({ is_doctor: true }).eq('id', session.user.id);
      await supabase.from('doctor_profiles').upsert({
        user_id: session.user.id,
        reg_number: doctorData.regNumber,
        council: doctorData.council,
        specialty: doctorData.specialty,
        hospital: doctorData.hospital,
        degrees: doctorData.degrees,
        experience_years: doctorData.experienceYears,
        verification_status: 'verified'
      });
    }

    setShowDoctorRegisterModal(false);
  };

  // Add Family Member
  const addFamilyMember = async (newMember) => {
    const memberObj = {
      id: `usr_${Date.now()}`,
      primary_user_id: user.id,
      name: newMember.name,
      relation: newMember.relation,
      age: Number(newMember.age) || 0,
      gender: newMember.gender,
      dob: newMember.dob,
      aadhaar: cleanAadhaar(newMember.aadhaar),
      phone: newMember.phone || user.phone,
      bloodGroup: newMember.bloodGroup || 'B+',
      allergies: newMember.allergies ? (Array.isArray(newMember.allergies) ? newMember.allergies : newMember.allergies.split(',').map(s => s.trim()).filter(Boolean)) : ['None'],
      chronicConditions: newMember.chronicConditions ? (Array.isArray(newMember.chronicConditions) ? newMember.chronicConditions : newMember.chronicConditions.split(',').map(s => s.trim()).filter(Boolean)) : ['None'],
      avatar: newMember.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    };

    setFamilyMembers(prev => [...prev, memberObj]);
    setActiveMemberId(memberObj.id);

    if (isSupabaseConfigured() && supabase && session?.user) {
      await supabase.from('family_members').insert([memberObj]);
    }
  };

  // Delete Family Member
  const deleteFamilyMember = async (id) => {
    if (id === 'usr_self') return;
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
    if (activeMemberId === id) {
      setActiveMemberId('usr_self');
    }
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('family_members').delete().eq('id', id);
    }
  };

  // Add Medical Record
  const addMedicalRecord = async (recordData) => {
    const targetAadhaar = recordData.patientAadhaar || activeMember?.aadhaar;
    const targetPatient = allMembers.find(m => cleanAadhaar(m.aadhaar) === cleanAadhaar(targetAadhaar)) || activeMember;
    
    const newRecord = {
      id: `rec_${Date.now()}`,
      patientAadhaar: cleanAadhaar(targetAadhaar),
      patientName: targetPatient?.name || 'Patient',
      date: recordData.date || new Date().toISOString().split('T')[0],
      doctorName: recordData.doctorName || 'General Physician',
      doctorSpecialty: recordData.doctorSpecialty || 'General Medicine',
      hospitalName: recordData.hospitalName || 'Health Center',
      department: recordData.department || 'OPD',
      symptoms: recordData.symptoms || '',
      symptomDuration: recordData.symptomDuration || '1 day',
      severity: recordData.severity || 'Mild',
      diagnosis: recordData.diagnosis || 'Clinical Consultation',
      prescriptionImageUrl: recordData.prescriptionImageUrl || '',
      medicines: recordData.medicines || [],
      followUpDate: recordData.followUpDate || '',
      doctorNotes: recordData.doctorNotes || ''
    };

    setRecords(prev => [newRecord, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: recRow } = await supabase.from('medical_records').insert([{
          patient_aadhaar: newRecord.patientAadhaar,
          patient_name: newRecord.patientName,
          created_by: session?.user?.id || null,
          date: newRecord.date,
          doctor_name: newRecord.doctorName,
          doctor_specialty: newRecord.doctorSpecialty,
          hospital_name: newRecord.hospitalName,
          department: newRecord.department,
          symptoms: newRecord.symptoms,
          symptom_duration: newRecord.symptomDuration,
          severity: newRecord.severity,
          diagnosis: newRecord.diagnosis,
          prescription_image_url: newRecord.prescriptionImageUrl,
          follow_up_date: newRecord.followUpDate || null,
          doctor_notes: newRecord.doctorNotes
        }]).select().single();

        if (recRow && newRecord.medicines.length > 0) {
          const medRows = newRecord.medicines.map(m => ({
            record_id: recRow.id,
            name: m.name,
            dosage: m.dosage,
            frequency: m.frequency,
            timing: m.timing,
            duration: m.duration,
            instructions: m.instructions
          }));
          await supabase.from('prescribed_medicines').insert(medRows);
        }
      } catch (e) {
        console.warn('Supabase record insert notice:', e);
      }
    }

    return newRecord;
  };

  // Doctor search patient by Aadhaar
  const searchPatientByAadhaar = async (aadhaarQuery) => {
    const cleaned = cleanAadhaar(aadhaarQuery);
    if (!cleaned || cleaned.length < 12) return null;

    // First check local / in-memory state
    const matchedPatient = allMembers.find(m => cleanAadhaar(m.aadhaar) === cleaned);
    const patientRecords = records.filter(r => cleanAadhaar(r.patientAadhaar) === cleaned);

    if (matchedPatient) {
      return { found: true, patient: matchedPatient, records: patientRecords };
    }

    if (patientRecords.length > 0) {
      return {
        found: true,
        patient: {
          id: `ext_${cleaned}`,
          name: patientRecords[0].patientName || 'External Patient',
          aadhaar: cleaned,
          age: 38,
          gender: 'Unspecified',
          bloodGroup: 'B+',
          allergies: ['No documented allergy'],
          chronicConditions: ['None'],
          phone: '+91 90000 00000'
        },
        records: patientRecords
      };
    }

    return { found: false };
  };

  // Doctor adds consultation directly to patient
  const addDoctorConsultation = (patientAadhaar, consultation) => {
    return addMedicalRecord({
      ...consultation,
      patientAadhaar: cleanAadhaar(patientAadhaar),
      doctorName: `Dr. ${user.name}`,
      doctorSpecialty: user.doctorDetails?.specialty || 'Consultant Specialist',
      hospitalName: user.doctorDetails?.hospital || 'Medical Clinic'
    });
  };

  const value = {
    user,
    setUser,
    session,
    signIn,
    signUp,
    signOut,
    loginAsDemoUser,
    familyMembers,
    allMembers,
    activeMemberId,
    setActiveMemberId,
    activeMember,
    records,
    activeMemberRecords,
    currentMode,
    switchRole,
    registerAsDoctor,
    activeTab,
    setActiveTab,
    addFamilyMember,
    deleteFamilyMember,
    addMedicalRecord,
    searchPatientByAadhaar,
    addDoctorConsultation,
    loading,
    // Modals
    showInstallModal,
    setShowInstallModal,
    showAuthModal,
    setShowAuthModal,
    showRoleSwitcherModal,
    setShowRoleSwitcherModal,
    showDoctorRegisterModal,
    setShowDoctorRegisterModal,
    showAddRecordModal,
    setShowAddRecordModal,
    showAddFamilyModal,
    setShowAddFamilyModal,
    showEmergencyCardModal,
    setShowEmergencyCardModal,
    selectedRecordForDetail,
    setSelectedRecordForDetail
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
