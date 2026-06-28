'use client';

import { useFormContext } from 'react-hook-form';
import { User } from 'lucide-react';
import FormField from '@/app/components/ui/FormField';
import type { FullCaseInput } from '@/app/lib/schemas';

export default function Step1PatientInfo() {
  const { register, formState: { errors } } = useFormContext<FullCaseInput>();
  const e = errors.patientInfo;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold">Patient Information</h2>
      </div>

      <FormField label="Patient Name" error={e?.name} required>
        <input
          {...register('patientInfo.name')}
          className="input input-bordered w-full"
          placeholder="Enter patient name"
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Age" error={e?.age} required>
          <input
            {...register('patientInfo.age')}
            type="number"
            className="input input-bordered w-full"
            placeholder="e.g. 45"
            min={0}
            max={150}
          />
        </FormField>

        <FormField label="Gender" error={e?.gender} required>
          <select {...register('patientInfo.gender')} className="select select-bordered w-full">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </FormField>
      </div>
    </div>
  );
}
