import { FolderOpen, FilePlus } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = 'No cases yet',
  description = 'Get started by creating your first clinical case.',
  actionLabel = 'Create New Case',
  actionHref = '/cases/new',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-base-200 p-5 rounded-full mb-4">
        <FolderOpen className="w-10 h-10 text-base-content/40" />
      </div>
      <h3 className="text-lg font-semibold text-base-content mb-1">{title}</h3>
      <p className="text-base-content/60 text-sm mb-6 max-w-xs">{description}</p>
      {actionHref && (
        <Link href={actionHref} className="btn btn-primary btn-sm gap-2">
          <FilePlus className="w-4 h-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
