import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Scale } from "lucide-react";
import { listCities, getCityBySlug, compareAreasAI } from "../services/api";
import ComparisonTable from "../components/ComparisonTable";
import ComparisonChart from "../components/ComparisonChart";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Skeleton } from "../components/LoadingState";

export default function Compare() {
  const [params, setParams] = useSearchParams();
  const areaIds = (params.get("areas") || "").split(",").filter(Boolean);

  const [cities, setCities] = useState([]);
  const [selectedCitySlug, setSelectedCitySlug] = useState("");
  const [cityAreas, setCityAreas] = useState([]);
  const [picked, setPicked] = useState(areaIds);

  const [result, setResult] = useState({ loading: false, error: null, data: null });

  useEffect(() => {
    document.title = "Compare Areas | PlotWise AI";
    listCities().then(setCities).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedCitySlug) return;
    getCityBySlug(selectedCitySlug).then((d) => setCityAreas(d.topAreas)).catch(() => setCityAreas([]));
  }, [selectedCitySlug]);

  useEffect(() => {
    if (areaIds.length >= 2 && areaIds.length <= 3) {
      runComparison(areaIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("areas")]);

  function runComparison(ids) {
    setResult({ loading: true, error: null, data: null });
    compareAreasAI(ids)
      .then((data) => setResult({ loading: false, error: null, data }))
      .catch((err) => setResult({ loading: false, error: err.message, data: null }));
  }

  function togglePick(areaId) {
    setPicked((prev) => {
      if (prev.includes(areaId)) return prev.filter((id) => id !== areaId);
      if (prev.length >= 3) return prev;
      return [...prev, areaId];
    });
  }

  function submitPicked() {
    if (picked.length < 2) return;
    setParams({ areas: picked.join(",") });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-4xl font-semibold text-ink">Compare Areas</h1>
      <p className="mt-2 max-w-xl text-sm text-ink/55">
        Choose 2-3 areas within a city (e.g. Whitefield vs Electronic City vs Sarjapur Road) to compare their PlotWise AI
        scores side by side.
      </p>

      <div className="mt-8 rounded-xl2 border border-border bg-surface p-5 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-ink/60">City</label>
          <select
            value={selectedCitySlug}
            onChange={(e) => {
              setSelectedCitySlug(e.target.value);
              setPicked([]);
            }}
            className="rounded-lg border border-border bg-canvas px-3 py-2 text-sm"
          >
            <option value="">Select a city...</option>
            {cities.map((c) => (
              <option key={c._id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          {picked.length >= 2 && (
            <button
              onClick={submitPicked}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-grow-700 px-4 py-2 text-sm font-medium text-canvas hover:bg-grow-600"
            >
              <Scale size={14} /> Compare {picked.length} areas
            </button>
          )}
        </div>

        {cityAreas.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {cityAreas.map((a) => (
              <button
                key={a._id}
                onClick={() => togglePick(a._id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                  picked.includes(a._id) ? "border-grow-500 bg-grow-50 text-grow-700" : "border-border text-ink/60"
                }`}
              >
                {a.name} {a.analysis ? `· ${a.analysis.totalScore}` : ""}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        {areaIds.length < 2 ? (
          <EmptyState icon={Scale} title="Pick areas to compare" description="Select 2 or 3 areas above and press Compare." />
        ) : result.loading ? (
          <div className="space-y-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-40" />
          </div>
        ) : result.error ? (
          <ErrorState message={result.error} onRetry={() => runComparison(areaIds)} />
        ) : (
          result.data && (
            <div className="space-y-8">
              <ComparisonTable rows={result.data.comparisonRows} />
              <ComparisonChart rows={result.data.comparisonRows} />

              <div className="rounded-xl2 border border-border bg-surface p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-grow-50 text-grow-700">
                    <Sparkles size={14} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                    AI Comparison {result.data.source === "fallback-template" && "(offline template)"}
                  </span>
                </div>
                <div className="whitespace-pre-line text-sm leading-relaxed text-ink/65">
                  {result.data.summary.replace(/^##\s*/gm, "").replace(/^-\s*/gm, "• ")}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
