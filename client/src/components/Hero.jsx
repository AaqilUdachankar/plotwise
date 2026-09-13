import CitySearch from "./CitySearch";
import { TrendingUp, ShieldCheck, MapPinned } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-grow-50/60 to-canvas">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-grow-200 bg-grow-50 px-3 py-1 text-xs font-medium text-grow-700">
            <TrendingUp size={13} /> Decision support, not financial advice
          </span>

          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-ink md:text-6xl">
            Invest smarter. Understand where India is growing.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
            PlotWise AI analyzes infrastructure, connectivity, economic activity and future
            development signals to help you discover potentially high-growth real-estate areas.
          </p>

          <CitySearch autoFocus />

          <div className="mt-2 flex flex-wrap gap-6 text-sm text-ink/50">
            <span className="flex items-center gap-1.5"><MapPinned size={15} /> 10 Indian cities, 29+ tracked areas</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={15} /> Transparent, source-linked data</span>
          </div>
        </div>
      </div>
    </section>
  );
}
