import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Building2, Scale, SlidersHorizontal } from "lucide-react";
import { getCityBySlug } from "../services/api";
import { addRecentSearch } from "../utils/localStore";
import GrowthScoreCard from "../components/GrowthScoreCard";
import ScoreRing from "../components/ScoreRing";
import AreaRanking from "../components/AreaRanking";
import Disclaimer from "../components/Disclaimer";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function CityDashboard() {
  const { city: slug } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const [compareIds, setCompareIds] = useState([]);
  const [filters, setFilters] = useState({ minScore: 0, risk: "any" });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    load();
  }, [slug]);

  function load() {
    setState({ loading: true, error: null, data: null });
    getCityBySlug(slug)
      .then((data) => {
        setState({ loading: false, error: null, data });
        addRecentSearch(data.city);
        document.title = `${data.city.name} | PlotWise AI`;
      })
      .catch((err) => setState({ loading: false, error: err.message, data: null }));
  }

  function toggleCompare(area) {
    setCompareIds((prev) => {
      if (prev.includes(area._id)) return prev.filter((id) => id !== area._id);
      if (prev.length >= 3) return prev;
      return [...prev, area._id];
    });
  }

  if (state.loading) return <LoadingState label="Analyzing city development data..." />;
  if (state.error) return <div className="mx-auto max-w-3xl px-5 py-20"><ErrorState message={state.error} onRetry={load} /></div>;

  const { city, overallScore, topAreas } = state.data;

  const filteredAreas = topAreas.filter((a) => {
    if (!a.analysis) return false;
    if (a.analysis.totalScore < filters.minScore) return false;
    if (filters.risk !== "any" && a.analysis.riskLabel !== filters.risk) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-ink/45"><MapPin size={14} /> {city.state}, {city.country}</p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-ink md:text-5xl">{city.name}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/55">{city.description}</p>
        </div>
        <ScoreRing score={overallScore} size={112} strokeWidth={9} label="Overall Growth Potential" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <GrowthScoreCard label="Infrastructure" score={avg(topAreas, "infrastructureScore")} />
        <GrowthScoreCard label="Connectivity" score={avg(topAreas, "connectivityScore")} />
        <GrowthScoreCard label="Employment Growth" score={avg(topAreas, "employmentScore")} />
        <GrowthScoreCard label="Development Activity" score={avg(topAreas, "developmentScore")} />
        <GrowthScoreCard label="Demand Potential" score={avg(topAreas, "demandScore")} />
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          to={`/city/${slug}/infrastructure`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-grow-500"
        >
          <Building2 size={15} /> View Infrastructure Projects
        </Link>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-grow-500"
        >
          <SlidersHorizontal size={15} /> Filters
        </button>
        {compareIds.length > 0 && (
          <button
            onClick={() => navigate(`/compare?areas=${compareIds.join(",")}`)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-grow-700 px-4 py-2 text-sm font-medium text-canvas hover:bg-grow-600"
          >
            <Scale size={15} /> Compare {compareIds.length} selected
          </button>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-6 rounded-xl2 border border-border bg-surface p-4 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-ink/60">Minimum score</span>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minScore}
              onChange={(e) => setFilters((f) => ({ ...f, minScore: Number(e.target.value) }))}
            />
            <span className="w-8 font-medium text-ink">{filters.minScore}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-ink/60">Risk</span>
            <select
              value={filters.risk}
              onChange={(e) => setFilters((f) => ({ ...f, risk: e.target.value }))}
              className="rounded-lg border border-border bg-canvas px-2 py-1"
            >
              <option value="any">Any</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>
      )}

      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Top Potential Areas</h2>
        <p className="mt-1 text-sm text-ink/50">Ranked by PlotWise AI's deterministic investment score. Select up to 3 to compare.</p>
        <div className="mt-6">
          <AreaRanking areas={filteredAreas} onCompareToggle={toggleCompare} comparingIds={compareIds} />
        </div>
      </div>
    </div>
  );
}

function avg(areas, key) {
  const valid = areas.filter((a) => a.analysis);
  if (!valid.length) return 0;
  return Math.round(valid.reduce((sum, a) => sum + a.analysis[key], 0) / valid.length);
}
