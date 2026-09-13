import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-lg font-semibold text-ink">PlotWise AI</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
              A decision-support tool for exploring where Indian cities are growing — built on
              infrastructure signals, not guesswork, and never a guarantee of returns.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/60">
              <li><Link to="/" className="hover:text-grow-700">Search a city</Link></li>
              <li><Link to="/compare" className="hover:text-grow-700">Compare areas</Link></li>
              <li><Link to="/methodology" className="hover:text-grow-700">Scoring methodology</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/60">
              <li><Link to="/about" className="hover:text-grow-700">About PlotWise AI</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-ink/45">
          PlotWise AI is an informational decision-support platform. Its scores and AI-generated
          explanations are estimates based on available data and should not be considered
          financial, legal, or investment advice. Real-estate investments involve risk. Users
          should independently verify project status, property prices, legal information,
          approvals, and other relevant factors before making decisions.
        </div>
      </div>
    </footer>
  );
}
