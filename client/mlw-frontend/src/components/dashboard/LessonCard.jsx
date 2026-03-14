import { BookOpen, Lock, PlayCircle } from 'lucide-react';

export default function LessonCard({ title, lessonNumber, status, locked = false }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4f0] text-[#2d6c49]">
            {locked ? <Lock className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#17392d]">{title}</h3>
            <p className="text-sm text-slate-500">Lesson {lessonNumber}</p>
          </div>
        </div>

        <span
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            locked ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700',
          ].join(' ')}
        >
          {locked ? 'Pro Lesson' : status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          {locked ? 'Unlock this lesson with Pro access.' : 'Continue where you left off.'}
        </p>
        <button
          type="button"
          className={[
            'inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200',
            locked
              ? 'border border-slate-200 bg-slate-50 text-slate-500'
              : 'bg-[#17392d] text-white hover:bg-[#214d3d]',
          ].join(' ')}
        >
          {locked ? <Lock className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
          {locked ? 'Locked' : 'Resume'}
        </button>
      </div>
    </article>
  );
}
