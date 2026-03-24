import { BookOpen, CheckCircle, Lock, PlayCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LessonsGridCard({ lesson, index }) {
  const progressPercent =
    Number(lesson.completed) === 1 ? 100 : Math.max(0, Number(lesson.progress_percent) || 0);
  const isCompleted = Number(lesson.completed) === 1 || progressPercent === 100;
  const isStarted = progressPercent > 0 && progressPercent < 100;
  const isPro = Number(lesson.is_pro) === 1;
  const lessonNumber = Number(lesson.order_number) || index || 1;
  const lessonPoints = Number(lesson.points) || 10;
  const preview = (lesson.content || '')
    .split(/[.=]/)
    .map((part) => part.trim())
    .find(Boolean) || 'Open this lesson to begin learning key words and expressions.';

  const getIcon = () => {
    if (isPro) return <Lock className="h-5 w-5" />;
    if (isCompleted) return <CheckCircle className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  const getStatusLabel = () => {
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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Lesson {lessonNumber}</p>
          <h3 className="mt-2 text-lg font-semibold leading-tight text-[#17392d]">
            {lesson.title}
          </h3>
        </div>

        <span
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            isCompleted
              ? 'bg-emerald-50 text-emerald-700'
              : isStarted
                ? 'bg-sky-50 text-sky-700'
                : 'bg-slate-100 text-slate-600',
          ].join(' ')}
        >
          {getStatusLabel()}
        </span>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef4f0] text-[#2d6c49]">
          {getIcon()}
        </div>
        <p className="text-sm leading-6 text-slate-600">
          {preview.length > 100 ? `${preview.slice(0, 100)}...` : preview}
        </p>
      </div>

      <div className="mt-5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
            <span>Progress</span>
            <span className="font-medium text-[#17392d]">{progressPercent}%</span>
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
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#f7faf7] px-3 py-1.5 text-xs font-semibold text-slate-600">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            {lessonPoints} points
          </span>
          {isPro ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <Lock className="h-3.5 w-3.5" />
              Pro
            </span>
          ) : null}
        </div>

        <Link
          to={`/lesson/${lesson.id}`}
          className={[
            'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200',
            isCompleted
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              : isStarted
                ? 'bg-[#17392d] text-white hover:bg-[#214d3d]'
                : 'bg-emerald-600 text-white hover:bg-emerald-700',
          ].join(' ')}
        >
          {isCompleted ? <CheckCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
          {getActionLabel()}
        </Link>
      </div>
    </article>
  );
}
