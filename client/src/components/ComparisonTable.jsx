import RiskBadge from "./RiskBadge";
import { scoreColor } from "../utils/format";

const ROWS = [
  { key: "totalScore", label: "Overall Score" },
  { key: "infrastructureScore", label: "Infrastructure" },
  { key: "connectivityScore", label: "Connectivity" },
  { key: "employmentScore", label: "Employment" },
  { key: "developmentScore", label: "Development" },
  { key: "demandScore", label: "Demand" },
  { key: "riskScore", label: "Risk" },
];

export default function ComparisonTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl2 border border-border bg-surface shadow-soft">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-medium text-ink/50">Factor</th>
            {rows.map((r) => (
              <th key={r.areaId} className="px-4 py-3 text-left font-medium text-ink">
                {r.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((factor) => (
            <tr key={factor.key} className="border-b border-border last:border-0">
              <td className="px-4 py-3 text-ink/60">{factor.label}</td>
              {rows.map((r) => (
                <td key={r.areaId} className="px-4 py-3 font-medium" style={{ color: factor.key === "riskScore" ? "inherit" : scoreColor(r[factor.key]) }}>
                  {r[factor.key]}
                  {factor.key === "totalScore" && "/100"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
