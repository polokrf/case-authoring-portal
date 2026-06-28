'use client';

import Link from 'next/link';
import { FilePlus } from 'lucide-react';
import AppShell from '@/app/components/layout/AppShell';
import CaseCard from '@/app/components/ui/CaseCard';
import EmptyState from '@/app/components/ui/EmptyState';
import { useCases } from '@/app/hooks/useCases';

export default function CasesPage() {
  const { cases, loading, deleteCase } = useCases();

  return (
    <AppShell title="All Cases">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-lg">Clinical Cases</h2>
          <p className="text-sm text-base-content/60">{cases.length} total</p>
        </div>
        <Link href="/cases/new" className="btn btn-primary btn-sm gap-2">
          <FilePlus className="w-4 h-4" />
          New Case
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : cases.length === 0 ? (
        <div className="bg-base-100 rounded-2xl border border-base-200">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {cases.map((c) => (
            <CaseCard key={c.id} caseData={c} onDelete={deleteCase} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
