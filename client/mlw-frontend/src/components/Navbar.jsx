export default function Navbar() {
  return (
    <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
          Mother Learn West
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-white">MLW Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 md:block">
          Learn local languages with structure, progress, and community.
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 font-bold text-slate-950">
          ML
        </div>
      </div>
    </header>
  );
}
