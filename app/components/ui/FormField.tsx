import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export default function FormField({ label, error, required, hint, children }: FormFieldProps) {
  return (
    <div className="form-control w-full">
      <label className="label pb-1">
        <span className="label-text font-medium text-sm">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
        {hint && <span className="label-text-alt text-base-content/50">{hint}</span>}
      </label>
      {children}
      {error && (
        <label className="label pt-1">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
}
