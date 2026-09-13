import { useEffect, useState } from "react";
import { Sparkles, RotateCw } from "lucide-react";
import { explainArea } from "../services/api";
import { Skeleton } from "./LoadingState";

/**
 * Renders the AI (or fallback-template) explanation for an area.
 * The explanation text follows a simple "## Heading" + "- bullet" / "1. item"
 * structure from the backend prompt, which we render into styled sections.
 */
export default function AIExplanation({ areaId, onLoaded }) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let active = true;
    setState({ loading: true, error: null, data: null });
    explainArea(areaId)
      .then((data) => {
        if (!active) return;
        setState({ loading: false, error: null, data });
        onLoaded?.(data.explanation);
      })
      .catch((err) => {
        if (!active) return;
        setState({ loading: false, error: err.message, data: null });
      });
    return () => {
      active = false;
    };
  }, [areaId]);

  if (state.loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center gap-2 text-sm text-ink/50">
        <RotateCw size={14} /> Couldn't generate an explanation right now: {state.error}
      </div>
    );
  }

  const sections = parseSections(state.data.explanation);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-grow-50 text-grow-700">
          <Sparkles size={14} />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
          AI Interpretation {state.data.source === "fallback-template" && "(offline template)"}
        </span>
      </div>
      <div className="space-y-5">
        {sections.map((s, i) => (
          <div key={i}>
            {s.heading && <p className="mb-1.5 font-display text-base font-semibold text-ink">{s.heading}</p>}
            {s.lines.map((line, j) => (
              <p key={j} className="text-sm leading-relaxed text-ink/65">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function parseSections(text) {
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  const sections = [];
  let current = { heading: null, lines: [] };

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      if (current.heading || current.lines.length) sections.push(current);
      current = { heading: line.replace(/^##\s*/, ""), lines: [] };
    } else {
      current.lines.push(line.replace(/^-\s*/, "• ").replace(/^\d+\.\s*/, (m) => m));
    }
  }
  if (current.heading || current.lines.length) sections.push(current);
  return sections;
}
