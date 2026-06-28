import { Check } from 'lucide-react';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: simple progress bar */}
      <div className="block sm:hidden mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-base-content">
            {steps[currentStep]?.label}
          </span>
          <span className="text-xs text-base-content/60">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        <progress
          className="progress progress-primary w-full"
          value={currentStep + 1}
          max={steps.length}
        />
      </div>

      {/* Desktop: full step list */}
      <ul className="hidden sm:flex steps steps-horizontal w-full text-xs">
        {steps.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;
          return (
            <li
              key={step.label}
              className={`step ${done || active ? 'step-primary' : ''}`}
            >
              {done ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" /> {step.label}
                </span>
              ) : (
                step.label
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
