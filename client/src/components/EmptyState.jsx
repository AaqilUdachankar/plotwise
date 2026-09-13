export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-border bg-surface py-16 text-center">
      {Icon && <Icon size={26} className="text-ink/30" />}
      <p className="text-sm font-medium text-ink/70">{title}</p>
      {description && <p className="max-w-sm text-sm text-ink/45">{description}</p>}
      {action}
    </div>
  );
}
