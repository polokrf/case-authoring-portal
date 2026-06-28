'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

import {
  fullCaseSchema,
  patientInfoSchema,
  historySchema,
  physicalExaminationSchema,
  investigationsSchema,
  diagnosisSchema,
  treatmentPlanSchema,
  type FullCaseInput,
} from '@/app/lib/schemas';
import { useCases } from '@/app/hooks/useCases';
import type { ClinicalCase } from '@/app/types';
import StepIndicator from '@/app/components/ui/StepIndicator';

import Step1PatientInfo from './Step1PatientInfo';
import Step2History from './Step2History';
import Step3PhysicalExam from './Step3PhysicalExam';
import Step4Investigations from './Step4Investigations';
import Step5Diagnosis from './Step5Diagnosis';
import Step6TreatmentPlan from './Step6TreatmentPlan';
import Step7Preview from './Step7Preview';

const STEPS = [
  { label: 'Patient', description: 'Patient Information' },
  { label: 'History', description: 'Medical History' },
  { label: 'Exam', description: 'Physical Examination' },
  { label: 'Tests', description: 'Investigations' },
  { label: 'Diagnosis', description: 'Diagnosis' },
  { label: 'Treatment', description: 'Treatment Plan' },
  { label: 'Preview', description: 'Review & Submit' },
];

// Per-step field paths for validation triggering
const STEP_FIELDS: (keyof FullCaseInput)[] = [
  'patientInfo',
  'history',
  'physicalExamination',
  'investigations',
  'diagnosis',
  'treatmentPlan',
];

const STEP_SCHEMAS = [
  patientInfoSchema,
  historySchema,
  physicalExaminationSchema,
  investigationsSchema,
  diagnosisSchema,
  treatmentPlanSchema,
];

function buildDefaultValues(existing?: ClinicalCase): FullCaseInput {
  if (existing) {
    return {
      status: existing.status,
      patientInfo: {
        ...existing.patientInfo,
        age: String(existing.patientInfo.age),
      },
      history: existing.history,
      physicalExamination: existing.physicalExamination,
      investigations: existing.investigations,
      diagnosis: existing.diagnosis,
      treatmentPlan: existing.treatmentPlan,
    };
  }
  return {
    status: 'draft',
    patientInfo: { name: '', age: '', gender: 'Male' },
    history: { chiefComplaint: '', historyOfPresentIllness: '', pastMedicalHistory: '', allergies: '' },
    physicalExamination: { bloodPressure: '', pulse: '', temperature: '', respiratoryRate: '', generalExaminationNotes: '' },
    investigations: { laboratoryTests: '', imaging: '', otherInvestigations: '' },
    diagnosis: { primaryDiagnosis: '', differentialDiagnosis: '' },
    treatmentPlan: { medications: '', advice: '', followUp: '' },
  };
}

interface CaseFormProps {
  existingCase?: ClinicalCase;
}

export default function CaseForm({ existingCase }: CaseFormProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { createCase, updateCase } = useCases();

  const methods = useForm<FullCaseInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(fullCaseSchema) as any,
    defaultValues: buildDefaultValues(existingCase),
    mode: 'onTouched',
  });

  const isLastStep = step === STEPS.length - 1;
  const isPreview = step === STEPS.length - 1;

  async function handleNext() {
    if (isPreview) return;

    // Validate only the current step's fields
    const fieldKey = STEP_FIELDS[step];
    const stepValues = methods.getValues(fieldKey);
    const schema = STEP_SCHEMAS[step];
    const result = schema.safeParse(stepValues);

    if (!result.success) {
      // Trigger validation errors to show in UI
      await methods.trigger(fieldKey);
      return;
    }

    setStep((s) => s + 1);
  }

  async function handleSubmit(data: FullCaseInput) {
    setSubmitting(true);
    try {
      if (existingCase) {
        updateCase(existingCase.id, data);
        toast.success('Case updated successfully');
      } else {
        createCase(data);
        toast.success('Case created successfully');
      }
      router.push('/');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const stepComponents = [
    <Step1PatientInfo key="s1" />,
    <Step2History key="s2" />,
    <Step3PhysicalExam key="s3" />,
    <Step4Investigations key="s4" />,
    <Step5Diagnosis key="s5" />,
    <Step6TreatmentPlan key="s6" />,
    <Step7Preview key="s7" />,
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit as never)} noValidate>
        <div className="space-y-6">
          {/* Progress */}
          <div className="form-section">
            <StepIndicator steps={STEPS} currentStep={step} />
          </div>

          {/* Step content */}
          <div className="form-section min-h-80">
            {stepComponents[step]}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="btn btn-ghost gap-2"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {/* Save as draft button - visible on all non-preview steps */}
              {!isPreview && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm gap-2"
                  onClick={async () => {
                    const data = methods.getValues();
                    data.status = 'draft';
                    if (existingCase) {
                      updateCase(existingCase.id, data);
                    } else {
                      createCase(data);
                    }
                    toast.success('Saved as draft');
                    router.push('/');
                  }}
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Draft
                </button>
              )}

              {isLastStep ? (
                <button
                  type="submit"
                  className="btn btn-primary gap-2"
                  disabled={submitting}
                >
                  {submitting && <span className="loading loading-spinner loading-xs" />}
                  <Save className="w-4 h-4" />
                  {existingCase ? 'Update Case' : 'Publish Case'}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary gap-2"
                  onClick={handleNext}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
