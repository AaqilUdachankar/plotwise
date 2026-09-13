import { useEffect } from "react";
import { Target, Database, Bot, ShieldCheck } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "About | PlotWise AI";
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink">About PlotWise AI</h1>
      <p className="mt-4 text-base leading-relaxed text-ink/65">
        PlotWise AI is a decision-support platform for exploring real-estate growth potential across
        Indian cities. It brings together infrastructure development, connectivity, employment
        activity, and demand signals into one transparent, explainable score — so you can understand
        <em> why </em> an area looks promising, not just that it does.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card icon={Target} title="What it is" body="A research and exploration tool that structures public infrastructure signals into a comparable score across areas and cities." />
        <Card icon={Database} title="What it isn't" body="Not a guarantee of returns, not financial or legal advice, and not a substitute for independent due diligence." />
        <Card icon={Bot} title="How AI is used" body="An AI layer explains the deterministic score in plain language, using only the structured data it's given — never inventing facts." />
        <Card icon={ShieldCheck} title="Data honesty" body="Every project is labeled Demo Dataset or Verified/Public Source, with a source link and last-verified date." />
      </div>

      <div className="mt-10 rounded-xl2 border border-border bg-amber-500/5 p-5 text-sm leading-relaxed text-ink/70">
        PlotWise AI is an informational decision-support platform. Its scores and AI-generated
        explanations are estimates based on available data and should not be considered financial,
        legal, or investment advice. Real-estate investments involve risk. Users should independently
        verify project status, property prices, legal information, approvals, and other relevant
        factors before making decisions.
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, body }) {
  return (
    <div className="rounded-xl2 border border-border bg-surface p-5 shadow-soft">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-grow-50 text-grow-700">
        <Icon size={18} />
      </span>
      <p className="mt-3 font-medium text-ink">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink/55">{body}</p>
    </div>
  );
}
