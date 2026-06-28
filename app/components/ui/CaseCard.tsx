'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Eye, Pencil, Trash2, User, Calendar, Stethoscope } from 'lucide-react';
import type { ClinicalCase } from '@/app/types';
import { formatDate, getStatusColor, truncate } from '@/app/utils/formatters';
import ConfirmModal from './ConfirmModal';

interface CaseCardProps {
  caseData: ClinicalCase;
  onDelete: (id: string) => void;
}

export default function CaseCard({ caseData, onDelete }: CaseCardProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalId = `delete-modal-${caseData.id}`;

  function openModal() {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.showModal();
  }

  function handleConfirmDelete() {
    onDelete(caseData.id);
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.close();
  }

  return (
    <>
      <div className="card bg-base-100 border border-base-200 hover:border-primary/30 hover:shadow-md transition-all duration-200">
        <div className="card-body p-4 gap-3">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                <Stethoscope className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{caseData.patientInfo.name}</h3>
                <p className="text-xs text-base-content/50">
                  {caseData.patientInfo.age}y • {caseData.patientInfo.gender}
                </p>
              </div>
            </div>
            <span className={`badge badge-sm shrink-0 ${getStatusColor(caseData.status)}`}>
              {caseData.status}
            </span>
          </div>

          {/* Diagnosis */}
          <div className="bg-base-200/50 rounded-lg px-3 py-2">
            <p className="text-xs text-base-content/50 mb-0.5">Primary Diagnosis</p>
            <p className="text-sm font-medium">{truncate(caseData.diagnosis.primaryDiagnosis, 60)}</p>
          </div>

          {/* Chief complaint */}
          <p className="text-xs text-base-content/60 line-clamp-2">
            {truncate(caseData.history.chiefComplaint, 100)}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-base-content/40">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(caseData.updatedAt)}
            </span>
          </div>

          {/* Actions */}
          <div className="card-actions justify-end border-t border-base-200 pt-3 mt-1">
            <Link
              href={`/cases/${caseData.id}`}
              className="btn btn-ghost btn-xs gap-1"
              aria-label="View case"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </Link>
            <Link
              href={`/cases/${caseData.id}/edit`}
              className="btn btn-ghost btn-xs gap-1"
              aria-label="Edit case"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <button
              className="btn btn-ghost btn-xs text-error gap-1"
              onClick={openModal}
              aria-label="Delete case"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        id={modalId}
        title="Delete Case"
        message={`Are you sure you want to delete the case for "${caseData.patientInfo.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
