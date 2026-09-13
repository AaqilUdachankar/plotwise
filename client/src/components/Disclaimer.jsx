import { ShieldAlert } from "lucide-react";

export default function Disclaimer({ compact = false }) {
  if (compact) {
    return (
      <p className="flex items-start gap-2 text-xs leading-relaxed text-ink/50">
        <ShieldAlert size={14} className="mt-0.5 shrink-0" />
        Scores are analytical estimates, not guaranteed investment returns.
      </p>
    );
  }

  return (
    <div className="flex gap-3 rounded-xl2 border border-border bg-amber-500/5 p-4">
      <ShieldAlert size={18} className="mt-0.5 shrink-0 text-amber-500" />
      <p className="text-sm leading-relaxed text-ink/70">
        PlotWise AI provides analytical insights for informational purposes only. Scores are
        estimates based on available data and should not be treated as guaranteed investment
        returns.
      </p>
    </div>
  );
}
