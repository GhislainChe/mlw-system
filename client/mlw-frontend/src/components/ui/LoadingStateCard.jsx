import { LoaderCircle } from 'lucide-react';

export default function LoadingStateCard({
  title = 'Loading...',
  description = 'Please wait while we load this section.',
  className = '',
}) {
  return (
    <div
      className={`rounded-[1.8rem] border border-dashed border-[#d5e2d7] bg-[#f8fbf8] px-6 py-8 text-center shadow-sm ${className}`.trim()}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <LoaderCircle className="h-5 w-5 animate-spin" />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-[#17392d]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
