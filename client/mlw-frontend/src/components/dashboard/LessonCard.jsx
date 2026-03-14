import { BookOpen, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonCard({ lesson }) {
  const navigate = useNavigate();
  const isCompleted = Number(lesson.completed) === 1;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4f0] text-[#2d6c49]">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#17392d]">{lesson.title}</h3>
            <p className="text-sm text-slate-500">Lesson #{lesson.id}</p>
          </div>
        </div>

        <span
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
          ].join(' ')}
        >
          {isCompleted ? 'Completed' : 'In Progress'}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          {isCompleted ? 'Completed successfully. Review anytime.' : 'Continue where you left off.'}
        </p>
        <button
          type="button"
          onClick={() => navigate(`/learn/${lesson.id}`)}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#17392d] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#214d3d]"
        >
          <PlayCircle className="h-4 w-4" />
          Resume
        </button>
      </div>
    </article>
  );
}
