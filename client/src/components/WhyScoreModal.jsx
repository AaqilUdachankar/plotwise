import { X } from "lucide-react";
import { useEffect } from "react";

/**
 * Item 29 (UX requirement): "Why this score?" modal.
 * Opens with score calculation, positive/negative factors, sources, AI explanation.
 */
export default function WhyScoreModal({ open, onClose, analysis, area, aiExplanation }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-xl2 border border-border bg-surface p-6 shadow-soft md:rounded-xl2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink/40">Why this score</p>
            <p className="font-display text-xl font-semibold text-ink">{area?.name}: {analysis?.totalScore}/100</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink/50 hover:bg-ink/5" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-ink/80">Score calculation</p>
            <p className="mt-1 text-ink/55">
              Infrastructure 25% · Connectivity 20% · Employment 15% · Development 15% · Demand 15% · Risk adjustment 10%
              (applied as 100 − risk).
            </p>
          </div>

          <div>
            <p className="font-medium text-ink/80">Positive factors</p>
            <ul className="mt-1 list-inside list-disc space-y-1 text-ink/60">
              {(analysis?.strengths || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium text-ink/80">Negative factors</p>
            <ul className="mt-1 list-inside list-disc space-y-1 text-ink/60">
              {(analysis?.risks || []).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium text-ink/80">Data sources</p>
            <p className="mt-1 text-ink/55">
              Infrastructure project data and area scores are demo dataset entries in this deployment. See the
              Infrastructure tab for individual project sources.
            </p>
          </div>

          {aiExplanation && (
            <div>
              <p className="font-medium text-ink/80">AI explanation</p>
              <p className="mt-1 whitespace-pre-line text-ink/60">{aiExplanation.slice(0, 400)}{aiExplanation.length > 400 ? "…" : ""}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
