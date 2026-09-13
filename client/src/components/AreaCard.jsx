import { Link } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import ScoreRing from "./ScoreRing";
import RiskBadge from "./RiskBadge";
import { medalForRank } from "../utils/format";

export default function AreaCard({ area, rank, onCompareToggle, isComparing }) {
  const a = area.analysis;
  if (!a) return null;

  return (
    <div className="flex flex-col justify-between rounded-xl2 border border-border bg-surface p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg leading-none">{medalForRank(rank)}</p>
            <p className="mt-2 font-display text-lg font-semibold text-ink">{area.name}</p>
            <p className="text-xs text-ink/45">{area.locality}</p>
          </div>
          <ScoreRing score={a.totalScore} size={64} strokeWidth={6} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <RiskBadge label={a.riskLabel} />
          <span className="rounded-full bg-grow-50 px-2.5 py-1 text-xs font-medium text-grow-700">
            {a.growthPotential} potential
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">Key drivers</p>
          <ul className="mt-1.5 space-y-1 text-sm text-ink/65">
            {a.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-grow-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">Risks</p>
          <ul className="mt-1.5 space-y-1 text-sm text-ink/65">
            {a.risks.slice(0, 2).map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-clay-500" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Link
          to={`/area/${area._id}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-sm font-medium text-canvas transition hover:bg-ink/85"
        >
          View Analysis <ArrowRight size={14} />
        </Link>
        {onCompareToggle && (
          <button
            onClick={() => onCompareToggle(area)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${
              isComparing ? "border-grow-500 bg-grow-50 text-grow-700" : "border-border text-ink/70 hover:bg-ink/5"
            }`}
          >
            <Scale size={14} /> Compare
          </button>
        )}
      </div>
    </div>
  );
}
