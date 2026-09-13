import * as Icons from "lucide-react";
import { statusLabel, statusColor, typeIcon } from "../utils/format";

export default function InfrastructureCard({ project }) {
  const Icon = Icons[typeIcon(project.type)] || Icons.MapPin;
  const color = statusColor(project.status);
  const isDemo = project.dataMode === "demo";

  return (
    <div className="rounded-xl2 border border-border bg-surface p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-grow-50 text-grow-700">
            <Icon size={18} />
          </span>
          <div>
            <p className="font-medium text-ink">{project.name}</p>
            <p className="text-xs text-ink/45">{project.location}</p>
          </div>
        </div>
        {isDemo && (
          <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-500">
            Demo Data
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink/65">{project.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium" style={{ backgroundColor: `${color}1A`, color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          {statusLabel(project.status)}
        </span>
        <span className="rounded-full bg-ink/5 px-2.5 py-1 font-medium text-ink/60">
          Expected {project.estimatedCompletion}
        </span>
        <span className="rounded-full bg-ink/5 px-2.5 py-1 font-medium capitalize text-ink/60">
          {project.impactLevel} impact
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
        <span className="text-ink/45">{project.source}</span>
        <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="font-medium text-grow-700 hover:underline">
          View Source
        </a>
      </div>
    </div>
  );
}
