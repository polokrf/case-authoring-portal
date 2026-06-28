'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, Trash2, Calendar, User } from 'lucide-react';
import toast from 'react-hot-toast';
import AppShell from '@/app/components/layout/AppShell';
import ConfirmModal from '@/app/components/ui/ConfirmModal';
import { caseService } from '@/app/services/caseService';
import { useCases } from '@/app/hooks/useCases';
import { formatDateTime, getStatusColor } from '@/app/utils/formatters';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-base-100 border border-base-200 rounded-xl overflow-hidden">
      <div className="bg-base-200/60 px-5 py-2.5 border-b border-base-200">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/60">{title}</h3>
      </div>
      <div className="px-5 py-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
      <span className="text-xs font-medium text-base-content/50 sm:col-span-1">{label}</span>
      <span className="text-sm text-base-content sm:col-span-2 whitespace-pre-wrap">{value || '—'}</span>
    </div>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ViewCasePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { deleteCase } = useCases();
  const caseData = caseService.getById(id);
  const modalId = `delete-modal-view-${id}`;

  if (!caseData) {
    return (
      <AppShell title="Case Not Found">
        <div className="text-center py-20">
          <p className="text-base-content/60 mb-4">This case does not exist or was deleted.</p>
          <Link href="/" className="btn btn-primary btn-sm">Back to Dashboard</Link>
        </div>
      </AppShell>
    );
  }

  function handleDelete() {
    deleteCase(id);
    toast.success('Case deleted');
    router.push('/');
  }

  return (
    <AppShell title="View Case">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={()=> router.back()} className="btn btn-ghost btn-sm gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <Link href={`/cases/${id}/edit`} className="btn btn-outline btn-sm gap-2">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <button
              className="btn btn-error btn-sm gap-2"
              onClick={() => (document.getElementById(modalId) as HTMLDialogElement)?.showModal()}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>

        {/* Title card */}
        <div className="bg-base-100 border border-base-200 rounded-xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{caseData.patientInfo.name}</h1>
                <p className="text-sm text-base-content/60">
                  {caseData.patientInfo.age} years old • {caseData.patientInfo.gender}
                </p>
              </div>
            </div>
            <span className={`badge ${getStatusColor(caseData.status)}`}>
              {caseData.status}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-base-content/40">
            <Calendar className="w-3 h-3" />
            Last updated {formatDateTime(caseData.updatedAt)}
          </div>
        </div>

        <Section title="History">
          <Field label="Chief Complaint" value={caseData.history.chiefComplaint} />
          <Field label="History of Present Illness" value={caseData.history.historyOfPresentIllness} />
          <Field label="Past Medical History" value={caseData.history.pastMedicalHistory} />
          <Field label="Allergies" value={caseData.history.allergies} />
        </Section>

        <Section title="Physical Examination">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Blood Pressure', value: caseData.physicalExamination.bloodPressure },
              { label: 'Pulse', value: caseData.physicalExamination.pulse },
              { label: 'Temperature', value: caseData.physicalExamination.temperature },
              { label: 'Resp. Rate', value: caseData.physicalExamination.respiratoryRate },
            ].map(({ label, value }) => (
              <div key={label} className="bg-base-200/50 rounded-lg p-3 text-center">
                <p className="text-xs text-base-content/50 mb-1">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <Field label="General Notes" value={caseData.physicalExamination.generalExaminationNotes} />
        </Section>

        <Section title="Investigations">
          <Field label="Laboratory Tests" value={caseData.investigations.laboratoryTests} />
          <Field label="Imaging" value={caseData.investigations.imaging} />
          <Field label="Other Investigations" value={caseData.investigations.otherInvestigations} />
        </Section>

        <Section title="Diagnosis">
          <Field label="Primary Diagnosis" value={caseData.diagnosis.primaryDiagnosis} />
          <Field label="Differential Diagnosis" value={caseData.diagnosis.differentialDiagnosis} />
        </Section>

        <Section title="Treatment Plan">
          <Field label="Medications" value={caseData.treatmentPlan.medications} />
          <Field label="Advice" value={caseData.treatmentPlan.advice} />
          <Field label="Follow-up" value={caseData.treatmentPlan.followUp} />
        </Section>
      </div>

      <ConfirmModal
        id={modalId}
        title="Delete Case"
        message={`Delete case for "${caseData.patientInfo.name}"? This cannot be undone.`}
        onConfirm={handleDelete}
      />
    </AppShell>
  );
}
