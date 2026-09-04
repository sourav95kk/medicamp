-- ==============================================================================
-- MEDICAMP SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (https://app.supabase.com)
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create User Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  aadhaar TEXT UNIQUE NOT NULL,
  blood_group TEXT DEFAULT 'O+',
  gender TEXT DEFAULT 'Male',
  dob DATE,
  age INTEGER,
  is_doctor BOOLEAN DEFAULT FALSE,
  allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
  chronic_conditions TEXT[] DEFAULT ARRAY[]::TEXT[],
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast Aadhaar lookups
CREATE INDEX IF NOT EXISTS idx_profiles_aadhaar ON public.profiles(aadhaar);

-- 3. Create Doctor Profiles Table
CREATE TABLE IF NOT EXISTS public.doctor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  reg_number TEXT NOT NULL UNIQUE,
  council TEXT NOT NULL DEFAULT 'National Medical Commission',
  specialty TEXT NOT NULL,
  hospital TEXT NOT NULL,
  degrees TEXT DEFAULT 'MBBS',
  experience_years INTEGER DEFAULT 5,
  verification_status TEXT DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_doctor_reg ON public.doctor_profiles(reg_number);

-- 4. Create Family Members Table
CREATE TABLE IF NOT EXISTS public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL DEFAULT 'Female',
  dob DATE,
  aadhaar TEXT NOT NULL,
  blood_group TEXT DEFAULT 'B+',
  allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
  chronic_conditions TEXT[] DEFAULT ARRAY[]::TEXT[],
  emergency_contact JSONB,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_family_aadhaar ON public.family_members(aadhaar);
CREATE INDEX IF NOT EXISTS idx_family_user ON public.family_members(primary_user_id);

-- 5. Create Medical Records Table (linked by 12-digit patient Aadhaar)
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_aadhaar TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  date DATE DEFAULT CURRENT_DATE,
  doctor_name TEXT NOT NULL,
  doctor_specialty TEXT DEFAULT 'General Medicine',
  hospital_name TEXT NOT NULL,
  department TEXT DEFAULT 'OPD',
  symptoms TEXT,
  symptom_duration TEXT DEFAULT '3 days',
  severity TEXT DEFAULT 'Mild' CHECK (severity IN ('Mild', 'Moderate', 'High')),
  diagnosis TEXT NOT NULL,
  prescription_image_url TEXT,
  tests_ordered TEXT[] DEFAULT ARRAY[]::TEXT[],
  follow_up_date DATE,
  doctor_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_records_aadhaar ON public.medical_records(patient_aadhaar);
CREATE INDEX IF NOT EXISTS idx_records_date ON public.medical_records(date DESC);

-- 6. Create Prescribed Medicines Table
CREATE TABLE IF NOT EXISTS public.prescribed_medicines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  record_id UUID NOT NULL REFERENCES public.medical_records(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT DEFAULT '1 Tab',
  frequency TEXT DEFAULT '1-0-1 (Twice daily)',
  timing TEXT DEFAULT 'After meals',
  duration TEXT DEFAULT '5 days',
  instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_meds_record ON public.prescribed_medicines(record_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescribed_medicines ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view their own profile; Doctors can read patient profiles by Aadhaar
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Doctors can view profiles for Aadhaar search" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_doctor = TRUE
    )
  );

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Doctor Profiles: Public read for verified doctors, insert/update own
CREATE POLICY "Anyone can view doctor profiles" 
  ON public.doctor_profiles FOR SELECT 
  USING (TRUE);

CREATE POLICY "Doctors can manage own doctor profile" 
  ON public.doctor_profiles FOR ALL 
  USING (auth.uid() = user_id);

-- Family Members: Users can view and manage their own family members
CREATE POLICY "Users can view own family members" 
  ON public.family_members FOR SELECT 
  USING (auth.uid() = primary_user_id);

CREATE POLICY "Doctors can view family members by Aadhaar search" 
  ON public.family_members FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_doctor = TRUE
    )
  );

CREATE POLICY "Users can manage own family members" 
  ON public.family_members FOR ALL 
  USING (auth.uid() = primary_user_id);

-- Medical Records:
-- 1. Patients can view records for their Aadhaar or family Aadhaar
CREATE POLICY "Patients view own and family medical records" 
  ON public.medical_records FOR SELECT 
  USING (
    patient_aadhaar IN (
      SELECT aadhaar FROM public.profiles WHERE id = auth.uid()
      UNION
      SELECT aadhaar FROM public.family_members WHERE primary_user_id = auth.uid()
    )
  );

-- 2. Doctors can view all medical records by Aadhaar search
CREATE POLICY "Verified doctors view medical records" 
  ON public.medical_records FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_doctor = TRUE
    )
  );

-- 3. Patients & Doctors can insert medical records
CREATE POLICY "Authenticated users can insert medical records" 
  ON public.medical_records FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Creators can update/delete their records" 
  ON public.medical_records FOR ALL 
  USING (created_by = auth.uid());

-- Prescribed Medicines: View and manage linked to records
CREATE POLICY "Users view medicines of viewable records" 
  ON public.prescribed_medicines FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.medical_records r 
      WHERE r.id = record_id
    )
  );

CREATE POLICY "Authenticated users can insert medicines" 
  ON public.prescribed_medicines FOR ALL 
  USING (auth.uid() IS NOT NULL);

-- ==============================================================================
-- AUTOMATED AUTH TRIGGER (Creates profile upon Supabase signup)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    email, 
    phone, 
    aadhaar, 
    blood_group, 
    is_doctor,
    avatar_url
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'aadhaar', '548291038472'),
    COALESCE(NEW.raw_user_meta_data->>'blood_group', 'O+'),
    COALESCE((NEW.raw_user_meta_data->>'is_doctor')::BOOLEAN, FALSE),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')
  );

  -- If registered as doctor, create doctor profile record
  IF (NEW.raw_user_meta_data->>'is_doctor')::BOOLEAN = TRUE THEN
    INSERT INTO public.doctor_profiles (
      user_id,
      reg_number,
      council,
      specialty,
      hospital,
      degrees,
      experience_years,
      verification_status
    )
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'doctor_reg_number', 'MCI-' || SUBSTRING(NEW.id::text, 1, 8)),
      COALESCE(NEW.raw_user_meta_data->>'doctor_council', 'State Medical Council'),
      COALESCE(NEW.raw_user_meta_data->>'doctor_specialty', 'Internal Medicine'),
      COALESCE(NEW.raw_user_meta_data->>'doctor_hospital', 'Max Healthcare / Apollo Clinic'),
      COALESCE(NEW.raw_user_meta_data->>'doctor_degrees', 'MBBS, MD'),
      COALESCE((NEW.raw_user_meta_data->>'doctor_experience')::INTEGER, 8),
      'verified'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (Run in Supabase SQL Editor)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('prescriptions', 'prescriptions', true), ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Prescriptions Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'prescriptions');

CREATE POLICY "Authenticated Upload Prescriptions" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'prescriptions' AND auth.role() = 'authenticated');
