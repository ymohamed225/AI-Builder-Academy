"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepsTitles: string[];
  onStepClick: (stepNumber: number) => void;
}

export function ProgressBar({ currentStep, totalSteps, stepsTitles, onStepClick }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Top Header & Percentage */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-300">
        <span className="text-brand-cyan font-bold">
          Étape {currentStep} sur {totalSteps} — <span className="text-white">{stepsTitles[currentStep - 1]}</span>
        </span>
        <span className="font-mono text-slate-400 font-bold">{percentage}% complété</span>
      </div>

      {/* Main Progress Bar Fill */}
      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-brand-cyan via-brand-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stepper Dots (Desktop View) */}
      <div className="hidden md:flex items-center justify-between pt-1">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => {
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <button
              key={stepNum}
              onClick={() => {
                if (stepNum < currentStep) onStepClick(stepNum);
              }}
              disabled={stepNum > currentStep}
              className={`flex items-center gap-2 group focus:outline-none ${
                stepNum < currentStep ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30"
                    : isCurrent
                    ? "bg-brand-cyan text-slate-950 font-black shadow-lg shadow-brand-cyan/40 scale-110"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
              </div>
              <span
                className={`text-xs font-semibold max-w-[100px] truncate ${
                  isCurrent
                    ? "text-white"
                    : isDone
                    ? "text-slate-300 group-hover:text-brand-cyan"
                    : "text-slate-500"
                }`}
              >
                {stepsTitles[stepNum - 1]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
