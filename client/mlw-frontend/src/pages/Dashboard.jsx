const stats = [
  { label: 'Languages Available', value: '12', tone: 'from-cyan-400 to-sky-500' },
  { label: 'Lessons Completed', value: '24', tone: 'from-emerald-400 to-teal-500' },
  { label: 'Current Streak', value: '7 days', tone: 'from-orange-400 to-amber-500' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/15 via-slate-900 to-emerald-500/10 p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
          Welcome to MLW
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Learn, track progress, and stay connected to your roots.
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Your dashboard brings together languages, lesson access, and progress in one
          focused space.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
          >
            <div
              className={`inline-flex rounded-2xl bg-gradient-to-r ${stat.tone} px-3 py-1 text-xs font-semibold text-slate-950`}
            >
              MLW Metric
            </div>
            <p className="mt-4 text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Today&apos;s focus</h3>
          <p className="mt-3 text-slate-300">
            Continue with your active language path and review pronunciation before the
            next lesson unlocks.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Community energy</h3>
          <p className="mt-3 text-slate-300">
            Learners across MLW are progressing this week. Keep your streak alive and
            climb the leaderboard.
          </p>
        </div>
      </section>
    </div>
  );
}
