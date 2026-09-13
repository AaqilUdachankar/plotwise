import { scoreColor } from "../utils/format";

export default function GrowthScoreCard({ label, score, hint }) {
  const color = scoreColor(score);
  return (
    <div className="rounded-xl2 border border-border bg-surface p-5 shadow-soft">
      <p className="text-sm text-ink/50">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold" style={{ color }}>
        {score}
        <span className="text-base text-ink/30">/100</span>
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      {hint && <p className="mt-2 text-xs text-ink/40">{hint}</p>}
    </div>
  );
}
