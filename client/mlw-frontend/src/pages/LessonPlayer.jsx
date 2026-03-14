import { useParams } from 'react-router-dom';

export default function LessonPlayer() {
  const { lessonId } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Lesson Player</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Learn at your own pace
          {lessonId ? ` • Lesson ${lessonId}` : ''}
        </h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Lesson content</h3>
          <p className="mt-4 leading-7 text-slate-300">
            This page is ready for the lesson player experience. We can load title,
            content, audio, and completion actions here from the backend lesson endpoint.
          </p>
        </section>

        <aside className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-cyan-500/15 to-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-white">Quick actions</h3>
          <div className="mt-4 space-y-3">
            <button
              type="button"
              className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950"
            >
              Mark as complete
            </button>
            <button
              type="button"
              className="w-full rounded-2xl border border-white/15 bg-slate-900/40 px-4 py-3 font-medium text-white"
            >
              Save for review
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
