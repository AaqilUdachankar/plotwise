import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HelpCircle, Bookmark, BookmarkCheck, Building2 } from "lucide-react";
import { getAreaById } from "../services/api";
import { isAreaSaved, toggleSavedAnalysis } from "../utils/localStore";
import ScoreRing from "../components/ScoreRing";
import RiskBadge from "../components/RiskBadge";
import ScoreBreakdown from "../components/ScoreBreakdown";
import AIExplanation from "../components/AIExplanation";
import InfrastructureTimeline from "../components/InfrastructureTimeline";
import MapView from "../components/MapView";
import WhyScoreModal from "../components/WhyScoreModal";
import Disclaimer from "../components/Disclaimer";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function AreaDetail() {
  const { id } = useParams();
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiText, setAiText] = useState("");

  useEffect(() => {
    load();
  }, [id]);

  function load() {
    setState({ loading: true, error: null, data: null });
    getAreaById(id)
      .then((data) => {
        setState({ loading: false, error: null, data });
        setSaved(isAreaSaved(id));
        document.title = `${data.area.name} | PlotWise AI`;
      })
      .catch((err) => setState({ loading: false, error: err.message, data: null }));
  }

  function handleSave() {
    const { area, city, analysis } = state.data;
    const nowSaved = toggleSavedAnalysis({
      areaId: area._id,
      areaName: area.name,
      cityName: city.name,
      citySlug: city.slug,
      totalScore: analysis.totalScore,
    });
    setSaved(nowSaved);
  }

  if (state.loading) return <LoadingState label="Calculating investment analysis..." />;
  if (state.error) return <div className="mx-auto max-w-3xl px-5 py-20"><ErrorState message={state.error} onRetry={load} /></div>;

  const { area, city, analysis, infrastructureProjects } = state.data;

  if (!analysis) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20">
        <EmptyState title="No analysis available" description="This area doesn't have a generated investment analysis yet." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <Link to={`/city/${city.slug}`} className="text-sm text-ink/45 hover:text-grow-700">&larr; {city.name}</Link>

      <div className="mt-2 flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-ink/45">{city.name}, {city.state}</p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-ink md:text-5xl">{area.name}</h1>
          <p className="mt-2 text-sm text-ink/50">{area.locality}{area.currentPriceRange ? ` · ${area.currentPriceRange}` : ""}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <RiskBadge label={analysis.riskLabel} />
            <span className="rounded-full bg-grow-50 px-2.5 py-1 text-xs font-medium text-grow-700">{analysis.growthPotential} potential</span>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-ink/60 hover:border-grow-500"
            >
              {saved ? <BookmarkCheck size={13} className="text-grow-700" /> : <Bookmark size={13} />}
              {saved ? "Saved" : "Save analysis"}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ScoreRing score={analysis.totalScore} size={120} strokeWidth={9} label="Investment Score" />
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 self-start rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-ink/70 hover:border-grow-500"
          >
            <HelpCircle size={14} /> Why this score?
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Score Breakdown</h2>
        <div className="mt-5">
          <ScoreBreakdown analysis={analysis} />
        </div>
      </div>

      <div className="mt-10 rounded-xl2 border border-border bg-surface p-6 shadow-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Why PlotWise AI Ranked This Area</h2>
        <div className="mt-5">
          <AIExplanation areaId={area._id} onLoaded={setAiText} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Growth Drivers</h2>
          <ul className="mt-4 space-y-2.5">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink/65">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grow-500" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Potential Risks</h2>
          <ul className="mt-4 space-y-2.5">
            {analysis.risks.map((r, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink/65">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" /> {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">Nearby Infrastructure &amp; Development Timeline</h2>
          <Link to={`/city/${city.slug}/infrastructure`} className="inline-flex items-center gap-1.5 text-sm font-medium text-grow-700 hover:underline">
            <Building2 size={14} /> View all projects
          </Link>
        </div>
        {infrastructureProjects.length ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <InfrastructureTimeline projects={infrastructureProjects} />
            <MapView city={city} areas={[area]} projects={infrastructureProjects} height={360} />
          </div>
        ) : (
          <EmptyState title="No nearby projects tracked" description="No infrastructure projects are linked to this specific area yet." />
        )}
      </div>

      <WhyScoreModal open={modalOpen} onClose={() => setModalOpen(false)} analysis={analysis} area={area} aiExplanation={aiText} />
    </div>
  );
}
