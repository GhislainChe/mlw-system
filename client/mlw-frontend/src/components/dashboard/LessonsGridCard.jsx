import { BookOpen, CheckCircle, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LessonsGridCard({ lesson, index }) {
  const navigate = useNavigate();
  const progressPercent =
    Number(lesson.completed) === 1 ? 100 : Math.max(0, Number(lesson.progress_percent) || 0);
  const isCompleted = progressPercent === 100;
  const isStarted = progressPercent > 0 && progressPercent < 100;
  const isPro = Number(lesson.is_pro) === 1;

  const getIcon = () => {
    if (isPro) return <Lock className="h-5 w-5" />;
    if (isCompleted) return <CheckCircle className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  const getStatusLabel = () => {
    if (isPro) return 'Pro Lesson';
    if (isCompleted) return 'Completed';
    if (isStarted) return 'In Progress';
    return 'Not Started';
  };

  const getActionLabel = () => {
    if (isCompleted) return 'Review Lesson';
    if (isStarted) return 'Continue Lesson';
    return 'Start Lesson';
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/lesson/${lesson.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(`/lesson/${lesson.id}`);
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
            <p className="text-sm text-slate-500">Lesson {index || lesson.order_number || 1}</p>
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
                : isStarted
                  ? 'bg-sky-50 text-sky-700'
                  : 'bg-slate-100 text-slate-600',
          ].join(' ')}
        >
          {getStatusLabel()}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
            <span>{getStatusLabel()}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
            <div
              className={[
                'h-2 rounded-full transition-all duration-500 ease-out',
                isCompleted ? 'bg-emerald-600' : isStarted ? 'bg-sky-500' : 'bg-slate-300',
              ].join(' ')}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <Link
          to={`/lesson/${lesson.id}`}
          onClick={(event) => {
            event.stopPropagation();
          }}
          className={[
            'inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200',
            isCompleted
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              : isStarted
                ? 'bg-[#17392d] text-white hover:bg-[#214d3d]'
                : 'bg-emerald-600 text-white hover:bg-emerald-700',
          ].join(' ')}
        >
          {isCompleted ? <CheckCircle className="h-4 w-4" /> : null}
          {getActionLabel()}
        </Link>
      </div>
    </article>
  );
}
