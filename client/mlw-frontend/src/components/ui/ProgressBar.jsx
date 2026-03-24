function clamp(value) {
  const numeric = Number(value);

  if (Number.isNaN(numeric)) return 0;
  if (numeric < 0) return 0;
  if (numeric > 100) return 100;
  return numeric;
}

export default function ProgressBar({
  value = 0,
  trackClassName = 'bg-emerald-100',
  barClassName = 'bg-emerald-600',
  className = 'h-2.5 rounded-full',
}) {
  const safeValue = clamp(value);

  return (
    <div className={`overflow-hidden ${trackClassName} ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${barClassName}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
