export function scoreColor(score) {
  if (score >= 80) return "#0F5E35"; // grow-700
  if (score >= 65) return "#1E9E5A"; // grow-500
  if (score >= 50) return "#D9A441"; // amber-500
  return "#C2542E"; // clay-500
}

export function riskColor(label) {
  const map = { Low: "#1E9E5A", Medium: "#D9A441", High: "#C2542E" };
  return map[label] || "#64748B";
}

export function statusLabel(status) {
  const map = {
    completed: "Completed",
    under_construction: "Under Construction",
    approved: "Approved",
    proposed: "Proposed",
  };
  return map[status] || status;
}

export function statusColor(status) {
  const map = {
    completed: "#1E9E5A",
    under_construction: "#D9A441",
    approved: "#3B82F6",
    proposed: "#94A3B8",
  };
  return map[status] || "#94A3B8";
}

export function typeLabel(type) {
  const map = {
    metro: "Metro",
    highway: "Highway",
    railway: "Railway",
    airport: "Airport",
    industrial: "Industrial Projects",
    it_park_sez: "IT Parks / SEZ",
    township: "Townships",
    other: "Other Infrastructure",
  };
  return map[type] || type;
}

export function typeIcon(type) {
  const map = {
    metro: "TrainFront",
    highway: "Route",
    railway: "TramFront",
    airport: "Plane",
    industrial: "Factory",
    it_park_sez: "Building2",
    township: "Home",
    other: "Construction",
  };
  return map[type] || "MapPin";
}

export function medalForRank(rank) {
  return ["🥇", "🥈", "🥉"][rank] || `#${rank + 1}`;
}
