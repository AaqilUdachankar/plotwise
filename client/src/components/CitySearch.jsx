
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { searchCities } from "../services/api";
import { addRecentSearch } from "../utils/localStore";

const EXAMPLES = [
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Delhi",
  "Jaipur",
  "Ahmedabad",
  "Chennai",
];

export default function CitySearch({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const boxRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e) {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        onClickOutside
      );
    };
  }, []);

  // Search suggestions with debounce
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSuggestions([]);
      setError("");
      return;
    }

    const handle = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const results = await searchCities(trimmedQuery);

        setSuggestions(
          Array.isArray(results) ? results : []
        );
      } catch (err) {
        console.error("City suggestions error:", err);
        setSuggestions([]);
        setError("Unable to search cities.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handle);
  }, [query]);

  // Navigate to city page
  function goToCity(city) {
    if (!city || !city.slug) {
      console.error("Invalid city data:", city);
      return;
    }

    addRecentSearch(city);

    setOpen(false);
    setQuery("");
    setSuggestions([]);
    setError("");

    navigate(`/city/${city.slug}`);
  }

  // Search button / Enter key
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Search button clicked");
    console.log("Query:", query);

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const results = await searchCities(trimmedQuery);

      console.log("Search results:", results);

      if (!Array.isArray(results) || results.length === 0) {
        setError("City not found. Try another city.");
        setOpen(true);
        return;
      }

      // Navigate to first matching city
      goToCity(results[0]);
    } catch (err) {
      console.error("Search failed:", err);

      setError(
        err.message || "Unable to search cities. Please try again."
      );

      setOpen(true);
    } finally {
      setLoading(false);
    }
  }

  // Popular city button
  function handleExampleClick(name) {
    setQuery(name);
    setOpen(true);
    setError("");
  }

  return (
    <div
      ref={boxRef}
      className="relative w-full max-w-xl"
    >
      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-xl2 border border-border bg-surface p-1.5 shadow-soft"
      >
        <Search
          size={18}
          className="ml-3 shrink-0 text-ink/35"
        />

        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setError("");
          }}
          onFocus={() => setOpen(true)}
          placeholder="Enter an Indian city..."
          className="w-full min-w-0 bg-transparent py-2.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none"
          aria-label="Search Indian city"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-grow-700 px-4 py-2.5 text-sm font-medium text-canvas transition hover:bg-grow-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={14}
                className="animate-spin"
              />
              Searching...
            </>
          ) : (
            <>
              Search
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      {/* Suggestions dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-xl2 border border-border bg-surface p-2 shadow-soft">
          {error ? (
            <p className="px-3 py-2.5 text-sm text-red-500">
              {error}
            </p>
          ) : query.trim() ? (
            loading ? (
              <div className="flex items-center gap-2 px-3 py-3 text-sm text-ink/50">
                <Loader2
                  size={15}
                  className="animate-spin"
                />
                Searching cities...
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((city) => (
                <button
                  key={city._id || city.slug}
                  type="button"
                  onClick={() => goToCity(city)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-grow-50"
                >
                  <span className="text-ink">
                    {city.name}
                  </span>

                  <span className="text-ink/40">
                    {city.state}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-3 py-2.5 text-sm text-ink/40">
                No matching city found.
              </p>
            )
          ) : (
            <div className="p-1">
              <p className="px-2 pb-1.5 text-xs font-medium uppercase tracking-wide text-ink/35">
                Popular cities
              </p>

              <div className="flex flex-wrap gap-1.5 px-2 pb-1">
                {EXAMPLES.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleExampleClick(name)}
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