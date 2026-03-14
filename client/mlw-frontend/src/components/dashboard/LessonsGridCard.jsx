import { BookOpen, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonsGridCard({ lesson, index }) {
  const navigate = useNavigate();
  const isCompleted = Number(lesson.completed) === 1;
  const isPro = Number(lesson.is_pro) === 1;

  const getIcon = () => {
    if (isPro) return <Lock className="h-5 w-5" />;
    if (isCompleted) return <CheckCircle className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  const getStatusLabel = () => {
    if (isPro) return 'Pro Lesson';
    if (isCompleted) return 'Completed';
    return 'Available';
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/learn/${lesson.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(`/learn/${lesson.id}`);
        }
      }}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4f0] text-[#2d6c49]">
            {getIcon()}
          </div>
          <div>
            <p className="text-sm text-slate-500">Lesson {index + 1}</p>
            <h3 className="text-lg font-semibold text-[#17392d]">{lesson.title}</h3>
          </div>
        </div>

        <span
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            isPro
              ? 'bg-amber-50 text-amber-700'
              : isCompleted
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-slate-100 text-slate-600',
          ].join(' ')}
        >
          {getStatusLabel()}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          {lesson.points ? `${lesson.points} points reward` : 'Continue your learning path.'}
        </p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/learn/${lesson.id}`);
          }}
          className="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
        >
          Resume
        </button>
      </div>
    </article>
  );
}
