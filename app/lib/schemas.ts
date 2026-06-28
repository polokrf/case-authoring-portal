import { z } from 'zod';

export const patientInfoSchema = z.object({
  name: z.string().min(2, 'Patient name must be at least 2 characters'),
  // age is a string from the input, validated as numeric string
  age: z.string()
    .min(1, 'Age is required')
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 150, {
      message: 'Please enter a valid age (0–150)',
    }),
  gender: z.enum(['Male', 'Female', 'Other'] as const, { error: 'Please select a gender' }),
});

export const historySchema = z.object({
  chiefComplaint: z.string().min(3, 'Chief complaint is required'),
  historyOfPresentIllness: z.string().min(10, 'Please provide history of present illness'),
  pastMedicalHistory: z.string().min(1, 'Past medical history is required'),
  allergies: z.string().min(1, 'Allergies field is required (enter "None" if none)'),
});

export const physicalExaminationSchema = z.object({
  bloodPressure: z.string().min(1, 'Blood pressure is required (e.g. 120/80)'),
  pulse: z.string().min(1, 'Pulse is required (e.g. 72 bpm)'),
  temperature: z.string().min(1, 'Temperature is required'),
  respiratoryRate: z.string().min(1, 'Respiratory rate is required'),
  generalExaminationNotes: z.string().min(5, 'Please provide general examination notes'),
});

export const investigationsSchema = z.object({
  laboratoryTests: z.string().min(1, 'Laboratory tests field is required (enter "None" if none)'),
  imaging: z.string().min(1, 'Imaging field is required (enter "None" if none)'),
  otherInvestigations: z.string().min(1, 'Other investigations field is required (enter "None" if none)'),
});

export const diagnosisSchema = z.object({
  primaryDiagnosis: z.string().min(3, 'Primary diagnosis is required'),
  differentialDiagnosis: z.string().min(3, 'Differential diagnosis is required'),
});

export const treatmentPlanSchema = z.object({
  medications: z.string().min(1, 'Medications field is required (enter "None" if none)'),
  advice: z.string().min(5, 'Please provide advice for the patient'),
  followUp: z.string().min(1, 'Follow-up instructions are required'),
});

export const fullCaseSchema = z.object({
  status: z.enum(['draft', 'published'] as const),
  patientInfo: patientInfoSchema,
  history: historySchema,
  physicalExamination: physicalExaminationSchema,
  investigations: investigationsSchema,
  diagnosis: diagnosisSchema,
  treatmentPlan: treatmentPlanSchema,
});

export type PatientInfoInput = z.infer<typeof patientInfoSchema>;
export type HistoryInput = z.infer<typeof historySchema>;
export type PhysicalExaminationInput = z.infer<typeof physicalExaminationSchema>;
export type InvestigationsInput = z.infer<typeof investigationsSchema>;
export type DiagnosisInput = z.infer<typeof diagnosisSchema>;
export type TreatmentPlanInput = z.infer<typeof treatmentPlanSchema>;
export type FullCaseInput = z.infer<typeof fullCaseSchema>;
