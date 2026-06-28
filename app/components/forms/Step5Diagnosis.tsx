'use client';

import { useFormContext } from 'react-hook-form';
import { Stethoscope } from 'lucide-react';
import FormField from '@/app/components/ui/FormField';
import type { FullCaseInput } from '@/app/lib/schemas';

export default function Step5Diagnosis() {
  const { register, formState: { errors } } = useFormContext<FullCaseInput>();
  const e = errors.diagnosis;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Stethoscope className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold">Diagnosis</h2>
      </div>

      <FormField label="Primary Diagnosis" error={e?.primaryDiagnosis} required>
        <input
          {...register('diagnosis.primaryDiagnosis')}
          className="input input-bordered w-full"
          placeholder="e.g. Type 2 Diabetes Mellitus"
        />
      </FormField>

      <FormField label="Differential Diagnosis" error={e?.differentialDiagnosis} required>
        <textarea
          {...register('diagnosis.differentialDiagnosis')}
          className="textarea textarea-bordered w-full min-h-28"
          placeholder="List possible alternative diagnoses with reasoning..."
        />
      </FormField>
    </div>
  );
}
