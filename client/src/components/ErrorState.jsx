import { AlertTriangle, RotateCw } from "lucide-react";

export default function ErrorState({ message = "Unable to load this data.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-border bg-surface py-16 text-center">
      <AlertTriangle size={28} className="text-clay-500" />
      <p className="max-w-sm text-sm text-ink/60">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-canvas transition hover:bg-ink/85"
        >
          <RotateCw size={14} /> Try again
        </button>
      )}
    </div>
  );
}
