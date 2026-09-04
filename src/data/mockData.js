/**
 * Seed data for MediCamp with realistic patient histories,
 * family members, doctor profiles, and medicine dictionary.
 */

export const INITIAL_USER = {
  id: 'usr_self',
  name: 'Rahul Sharma',
  relation: 'Self',
  age: 34,
  gender: 'Male',
  dob: '1992-04-15',
  aadhaar: '548291038472',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@example.com',
  bloodGroup: 'O+',
  emergencyContact: {
    name: 'Priya Sharma (Spouse)',
    phone: '+91 98765 43211'
  },
  allergies: ['Penicillin', 'Sulfa Drugs'],
  chronicConditions: ['Hypertension (Mild)'],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  isDoctor: true, // Registered as doctor for instant toggle demo capability
  doctorDetails: {
    regNumber: 'MCI-2016-89412',
    council: 'Delhi Medical Council',
    specialty: 'Internal Medicine / Consultant Physician',
    hospital: 'Max Super Speciality Hospital, Saket',
    degrees: 'MBBS, MD (Medicine)',
    experienceYears: 10
  }
};

export const INITIAL_FAMILY = [
  {
    id: 'usr_priya',
    name: 'Priya Sharma',
    relation: 'Spouse',
    age: 32,
    gender: 'Female',
    dob: '1994-08-22',
    aadhaar: '891047263519',
    phone: '+91 98765 43211',
    email: 'priya.s@example.com',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Rahul Sharma',
      phone: '+91 98765 43210'
    },
    allergies: ['Dust Mites', 'Peanuts'],
    chronicConditions: ['Hypothyroidism'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_aarav',
    name: 'Aarav Sharma',
    relation: 'Son',
    age: 6,
    gender: 'Male',
    dob: '2020-11-05',
    aadhaar: '348109257182',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Rahul & Priya',
      phone: '+91 98765 43210'
    },
    allergies: ['None known'],
    chronicConditions: ['None'],
    avatar: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_sunita',
    name: 'Sunita Sharma',
    relation: 'Mother',
    age: 62,
    gender: 'Female',
    dob: '1964-02-18',
    aadhaar: '918273645019',
    phone: '+91 98765 43212',
    email: 'sunita.sharma@example.com',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'Rahul Sharma (Son)',
      phone: '+91 98765 43210'
    },
    allergies: ['Aspirin', 'Iodine Contrast'],
    chronicConditions: ['Type 2 Diabetes', 'Osteoarthritis'],
    avatar: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_RECORDS = [
  {
    id: 'rec_101',
    patientAadhaar: '548291038472', // Rahul Sharma
    patientName: 'Rahul Sharma',
    date: '2026-08-14',
    doctorName: 'Dr. Vikram Malhotra',
    doctorSpecialty: 'Cardiologist',
    hospitalName: 'Apollo Hospitals, New Delhi',
    department: 'Cardiology OPD',
    symptoms: 'Mild chest tightness after strenuous workouts, occasional palpitations',
    symptomDuration: '2 weeks',
    severity: 'Moderate',
    diagnosis: 'Sinus Tachycardia & Stage-1 Essential Hypertension',
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Telmisartan 40mg (Telma 40)',
        dosage: '40mg',
        frequency: '1-0-0 (Once daily)',
        timing: 'Morning after breakfast',
        duration: '30 days',
        instructions: 'Take with full glass of water. Monitor BP weekly.'
      },
      {
        name: 'Metoprolol Succinate 25mg (Betaloc)',
        dosage: '25mg',
        frequency: '0-0-1 (Once daily at night)',
        timing: 'Night before sleep',
        duration: '15 days',
        instructions: 'Do not discontinue abruptly.'
      }
    ],
    testsOrdered: ['ECG (12-Lead)', 'Lipid Profile', 'Echocardiogram (2D)'],
    followUpDate: '2026-09-14',
    doctorNotes: 'BP recorded 142/90 mmHg. Stress test scheduled. Advised low sodium diet & 30 mins brisk walk daily.'
  },
  {
    id: 'rec_102',
    patientAadhaar: '548291038472', // Rahul Sharma
    date: '2026-06-20',
    doctorName: 'Dr. Ramesh Sethi',
    doctorSpecialty: 'General Physician',
    hospitalName: 'Fortis Escorts Clinic',
    department: 'Internal Medicine',
    symptoms: 'High grade fever (102°F), body aches, severe sore throat, dry cough',
    symptomDuration: '4 days',
    severity: 'High',
    diagnosis: 'Acute Viral Pharyngitis with upper respiratory tract infection',
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Dolo 650 (Paracetamol 650mg)',
        dosage: '650mg',
        frequency: '1-1-1 (Thrice daily)',
        timing: 'After meals',
        duration: '5 days',
        instructions: 'For fever > 100°F or body ache'
      },
      {
        name: 'Augmentin 625 Duo (Amoxicillin + Clavulanate)',
        dosage: '625mg',
        frequency: '1-0-1 (Twice daily)',
        timing: 'After heavy meal',
        duration: '5 days',
        instructions: 'Complete the entire 5-day course'
      },
      {
        name: 'Pan 40 (Pantoprazole 40mg)',
        dosage: '40mg',
        frequency: '1-0-0 (Once daily)',
        timing: 'Empty stomach 30 mins before breakfast',
        duration: '5 days',
        instructions: 'Prevents gastric irritation from antibiotics'
      },
      {
        name: 'Montair-LC (Montelukast + Levocetirizine)',
        dosage: '10mg / 5mg',
        frequency: '0-0-1 (Night only)',
        timing: 'Bedtime',
        duration: '7 days',
        instructions: 'May cause mild drowsiness'
      }
    ],
    testsOrdered: ['Complete Blood Count (CBC)', 'CRP'],
    followUpDate: '2026-06-26',
    doctorNotes: 'CBC normal. Throat swab negative for strep. Advised warm saline gargles & hydration.'
  },
  {
    id: 'rec_103',
    patientAadhaar: '891047263519', // Priya Sharma
    patientName: 'Priya Sharma',
    date: '2026-07-10',
    doctorName: 'Dr. Meenakshi Joshi',
    doctorSpecialty: 'Endocrinologist',
    hospitalName: 'Max Healthcare, Saket',
    department: 'Endocrinology',
    symptoms: 'Fatigue, lethargy, cold sensitivity, mild weight gain',
    symptomDuration: '1 month',
    severity: 'Mild',
    diagnosis: 'Subclinical Hypothyroidism (Elevated TSH)',
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Thyronorm 50mcg (Levothyroxine Sodium)',
        dosage: '50mcg',
        frequency: '1-0-0 (Daily)',
        timing: 'Empty stomach at 6:00 AM with water',
        duration: '90 days',
        instructions: 'Do not eat or drink tea/coffee for 45 minutes after taking this tablet.'
      }
    ],
    testsOrdered: ['Thyroid Profile (T3, T4, TSH)', 'Serum Vitamin D3'],
    followUpDate: '2026-10-10',
    doctorNotes: 'TSH was 6.8 uIU/mL. Starting low dose Thyronorm. Retest TSH after 3 months.'
  },
  {
    id: 'rec_104',
    patientAadhaar: '348109257182', // Aarav Sharma
    patientName: 'Aarav Sharma',
    date: '2026-08-01',
    doctorName: 'Dr. Rajesh Gupta',
    doctorSpecialty: 'Pediatrician',
    hospitalName: 'Rainbow Children Hospital',
    department: 'Pediatrics OPD',
    symptoms: 'Runny nose, sneezing fits, night cough',
    symptomDuration: '3 days',
    severity: 'Mild',
    diagnosis: 'Allergic Rhinitis & Seasonal Bronchial Hyperreactivity',
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Syrup Meftal-P (Mefenamic Acid)',
        dosage: '5ml',
        frequency: 'SOS (Only if temp > 100°F)',
        timing: 'After food',
        duration: '3 days',
        instructions: 'Max 3 doses in 24 hours'
      },
      {
        name: 'Syrup Ascoril-LS (Levosalbutamol + Ambroxol)',
        dosage: '2.5ml',
        frequency: '1-0-1 (Twice daily)',
        timing: 'After food',
        duration: '5 days',
        instructions: 'Shake bottle well before use'
      }
    ],
    testsOrdered: [],
    followUpDate: '2026-08-07',
    doctorNotes: 'Chest clear bilaterally. Weight: 21 kg. Advised steam inhalation and nasal saline drops.'
  },
  {
    id: 'rec_105',
    patientAadhaar: '918273645019', // Sunita Sharma
    patientName: 'Sunita Sharma',
    date: '2026-07-28',
    doctorName: 'Dr. Arvind Verma',
    doctorSpecialty: 'Diabetologist & Geriatric Care',
    hospitalName: 'Medanta - The Medicity',
    department: 'Diabetology OPD',
    symptoms: 'Knee joint stiffness in the morning, mild tingling in feet',
    symptomDuration: '2 months',
    severity: 'Moderate',
    diagnosis: 'Type 2 Diabetes Mellitus with Mild Diabetic Neuropathy & Bilateral Knee Osteoarthritis',
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    medicines: [
      {
        name: 'Glycomet-GP 1 (Metformin 500mg + Glimepiride 1mg)',
        dosage: '500mg / 1mg',
        frequency: '1-0-1 (Twice daily)',
        timing: 'Just before breakfast and dinner',
        duration: '60 days',
        instructions: 'Check fasting and post-prandial blood sugar every fortnight'
      },
      {
        name: 'Pregabalin 75mg + Methylcobalamin (Maxgalin-M)',
        dosage: '75mg',
        frequency: '0-0-1 (Night)',
        timing: 'At bedtime',
        duration: '30 days',
        instructions: 'For neuropathic pain/tingling'
      },
      {
        name: 'Cartigen Forte (Glucosamine + Chondroitin)',
        dosage: '1 tablet',
        frequency: '1-0-0 (Morning)',
        timing: 'After breakfast',
        duration: '60 days',
        instructions: 'Joint health supplement'
      }
    ],
    testsOrdered: ['HbA1c', 'Fast Blood Sugar', 'PP Blood Sugar', 'X-Ray Bilateral Knees (AP/Lat)'],
    followUpDate: '2026-09-28',
    doctorNotes: 'HbA1c is 7.2%. Foot sensation tested. Advised diabetic footwear and knee strengthening physiotherapy.'
  }
];

// Presets for the interactive Smart Prescription OCR testing
export const SAMPLE_PRESCRIPTION_PRESETS = [
  {
    id: 'preset_fever',
    title: 'Seasonal Fever & Infection (General Physician)',
    doctor: 'Dr. Ramesh Sethi, MD',
    hospital: 'Fortis Memorial Hospital',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
    extractedText: `
FORTIS MEMORIAL RESEARCH HOSPITAL
Dr. Ramesh Sethi, MBBS, MD (Internal Medicine) - Reg No: DMC/14589
Patient: Rahul Sharma | Date: 05-Sep-2026

Rx:
1. Tab. Dolo 650 (Paracetamol 650mg)
   Dosage: 1 Tab - TDS (1-1-1) - After meals - 5 days
   Note: For fever > 100 F and body aches

2. Tab. Augmentin 625 Duo (Amoxicillin 500mg + Clavulanic 125mg)
   Dosage: 1 Tab - BD (1-0-1) - After food - 5 days
   Note: Antibiotic course, do not skip

3. Tab. Pan 40 (Pantoprazole 40mg)
   Dosage: 1 Tab - OD (1-0-0) - 30 mins before breakfast - 5 days
   Note: Antacid

4. Tab. Montair-LC (Montelukast + Levocetirizine)
   Dosage: 1 Tab - HS (0-0-1) - Night at bedtime - 7 days
   Note: For dry cough & allergic relief

Advice: Plenty of fluids, warm saline gargles. Review in 5 days.
    `,
    parsedMedicines: [
      {
        name: 'Dolo 650 (Paracetamol 650mg)',
        dosage: '650mg',
        frequency: '1-1-1 (Thrice daily)',
        timing: 'After meals',
        duration: '5 days',
        instructions: 'For fever > 100°F and body aches'
      },
      {
        name: 'Augmentin 625 Duo (Amoxicillin + Clavulanate)',
        dosage: '625mg',
        frequency: '1-0-1 (Twice daily)',
        timing: 'After food',
        duration: '5 days',
        instructions: 'Antibiotic course, do not skip'
      },
      {
        name: 'Pan 40 (Pantoprazole 40mg)',
        dosage: '40mg',
        frequency: '1-0-0 (Once daily)',
        timing: 'Before breakfast (Empty stomach)',
        duration: '5 days',
        instructions: 'Antacid'
      },
      {
        name: 'Montair-LC (Montelukast + Levocetirizine)',
        dosage: '10mg / 5mg',
        frequency: '0-0-1 (Night only)',
        timing: 'Bedtime',
        duration: '7 days',
        instructions: 'For dry cough & allergic relief'
      }
    ]
  },
  {
    id: 'preset_cardio',
    title: 'Cardiology & Blood Pressure (Max Healthcare)',
    doctor: 'Dr. Ananya Sen, MD, DM (Cardiology)',
    hospital: 'Max Super Speciality Hospital',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    extractedText: `
MAX SUPER SPECIALITY HOSPITAL, SAKET
Department of Cardiology
Dr. Ananya Sen, MD (Med), DM (Cardio) - MCI Reg: 2018-4491

Rx:
1. Tab. Telma 40 (Telmisartan 40mg)
   Dosage: 1 Tab - OD (1-0-0) - Morning after breakfast - 30 days
   
2. Tab. Betaloc 25 (Metoprolol Succinate 25mg)
   Dosage: 1 Tab - OD (0-0-1) - Night after dinner - 30 days

3. Tab. Rosuvas 10 (Rosuvastatin 10mg)
   Dosage: 1 Tab - OD (0-0-1) - Bedtime - 30 days

4. Tab. Ecosprin 75 (Aspirin 75mg Gastro-resistant)
   Dosage: 1 Tab - OD (0-1-0) - After lunch - 30 days
    `,
    parsedMedicines: [
      {
        name: 'Telma 40 (Telmisartan 40mg)',
        dosage: '40mg',
        frequency: '1-0-0 (Morning)',
        timing: 'Morning after breakfast',
        duration: '30 days',
        instructions: 'Blood pressure control'
      },
      {
        name: 'Betaloc 25 (Metoprolol Succinate 25mg)',
        dosage: '25mg',
        frequency: '0-0-1 (Night)',
        timing: 'Night after dinner',
        duration: '30 days',
        instructions: 'Heart rate regulation'
      },
      {
        name: 'Rosuvas 10 (Rosuvastatin 10mg)',
        dosage: '10mg',
        frequency: '0-0-1 (Bedtime)',
        timing: 'Bedtime',
        duration: '30 days',
        instructions: 'Cholesterol management'
      },
      {
        name: 'Ecosprin 75 (Aspirin 75mg)',
        dosage: '75mg',
        frequency: '0-1-0 (Afternoon)',
        timing: 'After lunch',
        duration: '30 days',
        instructions: 'Antiplatelet cardiprotection'
      }
    ]
  },
  {
    id: 'preset_ortho',
    title: 'Orthopedic & Joint Pain (Apollo Clinic)',
    doctor: 'Dr. Sandeep Kapoor, MS (Ortho)',
    hospital: 'Apollo Orthopaedic Centre',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    extractedText: `
APOLLO ORTHOPAEDICS
Dr. Sandeep Kapoor, MS (Ortho), DNB - Reg: 2011-0982

Rx:
1. Tab. Zerodol-SP (Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg)
   Dosage: 1 Tab - BD (1-0-1) - After meals - 5 days
   Note: Pain & swelling relief

2. Tab. Pantocid DSR (Pantoprazole + Domperidone)
   Dosage: 1 Cap - OD (1-0-0) - Empty stomach - 7 days

3. Tab. Shelcal-500 (Calcium 500mg + Vitamin D3 250 IU)
   Dosage: 1 Tab - OD (1-0-0) - After breakfast - 60 days
   
4. Tab. Neurobion Forte (Vitamin B Complex + B12)
   Dosage: 1 Tab - OD (0-0-1) - Night - 30 days
    `,
    parsedMedicines: [
      {
        name: 'Zerodol-SP (Aceclofenac + Paracetamol + Serratiopeptidase)',
        dosage: '1 tablet',
        frequency: '1-0-1 (Twice daily)',
        timing: 'After meals',
        duration: '5 days',
        instructions: 'Pain & anti-inflammatory'
      },
      {
        name: 'Pantocid DSR (Pantoprazole + Domperidone)',
        dosage: '40mg / 30mg',
        frequency: '1-0-0 (Morning)',
        timing: 'Empty stomach (Morning)',
        duration: '7 days',
        instructions: 'Gastric protection'
      },
      {
        name: 'Shelcal-500 (Calcium + Vitamin D3)',
        dosage: '500mg',
        frequency: '1-0-0 (Morning)',
        timing: 'After breakfast',
        duration: '60 days',
        instructions: 'Bone density supplement'
      },
      {
        name: 'Neurobion Forte (Vitamin B-Complex)',
        dosage: '1 tablet',
        frequency: '0-0-1 (Night)',
        timing: 'Night before sleep',
        duration: '30 days',
        instructions: 'Nerve health supplement'
      }
    ]
  }
];

// Common Indian & international medicine dictionary for OCR matching
export const MEDICINE_DICTIONARY = [
  { name: 'Dolo 650', generic: 'Paracetamol 650mg', defaultDosage: '650mg', defaultFreq: '1-1-1', defaultTiming: 'After meals' },
  { name: 'Crocin 650', generic: 'Paracetamol 650mg', defaultDosage: '650mg', defaultFreq: '1-1-1', defaultTiming: 'After meals' },
  { name: 'Augmentin 625 Duo', generic: 'Amoxicillin + Clavulanate', defaultDosage: '625mg', defaultFreq: '1-0-1', defaultTiming: 'After food' },
  { name: 'Azithral 500', generic: 'Azithromycin 500mg', defaultDosage: '500mg', defaultFreq: '1-0-0', defaultTiming: 'After lunch' },
  { name: 'Pan 40', generic: 'Pantoprazole 40mg', defaultDosage: '40mg', defaultFreq: '1-0-0', defaultTiming: 'Empty stomach (Morning)' },
  { name: 'Pantocid DSR', generic: 'Pantoprazole + Domperidone', defaultDosage: '40mg/30mg', defaultFreq: '1-0-0', defaultTiming: 'Empty stomach' },
  { name: 'Razo 20', generic: 'Rabeprazole 20mg', defaultDosage: '20mg', defaultFreq: '1-0-0', defaultTiming: 'Empty stomach' },
  { name: 'Montair-LC', generic: 'Montelukast + Levocetirizine', defaultDosage: '10mg/5mg', defaultFreq: '0-0-1', defaultTiming: 'Night at bedtime' },
  { name: 'Allegra 120', generic: 'Fexofenadine 120mg', defaultDosage: '120mg', defaultFreq: '1-0-0', defaultTiming: 'Morning' },
  { name: 'Cetzine 10', generic: 'Cetirizine 10mg', defaultDosage: '10mg', defaultFreq: '0-0-1', defaultTiming: 'Night' },
  { name: 'Telma 40', generic: 'Telmisartan 40mg', defaultDosage: '40mg', defaultFreq: '1-0-0', defaultTiming: 'Morning' },
  { name: 'Telma-H', generic: 'Telmisartan + Hydrochlorothiazide', defaultDosage: '40mg/12.5mg', defaultFreq: '1-0-0', defaultTiming: 'Morning' },
  { name: 'Betaloc 25', generic: 'Metoprolol 25mg', defaultDosage: '25mg', defaultFreq: '0-0-1', defaultTiming: 'Night' },
  { name: 'Amlong 5', generic: 'Amlodipine 5mg', defaultDosage: '5mg', defaultFreq: '1-0-0', defaultTiming: 'Morning' },
  { name: 'Glycomet 500', generic: 'Metformin 500mg', defaultDosage: '500mg', defaultFreq: '1-0-1', defaultTiming: 'With meals' },
  { name: 'Glycomet-GP 1', generic: 'Metformin + Glimepiride', defaultDosage: '500mg/1mg', defaultFreq: '1-0-1', defaultTiming: 'Before meals' },
  { name: 'Thyronorm 50', generic: 'Levothyroxine 50mcg', defaultDosage: '50mcg', defaultFreq: '1-0-0', defaultTiming: 'Empty stomach (Morning 6am)' },
  { name: 'Thyronorm 25', generic: 'Levothyroxine 25mcg', defaultDosage: '25mcg', defaultFreq: '1-0-0', defaultTiming: 'Empty stomach (Morning 6am)' },
  { name: 'Zerodol-SP', generic: 'Aceclofenac + Paracetamol + Serratiopeptidase', defaultDosage: '1 tablet', defaultFreq: '1-0-1', defaultTiming: 'After food' },
  { name: 'Combiflam', generic: 'Ibuprofen + Paracetamol', defaultDosage: '1 tablet', defaultFreq: '1-0-1', defaultTiming: 'After food' },
  { name: 'Shelcal 500', generic: 'Calcium + Vitamin D3', defaultDosage: '500mg', defaultFreq: '1-0-0', defaultTiming: 'After breakfast' },
  { name: 'Neurobion Forte', generic: 'Vitamin B Complex', defaultDosage: '1 tablet', defaultFreq: '0-0-1', defaultTiming: 'Night' },
  { name: 'Becosules Z', generic: 'Vitamin B Complex + Zinc', defaultDosage: '1 capsule', defaultFreq: '1-0-0', defaultTiming: 'After lunch' },
  { name: 'Rosuvas 10', generic: 'Rosuvastatin 10mg', defaultDosage: '10mg', defaultFreq: '0-0-1', defaultTiming: 'Night' },
  { name: 'Atorva 10', generic: 'Atorvastatin 10mg', defaultDosage: '10mg', defaultFreq: '0-0-1', defaultTiming: 'Night' },
  { name: 'Ascoril-D Plus', generic: 'Dextromethorphan + Chlorpheniramine', defaultDosage: '10ml', defaultFreq: '1-1-1', defaultTiming: 'After meals' },
  { name: 'Ascoril-LS', generic: 'Levosalbutamol + Ambroxol', defaultDosage: '5ml', defaultFreq: '1-0-1', defaultTiming: 'After meals' },
  { name: 'Meftal Spas', generic: 'Dicyclomine + Mefenamic Acid', defaultDosage: '1 tablet', defaultFreq: 'SOS (As needed)', defaultTiming: 'After food' },
  { name: 'Ecosprin 75', generic: 'Aspirin 75mg', defaultDosage: '75mg', defaultFreq: '0-1-0', defaultTiming: 'After lunch' }
];
