import AppShell from '@/app/components/layout/AppShell';
import CaseForm from '@/app/components/forms/CaseForm';

export default function NewCasePage() {
  return (
    <AppShell title="New Case">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Create New Case</h2>
          <p className="text-sm text-base-content/60 mt-1">
            Fill in each section to build a complete clinical case.
          </p>
        </div>
        <CaseForm />
      </div>
    </AppShell>
  );
}
