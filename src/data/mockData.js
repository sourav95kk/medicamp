/**
 * Seed data matching the exact MyHealth+ screenshot references
 */

export const INITIAL_USER = {
  id: 'usr_sourav',
  name: 'Sourav Kumar',
  relation: 'Self',
  age: 32,
  gender: 'Male',
  dob: '1993-03-14',
  aadhaar: '548291031234',
  maskedAadhaar: '**** 1234',
  phone: '+91 98765 43210',
  email: 'sourav@example.com',
  bloodGroup: 'O+',
  address: 'Bengaluru, Karnataka',
  allergies: ['Penicillin'],
  chronicConditions: ['None'],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  avatarInitial: 'S',
  isDoctor: false,
  doctorDetails: {
    regNumber: 'MCI-2018-89412',
    council: 'Karnataka Medical Council',
    specialty: 'General Physician',
    hospital: 'City Care Hospital',
    degrees: 'MBBS, MD (Medicine)',
    experienceYears: 8,
    verificationStatus: 'verified'
  }
};

export const INITIAL_FAMILY = [
  {
    id: 'fam_anita',
    name: 'Anita Kumar',
    relation: 'Spouse',
    age: 30,
    gender: 'Female',
    dob: '1995-07-18',
    aadhaar: '891047265678',
    maskedAadhaar: '**** 5678',
    phone: '+91 98765 43211',
    email: 'anita@example.com',
    bloodGroup: 'B+',
    allergies: ['Dust'],
    chronicConditions: ['None'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    badgeColor: 'bg-pink-100 text-pink-700'
  },
  {
    id: 'fam_aarav',
    name: 'Aarav Kumar',
    relation: 'Son',
    age: 6,
    gender: 'Male',
    dob: '2020-11-05',
    aadhaar: '348109259012',
    maskedAadhaar: '**** 9012',
    phone: '+91 98765 43210',
    email: 'sourav@example.com',
    bloodGroup: 'O+',
    allergies: ['None'],
    chronicConditions: ['None'],
    avatar: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=150&auto=format&fit=crop&q=80',
    badgeColor: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'fam_savitri',
    name: 'Savitri Devi',
    relation: 'Mother',
    age: 58,
    gender: 'Female',
    dob: '1968-02-14',
    aadhaar: '918273643456',
    maskedAadhaar: '**** 3456',
    phone: '+91 98765 43212',
    email: 'savitri@example.com',
    bloodGroup: 'A+',
    allergies: ['Sulfa Drugs'],
    chronicConditions: ['Hypertension'],
    avatar: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=150&auto=format&fit=crop&q=80',
    badgeColor: 'bg-amber-100 text-amber-800'
  }
];

export const INITIAL_RECORDS = [
  {
    id: 'rec_1',
    patientAadhaar: '548291031234',
    patientName: 'Sourav Kumar',
    isSelf: true,
    date: '12 Sep 2025',
    doctorName: 'Dr. Rakesh Sharma',
    doctorSpecialty: 'General Physician',
    hospitalName: 'City Care Hospital',
    department: 'General OPD',
    symptoms: 'Fever, cough, body ache for 3 days',
    symptomDuration: '3 days',
    severity: 'Moderate',
    diagnosis: 'Viral Fever',
    medicinesCount: 3,
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Paracetamol 500 mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        timing: 'After meals',
        duration: '5 days',
        instructions: 'Take when fever > 100°F'
      },
      {
        name: 'Azithromycin 500 mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        timing: 'After lunch',
        duration: '3 days',
        instructions: 'Complete 3-day course'
      },
      {
        name: 'Cetirizine 10 mg',
        dosage: '1 tablet',
        frequency: 'At night',
        timing: 'Bedtime',
        duration: '5 days',
        instructions: 'For allergic cough relief'
      },
      {
        name: 'Pantoprazole 40 mg',
        dosage: '1 tablet',
        frequency: 'Before food',
        timing: 'Empty stomach (Morning)',
        duration: '5 days',
        instructions: 'Antacid protection'
      }
    ],
    doctorNotes: 'Advised warm water hydration and 3 days rest. Review if fever persists beyond 5 days.'
  },
  {
    id: 'rec_2',
    patientAadhaar: '548291031234',
    patientName: 'Sourav Kumar',
    isSelf: true,
    date: '21 Aug 2025',
    doctorName: 'Dr. Priya Mehta',
    doctorSpecialty: 'Consultant Physician',
    hospitalName: 'Sunrise Clinic',
    department: 'Internal Medicine',
    symptoms: 'Stomach pain, acidity, nausea after food',
    symptomDuration: '2 days',
    severity: 'Mild',
    diagnosis: 'Acute Gastritis',
    medicinesCount: 2,
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Pantoprazole 40 mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        timing: 'Before breakfast',
        duration: '7 days',
        instructions: 'Empty stomach'
      },
      {
        name: 'Meftal Spas',
        dosage: '1 tablet',
        frequency: 'SOS (As needed)',
        timing: 'After food',
        duration: '3 days',
        instructions: 'Only during abdominal spasms'
      }
    ],
    doctorNotes: 'Avoid spicy/oily food. Drink plenty of tender coconut water.'
  },
  {
    id: 'rec_3',
    patientAadhaar: '891047265678',
    patientName: 'Anita Kumar',
    isSelf: false,
    date: '10 Jun 2025',
    doctorName: 'Dr. Amit Verma',
    doctorSpecialty: 'Internal Medicine',
    hospitalName: 'LifeCare Hospital',
    department: 'Health Checkup Center',
    symptoms: 'Annual health checkup, mild fatigue',
    symptomDuration: '1 week',
    severity: 'Mild',
    diagnosis: 'Annual checkup - Normal (Mild Vit D deficiency)',
    medicinesCount: 1,
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Vitamin D3 60K (Cholecalciferol)',
        dosage: '1 sachet / capsule',
        frequency: 'Once weekly',
        timing: 'With warm milk on Sundays',
        duration: '8 weeks',
        instructions: 'For bone and immunity health'
      }
    ],
    doctorNotes: 'All vitals and routine blood tests normal. Retest Vitamin D after 2 months.'
  },
  {
    id: 'rec_4',
    patientAadhaar: '348109259012',
    patientName: 'Aarav Kumar',
    isSelf: false,
    date: '15 Jan 2025',
    doctorName: 'Dr. Neha Singh',
    doctorSpecialty: 'Dermatologist',
    hospitalName: 'Metro Hospital',
    department: 'Dermatology OPD',
    symptoms: 'Skin allergy, mild red rashes on arms',
    symptomDuration: '3 days',
    severity: 'Mild',
    diagnosis: 'Contact Dermatitis / Skin allergy',
    medicinesCount: 2,
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Allegra 120 mg (Fexofenadine)',
        dosage: '1 tablet',
        frequency: 'Once daily',
        timing: 'Night before sleep',
        duration: '5 days',
        instructions: 'Non-drowsy anti-allergic'
      },
      {
        name: 'Calamine Soothing Lotion',
        dosage: 'Apply topically',
        frequency: 'Twice daily',
        timing: 'Morning and evening',
        duration: '7 days',
        instructions: 'Apply gently on affected areas'
      }
    ],
    doctorNotes: 'Keep skin clean and dry. Avoid synthetic clothes.'
  }
];

export const DOCTOR_RECENT_PATIENTS = [
  {
    id: 'pat_rahul',
    name: 'Rahul Mehta',
    aadhaar: '489102344321',
    maskedAadhaar: '**** 4321',
    age: 38,
    gender: 'Male',
    dob: '1987-05-12',
    bloodGroup: 'B+',
    lastVisit: '12 Sep 2025',
    symptoms: 'Seasonal fever, sore throat',
    diagnosis: 'Viral Pharyngitis',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'pat_priya',
    name: 'Priya Sharma',
    aadhaar: '748192038765',
    maskedAadhaar: '**** 8765',
    age: 29,
    gender: 'Female',
    dob: '1996-09-24',
    bloodGroup: 'A+',
    lastVisit: '11 Sep 2025',
    symptoms: 'Migraine headache, nausea',
    diagnosis: 'Acute Migraine',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'pat_amit',
    name: 'Amit Patel',
    aadhaar: '249103841122',
    maskedAadhaar: '**** 1122',
    age: 45,
    gender: 'Male',
    dob: '1980-01-15',
    bloodGroup: 'O+',
    lastVisit: '10 Sep 2025',
    symptoms: 'High blood pressure routine review',
    diagnosis: 'Essential Hypertension Stage 1',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'reminder',
    category: 'Reminders',
    title: 'Medicine Reminder',
    message: 'Time to take your medicine (Paracetamol 500 mg)',
    time: '2 hours ago',
    iconColor: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'notif_2',
    type: 'feature',
    category: 'Updates',
    title: 'New Feature',
    message: 'AI prescription scan is now available!',
    time: '1 day ago',
    iconColor: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: 'notif_3',
    type: 'record',
    category: 'Updates',
    title: 'Medical Record Added',
    message: 'Medical record added successfully (Dr. Rakesh Sharma)',
    time: '2 days ago',
    iconColor: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'notif_4',
    type: 'profile',
    category: 'Updates',
    title: 'Profile Updated',
    message: 'Your profile has been updated',
    time: '3 days ago',
    iconColor: 'bg-slate-100 text-slate-600'
  }
];

export const SAMPLE_PRESCRIPTION_PRESETS = [
  {
    id: 'sample_fever',
    title: 'Fever & Cold Prescription',
    doctor: 'Dr. Rakesh Sharma',
    hospital: 'City Care Hospital',
    specialty: 'General Physician',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    extractedText: 'Rx: Dr. Rakesh Sharma, City Care Hospital\nParacetamol 500 mg 1-0-1 5 days after meals\nAzithromycin 500 mg 0-1-0 3 days after lunch\nCetirizine 10 mg 0-0-1 5 days bedtime\nPantoprazole 40 mg 1-0-0 5 days empty stomach',
    parsedMedicines: [
      {
        name: 'Paracetamol 500 mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        timing: 'After meals',
        duration: '5 days',
        instructions: 'Take when fever > 100°F'
      },
      {
        name: 'Azithromycin 500 mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        timing: 'After lunch',
        duration: '3 days',
        instructions: 'Complete 3-day course'
      },
      {
        name: 'Cetirizine 10 mg',
        dosage: '1 tablet',
        frequency: 'At night',
        timing: 'Bedtime',
        duration: '5 days',
        instructions: 'For allergic cough relief'
      },
      {
        name: 'Pantoprazole 40 mg',
        dosage: '1 tablet',
        frequency: 'Before food',
        timing: 'Empty stomach (Morning)',
        duration: '5 days',
        instructions: 'Antacid protection'
      }
    ]
  },
  {
    id: 'sample_gastric',
    title: 'Gastritis Prescription',
    doctor: 'Dr. Priya Mehta',
    hospital: 'Sunrise Clinic',
    specialty: 'Consultant Physician',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    extractedText: 'Rx: Dr. Priya Mehta, Sunrise Clinic\nPantoprazole 40 mg 1-0-0 7 days before breakfast\nMeftal Spas 1-0-1 SOS 3 days after food',
    parsedMedicines: [
      {
        name: 'Pantoprazole 40 mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        timing: 'Before breakfast',
        duration: '7 days',
        instructions: 'Empty stomach'
      },
      {
        name: 'Meftal Spas',
        dosage: '1 tablet',
        frequency: 'SOS (As needed)',
        timing: 'After food',
        duration: '3 days',
        instructions: 'Only during abdominal spasms'
      }
    ]
  }
];

export const MEDICINE_DICTIONARY = [
  { name: 'Paracetamol', generic: 'Acetaminophen 500mg/650mg', defaultDosage: '500mg', defaultFreq: '1-0-1', defaultTiming: 'After food' },
  { name: 'Dolo 650', generic: 'Paracetamol 650mg', defaultDosage: '650mg', defaultFreq: '1-1-1', defaultTiming: 'After meals' },
  { name: 'Azithromycin', generic: 'Azithromycin 500mg', defaultDosage: '500mg', defaultFreq: '0-1-0', defaultTiming: 'After food' },
  { name: 'Augmentin 625', generic: 'Amoxicillin + Clavulanic Acid', defaultDosage: '625mg', defaultFreq: '1-0-1', defaultTiming: 'After meals' },
  { name: 'Pantoprazole', generic: 'Pantoprazole 40mg', defaultDosage: '40mg', defaultFreq: '1-0-0', defaultTiming: 'Empty stomach (Morning)' },
  { name: 'Pan 40', generic: 'Pantoprazole 40mg', defaultDosage: '40mg', defaultFreq: '1-0-0', defaultTiming: 'Empty stomach (Morning)' },
  { name: 'Cetirizine', generic: 'Cetirizine HCl 10mg', defaultDosage: '10mg', defaultFreq: '0-0-1', defaultTiming: 'Bedtime' },
  { name: 'Allegra 120', generic: 'Fexofenadine 120mg', defaultDosage: '120mg', defaultFreq: '0-0-1', defaultTiming: 'Night before sleep' },
  { name: 'Telmisartan 40', generic: 'Telmisartan 40mg', defaultDosage: '40mg', defaultFreq: '1-0-0', defaultTiming: 'Morning with water' },
  { name: 'Metformin 500', generic: 'Metformin HCl 500mg', defaultDosage: '500mg', defaultFreq: '1-0-1', defaultTiming: 'With meals' },
  { name: 'Vitamin D3', generic: 'Cholecalciferol 60,000 IU', defaultDosage: '60,000 IU', defaultFreq: 'Once weekly', defaultTiming: 'With warm milk' },
  { name: 'Meftal Spas', generic: 'Mefenamic Acid + Dicyclomine', defaultDosage: '1 tablet', defaultFreq: 'SOS', defaultTiming: 'After food' }
];

