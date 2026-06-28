'use client';

import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  id: string;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  id,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  loading = false,
}: ConfirmModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-w-sm">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="bg-error/10 p-3 rounded-full">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-base-content/70 text-sm">{message}</p>
        </div>
        <div className="modal-action justify-center gap-3">
          <form method="dialog">
            <button className="btn btn-ghost">{cancelLabel}</button>
          </form>
          <button
            className="btn btn-error"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner loading-xs" />}
            {confirmLabel}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
