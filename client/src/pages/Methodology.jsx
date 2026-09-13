import { useEffect } from "react";
import { SCORE_WEIGHTS_DISPLAY } from "../data/methodology";

export default function Methodology() {
  useEffect(() => {
    document.title = "Scoring Methodology | PlotWise AI";
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink">Scoring Methodology</h1>
      <p className="mt-4 text-base leading-relaxed text-ink/65">
        Every PlotWise AI investment score is calculated by a deterministic backend formula — never
        by an AI model. The formula is fixed, documented here, and applied identically to every area.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl2 border border-border bg-surface shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-ink/[0.02]">
              <th className="px-5 py-3 text-left font-medium text-ink/50">Factor</th>
              <th className="px-5 py-3 text-left font-medium text-ink/50">Weight</th>
            </tr>
          </thead>
          <tbody>
            {SCORE_WEIGHTS_DISPLAY.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <td className="px-5 py-3 text-ink">{row.label}</td>
                <td className="px-5 py-3 font-medium text-grow-700">{row.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-xl2 border border-border bg-surface p-5 font-mono text-xs leading-relaxed text-ink/70 shadow-soft">
        score = (infrastructure × 0.25) + (connectivity × 0.20) + (employment × 0.15)
        <br />
        &nbsp;&nbsp;&nbsp;+ (development × 0.15) + (demand × 0.15) + ((100 − risk) × 0.10)
        <br />
        score = Math.round(score)
      </div>

      <h2 className="mt-10 font-display text-2xl font-semibold text-ink">What this score does and doesn't mean</h2>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/65">
        <li>• The score is an analytical estimate based on available structured data, not a prediction.</li>
        <li>• It does not predict or guarantee any investment returns.</li>
        <li>• Data quality directly affects score accuracy — demo data is illustrative, not verified.</li>
        <li>• Proposed projects carry more uncertainty than approved or under-construction ones, and are treated
            that way in the underlying risk score.</li>
        <li>• Users should independently verify project status, prices, and legal details before acting on any
            analysis shown here.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold text-ink">Role of AI</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/65">
        After the numeric score is calculated, it is passed — along with the structured factor data and
        infrastructure projects — to an AI model whose only job is to explain the score in plain language. The
        model is explicitly instructed to use only the supplied data, distinguish fact from interpretation, and
        never invent projects, prices, dates, or statistics.
      </p>
    </div>
  );
}
