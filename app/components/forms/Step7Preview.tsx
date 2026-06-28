'use client';

import { useFormContext } from 'react-hook-form';
import { Eye } from 'lucide-react';
import type { FullCaseInput } from '@/app/lib/schemas';

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-base-200 rounded-xl overflow-hidden">
      <div className="bg-base-200/60 px-4 py-2 border-b border-base-200">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/60">{title}</h3>
      </div>
      <div className="px-4 py-3 space-y-2">{children}</div>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-xs font-medium text-base-content/50 sm:w-40 shrink-0">{label}</span>
      <span className="text-sm text-base-content whitespace-pre-wrap">{value || '—'}</span>
    </div>
  );
}

export default function Step7Preview() {
  const { getValues } = useFormContext<FullCaseInput>();
  const data = getValues();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Eye className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold">Case Preview</h2>
        <span className="badge badge-primary badge-sm ml-auto">Read-only</span>
      </div>

      <PreviewSection title="Patient Information">
        <PreviewRow label="Patient Name" value={data.patientInfo?.name} />
        <PreviewRow label="Age" value={data.patientInfo?.age} />
        <PreviewRow label="Gender" value={data.patientInfo?.gender} />
      </PreviewSection>

      <PreviewSection title="History">
        <PreviewRow label="Chief Complaint" value={data.history?.chiefComplaint} />
        <PreviewRow label="History of Present Illness" value={data.history?.historyOfPresentIllness} />
        <PreviewRow label="Past Medical History" value={data.history?.pastMedicalHistory} />
        <PreviewRow label="Allergies" value={data.history?.allergies} />
      </PreviewSection>

      <PreviewSection title="Physical Examination">
        <PreviewRow label="Blood Pressure" value={data.physicalExamination?.bloodPressure} />
        <PreviewRow label="Pulse" value={data.physicalExamination?.pulse} />
        <PreviewRow label="Temperature" value={data.physicalExamination?.temperature} />
        <PreviewRow label="Respiratory Rate" value={data.physicalExamination?.respiratoryRate} />
        <PreviewRow label="General Examination" value={data.physicalExamination?.generalExaminationNotes} />
      </PreviewSection>

      <PreviewSection title="Investigations">
        <PreviewRow label="Laboratory Tests" value={data.investigations?.laboratoryTests} />
        <PreviewRow label="Imaging" value={data.investigations?.imaging} />
        <PreviewRow label="Other Investigations" value={data.investigations?.otherInvestigations} />
      </PreviewSection>

      <PreviewSection title="Diagnosis">
        <PreviewRow label="Primary Diagnosis" value={data.diagnosis?.primaryDiagnosis} />
        <PreviewRow label="Differential Diagnosis" value={data.diagnosis?.differentialDiagnosis} />
      </PreviewSection>

      <PreviewSection title="Treatment Plan">
        <PreviewRow label="Medications" value={data.treatmentPlan?.medications} />
        <PreviewRow label="Advice" value={data.treatmentPlan?.advice} />
        <PreviewRow label="Follow-up" value={data.treatmentPlan?.followUp} />
      </PreviewSection>
    </div>
  );
}
