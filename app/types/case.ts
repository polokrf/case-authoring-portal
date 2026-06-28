export type Gender = 'Male' | 'Female' | 'Other';
export type CaseStatus = 'draft' | 'published';

export interface PatientInfo {
  name: string;
  age: number | string; // stored as number, form uses string
  gender: Gender;
}

export interface History {
  chiefComplaint: string;
  historyOfPresentIllness: string;
  pastMedicalHistory: string;
  allergies: string;
}

export interface PhysicalExamination {
  bloodPressure: string;
  pulse: string;
  temperature: string;
  respiratoryRate: string;
  generalExaminationNotes: string;
}

export interface Investigations {
  laboratoryTests: string;
  imaging: string;
  otherInvestigations: string;
}

export interface Diagnosis {
  primaryDiagnosis: string;
  differentialDiagnosis: string;
}

export interface TreatmentPlan {
  medications: string;
  advice: string;
  followUp: string;
}

export interface ClinicalCase {
  id: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  patientInfo: PatientInfo;
  history: History;
  physicalExamination: PhysicalExamination;
  investigations: Investigations;
  diagnosis: Diagnosis;
  treatmentPlan: TreatmentPlan;
}

export type CaseFormData = Omit<ClinicalCase, 'id' | 'createdAt' | 'updatedAt'>;
