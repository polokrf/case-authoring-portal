'use client';

import { useFormContext } from 'react-hook-form';
import { Pill } from 'lucide-react';
import FormField from '@/app/components/ui/FormField';
import type { FullCaseInput } from '@/app/lib/schemas';

export default function Step6TreatmentPlan() {
  const { register, formState: { errors } } = useFormContext<FullCaseInput>();
  const e = errors.treatmentPlan;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Pill className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold">Treatment Plan</h2>
      </div>

      <FormField label="Medications" error={e?.medications} required hint="Enter 'None' if not applicable">
        <textarea
          {...register('treatmentPlan.medications')}
          className="textarea textarea-bordered w-full min-h-28"
          placeholder="List medications with dosage and frequency..."
        />
      </FormField>

      <FormField label="Advice" error={e?.advice} required>
        <textarea
          {...register('treatmentPlan.advice')}
          className="textarea textarea-bordered w-full min-h-24"
          placeholder="Lifestyle modifications, dietary advice, activity restrictions..."
        />
      </FormField>

      <FormField label="Follow-up" error={e?.followUp} required>
        <input
          {...register('treatmentPlan.followUp')}
          className="input input-bordered w-full"
          placeholder="e.g. Review in 2 weeks with repeat labs"
        />
      </FormField>
    </div>
  );
}
