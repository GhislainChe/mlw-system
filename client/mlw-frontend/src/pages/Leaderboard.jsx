const leaders = [
  { rank: '01', name: 'Amina N.', lessons: 48 },
  { rank: '02', name: 'Tita F.', lessons: 42 },
  { rank: '03', name: 'Ngala P.', lessons: 37 },
];

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Leaderboard</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Top learners this week</h2>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
        {leaders.map((leader, index) => (
          <div
            key={leader.rank}
            className={[
              'flex items-center justify-between px-6 py-5',
              index < leaders.length - 1 ? 'border-b border-white/10' : '',
            ].join(' ')}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 font-bold text-slate-950">
                {leader.rank}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{leader.name}</p>
                <p className="text-sm text-slate-400">Consistent learner</p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-200">
              {leader.lessons} completed lessons
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
