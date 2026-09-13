import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { listCities } from "../services/api";
import { getRecentSearches, addRecentSearch } from "../utils/localStore";
import { Skeleton } from "./LoadingState";

export default function PopularCities() {
  const [cities, setCities] = useState(null);
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRecent(getRecentSearches());
    listCities().then(setCities).catch(() => setCities([]));
  }, []);

  function go(city) {
    addRecentSearch(city);
    navigate(`/city/${city.slug}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      {recent.length > 0 && (
        <div className="mb-10">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-ink/50">
            <Clock size={14} /> Recent searches
          </p>
          <div className="flex flex-wrap gap-2">
            {recent.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate(`/city/${c.slug}`)}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-ink/70 hover:border-grow-500 hover:text-grow-700"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mb-4 text-sm font-medium text-ink/50">Explore cities in the dataset</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {!cities
          ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-24" />)
          : cities.map((city) => (
              <button
                key={city._id}
                onClick={() => go(city)}
                className="group flex flex-col items-start justify-between rounded-xl2 border border-border bg-surface p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-grow-500"
              >
                <div>
                  <p className="font-display text-base font-semibold text-ink">{city.name}</p>
                  <p className="text-xs text-ink/45">{city.state}</p>
                </div>
                <ArrowUpRight size={16} className="mt-3 text-ink/25 transition group-hover:text-grow-600" />
              </button>
            ))}
      </div>
    </div>
  );
}
