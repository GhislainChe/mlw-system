import { Link } from 'react-router-dom';

const lessons = [
  { id: 1, title: 'Greetings and Introductions', level: 'Starter', isPro: false },
  { id: 2, title: 'Family and Community', level: 'Core', isPro: false },
  { id: 3, title: 'Storytelling Expressions', level: 'Pro', isPro: true },
];

export default function Lessons() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Lessons</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Your learning modules</h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          Structured by topic, progression, and access plan.
        </div>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <article
            key={lesson.id}
            className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">
                  {lesson.level}
                </span>
                {lesson.isPro ? (
                  <span className="rounded-2xl bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-200">
                    Pro
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{lesson.title}</h3>
            </div>

            <Link
              to={`/lesson/${lesson.id}`}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90"
            >
              Open lesson
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
