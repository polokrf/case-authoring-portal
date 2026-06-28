'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AppShell from '@/app/components/layout/AppShell';
import CaseForm from '@/app/components/forms/CaseForm';
import { caseService } from '@/app/services/caseService';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditCasePage({ params }: PageProps) {
  const { id } = use(params);
  const caseData = caseService.getById(id);

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

  return (
    <AppShell title="Edit Case">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href={`/cases/${id}`} className="btn btn-ghost btn-sm gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div>
            <h2 className="text-xl font-bold">Edit Case</h2>
            <p className="text-sm text-base-content/60">
              Editing: {caseData.patientInfo.name}
            </p>
          </div>
        </div>
        <CaseForm existingCase={caseData} />
      </div>
    </AppShell>
  );
}
