import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { getCityBySlug, getInfrastructureByCity } from "../services/api";
import InfrastructureCard from "../components/InfrastructureCard";
import MapView from "../components/MapView";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { typeLabel, typeIcon } from "../utils/format";

const CATEGORIES = ["metro", "highway", "railway", "airport", "industrial", "it_park_sez", "township", "other"];

export default function CityInfrastructure() {
  const { city: slug } = useParams();
  const [state, setState] = useState({ loading: true, error: null, city: null, infra: null, areas: [] });
  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
    load();
  }, [slug]);

  function load() {
    setState((s) => ({ ...s, loading: true, error: null }));
    getCityBySlug(slug)
      .then((cityData) => {
        document.title = `${cityData.city.name} Infrastructure | PlotWise AI`;
        return getInfrastructureByCity(cityData.city._id).then((infra) => {
          setState({ loading: false, error: null, city: cityData.city, infra, areas: cityData.topAreas });
        });
      })
      .catch((err) => setState((s) => ({ ...s, loading: false, error: err.message })));
  }

  if (state.loading) return <LoadingState label="Loading infrastructure projects..." />;
  if (state.error) return <div className="mx-auto max-w-3xl px-5 py-20"><ErrorState message={state.error} onRetry={load} /></div>;

  const { city, infra, areas } = state;
  const projects = activeType === "all" ? infra.projects : infra.grouped[activeType] || [];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <Link to={`/city/${slug}`} className="text-sm text-ink/45 hover:text-grow-700">&larr; {city.name}</Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Infrastructure &amp; Development Projects</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink/55">
        Government and public infrastructure projects tracked for {city.name}, grouped by category. Every project links to its
        source.
      </p>

      <div className="mt-8">
        <MapView city={city} areas={areas} projects={infra.projects} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveType("all")}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${activeType === "all" ? "border-grow-500 bg-grow-50 text-grow-700" : "border-border text-ink/60"}`}
        >
          All ({infra.projects.length})
        </button>
        {CATEGORIES.map((type) => {
          const count = infra.grouped[type]?.length || 0;
          if (!count) return null;
          const Icon = Icons[typeIcon(type)] || Icons.MapPin;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium ${activeType === type ? "border-grow-500 bg-grow-50 text-grow-700" : "border-border text-ink/60"}`}
            >
              <Icon size={13} /> {typeLabel(type)} ({count})
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {projects.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((p) => (
              <InfrastructureCard key={p._id} project={p} />
            ))}
          </div>
        ) : (
          <EmptyState icon={Icons.Construction} title="No projects in this category" description="Try a different category or view all projects." />
        )}
      </div>
    </div>
  );
}
