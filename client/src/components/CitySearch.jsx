import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { searchCities } from "../services/api";
import { addRecentSearch } from "../utils/localStore";

const EXAMPLES = ["Bengaluru", "Mumbai", "Hyderabad", "Pune", "Delhi", "Jaipur", "Ahmedabad", "Chennai"];

export default function CitySearch({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (query.trim().length < 1) {
        setSuggestions([]);
        return;
      }
      searchCities(query)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    }, 250); // debounced search
    return () => clearTimeout(handle);
  }, [query]);

  function goToCity(city) {
    addRecentSearch(city);
    setOpen(false);
    setQuery("");
    navigate(`/city/${city.slug}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const results = await searchCities(query);
      if (results.length > 0) {
        goToCity(results[0]);
      }
    } catch {
      // stay put; the input remains for the user to adjust
    }
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-xl2 border border-border bg-surface p-1.5 shadow-soft">
        <Search size={18} className="ml-3 shrink-0 text-ink/35" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Enter an Indian city..."
          className="w-full bg-transparent py-2.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-grow-700 px-4 py-2.5 text-sm font-medium text-canvas transition hover:bg-grow-600"
        >
          Search <ArrowRight size={14} />
        </button>
      </form>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-xl2 border border-border bg-surface p-2 shadow-soft">
          {query.trim() ? (
            suggestions.length ? (
              suggestions.map((c) => (
                <button
                  key={c._id}
                  onClick={() => goToCity(c)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-grow-50"
                >
                  <span className="text-ink">{c.name}</span>
                  <span className="text-ink/40">{c.state}</span>
                </button>
              ))
            ) : (
              <p className="px-3 py-2.5 text-sm text-ink/40">No matching city in the demo dataset yet.</p>
            )
          ) : (
            <div className="p-1">
              <p className="px-2 pb-1.5 text-xs font-medium uppercase tracking-wide text-ink/35">Popular cities</p>
              <div className="flex flex-wrap gap-1.5 px-2 pb-1">
                {EXAMPLES.map((name) => (
                  <button
                    key={name}
                    onClick={() => setQuery(name)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-ink/60 hover:border-grow-500 hover:text-grow-700"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
