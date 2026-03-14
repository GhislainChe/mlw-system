import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 shadow-2xl shadow-slate-950/50 backdrop-blur lg:grid-cols-[1.15fr_0.85fr]">
        <section className="hidden bg-gradient-to-br from-cyan-500/20 via-slate-950 to-emerald-500/10 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
              MLW
            </div>
            <div>
              <p className="text-xl font-semibold text-white">Mother Learn West</p>
              <p className="text-sm text-slate-300">
                Preserve language. Practice daily. Learn together.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="max-w-md text-4xl font-semibold leading-tight text-white">
              Welcome back to the learning space built for local languages.
            </p>
            <p className="max-w-lg text-base text-slate-300">
              Track your lessons, unlock progress, and stay connected to your learning
              journey with MLW.
            </p>
          </div>
        </section>

        <section className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
              MLW Login
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Sign in</h1>
            <p className="mt-2 text-sm text-slate-400">
              Access your dashboard and continue learning.
            </p>
          </div>

          <form className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:opacity-90"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            New to MLW?{' '}
            <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
