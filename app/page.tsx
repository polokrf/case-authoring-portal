'use client';

import Link from 'next/link';
import { FilePlus, BookOpen, CheckCircle, Clock } from 'lucide-react';
import AppShell from '@/app/components/layout/AppShell';
import CaseCard from '@/app/components/ui/CaseCard';
import EmptyState from '@/app/components/ui/EmptyState';
import { useCases } from '@/app/hooks/useCases';

export default function DashboardPage() {
  const { cases, loading, deleteCase } = useCases();

  const published = cases.filter((c) => c.status === 'published').length;
  const drafts = cases.filter((c) => c.status === 'draft').length;

  return (
    <AppShell title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm">
          <div className="stat-figure text-primary">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="stat-title text-xs">Total Cases</div>
          <div className="stat-value text-2xl">{cases.length}</div>
        </div>
        <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm">
          <div className="stat-figure text-success">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div className="stat-title text-xs">Published</div>
          <div className="stat-value text-2xl">{published}</div>
        </div>
        <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm">
          <div className="stat-figure text-warning">
            <Clock className="w-7 h-7" />
          </div>
          <div className="stat-title text-xs">Drafts</div>
          <div className="stat-value text-2xl">{drafts}</div>
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-base">All Cases</h2>
        <Link href="/cases/new" className="btn btn-primary btn-sm gap-2">
          <FilePlus className="w-4 h-4" />
          New Case
        </Link>
      </div>

      {/* Cases grid */}
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
          {cases.map(c => (
            <CaseCard key={c.id} caseData={c} onDelete={deleteCase} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
