'use client';

import { useFormContext } from 'react-hook-form';
import { FlaskConical } from 'lucide-react';
import FormField from '@/app/components/ui/FormField';
import type { FullCaseInput } from '@/app/lib/schemas';

export default function Step4Investigations() {
  const { register, formState: { errors } } = useFormContext<FullCaseInput>();
  const e = errors.investigations;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <FlaskConical className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold">Investigations</h2>
      </div>

      <FormField label="Laboratory Tests" error={e?.laboratoryTests} required hint="Enter 'None' if not applicable">
        <textarea
          {...register('investigations.laboratoryTests')}
          className="textarea textarea-bordered w-full min-h-24"
          placeholder="e.g. CBC, LFT, RFT, HbA1c..."
        />
      </FormField>

      <FormField label="Imaging" error={e?.imaging} required hint="Enter 'None' if not applicable">
        <textarea
          {...register('investigations.imaging')}
          className="textarea textarea-bordered w-full min-h-24"
          placeholder="e.g. Chest X-ray, CT scan, MRI..."
        />
      </FormField>

      <FormField label="Other Investigations" error={e?.otherInvestigations} required hint="Enter 'None' if not applicable">
        <textarea
          {...register('investigations.otherInvestigations')}
          className="textarea textarea-bordered w-full min-h-24"
          placeholder="e.g. ECG, Echocardiogram, Biopsy..."
        />
      </FormField>
    </div>
  );
}
