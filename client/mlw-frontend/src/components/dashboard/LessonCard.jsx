import { BookOpen, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonCard({ lesson }) {
  const navigate = useNavigate();
  const progressPercent =
    Number(lesson.completed) === 1 ? 100 : Math.max(0, Number(lesson.progress_percent) || 0);
  const isCompleted = progressPercent === 100;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4f0] text-[#2d6c49]">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {lesson.language_name}
            </p>
            <h3 className="mt-1 text-base font-semibold text-[#17392d]">
              {lesson.lesson_title}
            </h3>
            <p className="text-sm text-slate-500">Lesson {lesson.order_number}</p>
          </div>
        </div>

        <span
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700',
          ].join(' ')}
        >
          {isCompleted ? 'Completed' : 'In Progress'}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
            <span>{isCompleted ? 'Completed' : 'Progress'}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-emerald-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/lesson/${lesson.lesson_id}`)}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#17392d] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#214d3d]"
        >
          <PlayCircle className="h-4 w-4" />
          {isCompleted ? 'Review' : 'Continue'}
        </button>
      </div>
    </article>
  );
}
