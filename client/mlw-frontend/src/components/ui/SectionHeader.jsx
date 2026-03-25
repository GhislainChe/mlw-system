export default function SectionHeader({ eyebrow, title, subtitle, className = '' }) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 font-heading text-[1.3rem] font-semibold tracking-[-0.03em] text-[#17392d]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}
