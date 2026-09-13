import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#1E9E5A", "#D9A441", "#3B82F6"];
const FACTORS = [
  { key: "infrastructureScore", label: "Infrastructure" },
  { key: "connectivityScore", label: "Connectivity" },
  { key: "employmentScore", label: "Employment" },
  { key: "developmentScore", label: "Development" },
  { key: "demandScore", label: "Demand" },
];

export default function ComparisonChart({ rows }) {
  const data = FACTORS.map((f) => {
    const point = { factor: f.label };
    rows.forEach((r) => {
      point[r.name] = r[f.key];
    });
    return point;
  });

  return (
    <div className="h-80 rounded-xl2 border border-border bg-surface p-5 shadow-soft">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#E7E5E1" />
          <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12, fill: "#0F172A99" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#0F172A55" }} />
          {rows.map((r, i) => (
            <Radar key={r.areaId} name={r.name} dataKey={r.name} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.2} strokeWidth={2} />
          ))}
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
