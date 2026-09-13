import { statusLabel, statusColor } from "../utils/format";

const STATUS_ORDER = { completed: 0, under_construction: 1, approved: 2, proposed: 3 };

export default function InfrastructureTimeline({ projects }) {
  const sorted = [...projects].sort((a, b) => {
    const yearA = parseInt(String(a.estimatedCompletion).match(/\d{4}/)?.[0] || "9999", 10);
    const yearB = parseInt(String(b.estimatedCompletion).match(/\d{4}/)?.[0] || "9999", 10);
    if (yearA !== yearB) return yearA - yearB;
    return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
  });

  return (
    <div className="relative space-y-6 pl-6">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
      {sorted.map((p) => {
        const color = statusColor(p.status);
        return (
          <div key={p._id} className="relative">
            <span
              className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-surface"
              style={{ backgroundColor: color }}
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">{p.estimatedCompletion}</p>
            <p className="mt-0.5 font-medium text-ink">{p.name}</p>
            <p className="mt-0.5 text-sm text-ink/55">{p.description}</p>
            <span
              className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
              style={{ backgroundColor: `${color}1A`, color }}
            >
              {statusLabel(p.status)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
