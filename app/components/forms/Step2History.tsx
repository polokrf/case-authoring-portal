'use client';

import { useFormContext } from 'react-hook-form';
import { ClipboardList } from 'lucide-react';
import FormField from '@/app/components/ui/FormField';
import type { FullCaseInput } from '@/app/lib/schemas';

export default function Step2History() {
  const { register, formState: { errors } } = useFormContext<FullCaseInput>();
  const e = errors.history;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <ClipboardList className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold">History</h2>
      </div>

      <FormField label="Chief Complaint" error={e?.chiefComplaint} required>
        <input
          {...register('history.chiefComplaint')}
          className="input input-bordered w-full"
          placeholder="e.g. Chest pain for 2 days"
        />
      </FormField>

      <FormField label="History of Present Illness" error={e?.historyOfPresentIllness} required>
        <textarea
          {...register('history.historyOfPresentIllness')}
          className="textarea textarea-bordered w-full min-h-28"
          placeholder="Describe the onset, duration, character, and associated symptoms..."
        />
      </FormField>

      <FormField label="Past Medical History" error={e?.pastMedicalHistory} required>
        <textarea
          {...register('history.pastMedicalHistory')}
          className="textarea textarea-bordered w-full min-h-20"
          placeholder="Previous illnesses, surgeries, hospitalizations..."
        />
      </FormField>

      <FormField label="Allergies" error={e?.allergies} required hint="Enter 'None' if no allergies">
        <input
          {...register('history.allergies')}
          className="input input-bordered w-full"
          placeholder="e.g. Penicillin, Aspirin or None"
        />
      </FormField>
    </div>
  );
}
