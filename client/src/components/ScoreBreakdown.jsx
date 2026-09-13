import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { scoreColor } from "../utils/format";

const FACTORS = [
  { key: "infrastructureScore", label: "Infrastructure" },
  { key: "connectivityScore", label: "Connectivity" },
  { key: "employmentScore", label: "Employment" },
  { key: "developmentScore", label: "Development" },
  { key: "demandScore", label: "Demand" },
];

export default function ScoreBreakdown({ analysis, onExplainFactor }) {
  const radarData = FACTORS.map((f) => ({ factor: f.label, value: analysis[f.key] }));
  const riskFriendly = 100 - analysis.riskScore;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl2 border border-border bg-surface p-5 shadow-soft">
        <p className="mb-2 text-sm font-medium text-ink/60">Factor radar</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="75%">
              <PolarGrid stroke="#E7E5E1" />
              <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12, fill: "#0F172A99" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#0F172A55" }} />
              <Radar dataKey="value" stroke="#1E9E5A" fill="#1E9E5A" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl2 border border-border bg-surface p-5 shadow-soft">
        <p className="mb-4 text-sm font-medium text-ink/60">Score breakdown</p>
        <div className="space-y-4">
          {FACTORS.map((f) => (
            <ScoreRow key={f.key} label={f.label} value={analysis[f.key]} onClick={() => onExplainFactor?.(f.label, analysis[f.key])} />
          ))}
          <ScoreRow label="Risk (inverted for scoring)" value={riskFriendly} rawRisk={analysis.riskScore} onClick={() => onExplainFactor?.("Risk", analysis.riskScore)} />
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value, rawRisk, onClick }) {
  const color = scoreColor(value);
  return (
    <button onClick={onClick} className="group block w-full text-left">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-ink/70">{label}</span>
        <span className="text-sm font-medium text-ink">
          {rawRisk !== undefined ? `${rawRisk}/100` : `${value}/100`}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </button>
  );
}
