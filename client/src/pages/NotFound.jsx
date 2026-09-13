import { Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-28 text-center">
      <CompassIcon size={32} className="text-ink/30" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-sm text-ink/55">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-canvas hover:bg-ink/85">
        Back to home
      </Link>
    </div>
  );
}
