'use client';

import { useFormContext } from 'react-hook-form';
import { Activity } from 'lucide-react';
import FormField from '@/app/components/ui/FormField';
import type { FullCaseInput } from '@/app/lib/schemas';

export default function Step3PhysicalExam() {
  const { register, formState: { errors } } = useFormContext<FullCaseInput>();
  const e = errors.physicalExamination;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold">Physical Examination</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Blood Pressure" error={e?.bloodPressure} required hint="mmHg">
          <input
            {...register('physicalExamination.bloodPressure')}
            className="input input-bordered w-full"
            placeholder="e.g. 120/80"
          />
        </FormField>

        <FormField label="Pulse" error={e?.pulse} required hint="bpm">
          <input
            {...register('physicalExamination.pulse')}
            className="input input-bordered w-full"
            placeholder="e.g. 72 bpm"
          />
        </FormField>

        <FormField label="Temperature" error={e?.temperature} required hint="°C or °F">
          <input
            {...register('physicalExamination.temperature')}
            className="input input-bordered w-full"
            placeholder="e.g. 37.5°C"
          />
        </FormField>

        <FormField label="Respiratory Rate" error={e?.respiratoryRate} required hint="breaths/min">
          <input
            {...register('physicalExamination.respiratoryRate')}
            className="input input-bordered w-full"
            placeholder="e.g. 16/min"
          />
        </FormField>
      </div>

      <FormField label="General Examination Notes" error={e?.generalExaminationNotes} required>
        <textarea
          {...register('physicalExamination.generalExaminationNotes')}
          className="textarea textarea-bordered w-full min-h-28"
          placeholder="General appearance, level of consciousness, nutritional status..."
        />
      </FormField>
    </div>
  );
}
