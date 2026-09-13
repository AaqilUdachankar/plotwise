export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-lg bg-ink/[0.06] ${className}`} />;
}

export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-grow-500 border-t-transparent" />
      <p className="text-sm text-ink/50">{label}</p>
    </div>
  );
}
