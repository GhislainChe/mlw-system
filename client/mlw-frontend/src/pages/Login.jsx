import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#fcfcf8] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-3">
          <Link
            to="/"
            className="font-['Montserrat',sans-serif] text-[1.35rem] font-extrabold tracking-[-0.05em] text-[#17392d] sm:text-[1.55rem]"
          >
            MLW
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </nav>

        <main className="grid gap-5 pb-14 pt-8 lg:min-h-[calc(100vh-10rem)] lg:grid-cols-[1fr_1fr] lg:items-center">
          <section className="h-full rounded-[2rem] border border-slate-200 bg-[#f7f8f2] px-5 py-6 sm:px-6 sm:py-7">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Welcome Back</p>
              <h1 className="mt-3 max-w-md text-[1.75rem] font-semibold leading-[1.06] tracking-[-0.04em] text-[#17392d] sm:text-[2.2rem]">
                Return to your learning rhythm.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                Pick up where you stopped, revisit completed lessons, and keep your
                language journey active without losing momentum.
              </p>
            </div>

            <div className="mt-7 grid gap-3">
              <div className="rounded-[1.5rem] border border-[#dbe7dc] bg-white px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f3ea] text-[#2d6c49]">
                    <span className="text-lg">↗</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#47715d]">Your Progress</p>
                    <p className="mt-1 text-lg font-semibold text-[#17392d]">
                      Return to active lessons and completed paths
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Resume your current language path and continue building confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[#dbe7dc] bg-white px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4f0] text-[#2d6c49]">
                    <span className="text-base">◎</span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#47715d]">Learning Style</p>
                  <p className="mt-1 text-base font-semibold text-[#17392d]">
                    Structured and continuous
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[#dbe7dc] bg-white px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4efe4] text-[#8c6239]">
                    <span className="text-base">◌</span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#47715d]">Cultural Focus</p>
                  <p className="mt-1 text-base font-semibold text-[#17392d]">
                    Language with identity
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="h-full rounded-[2rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_24px_70px_rgba(60,94,74,0.08)] sm:px-6 sm:py-7">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">MLW Login</p>
              <h2 className="mt-2 text-[1.85rem] font-semibold tracking-[-0.03em] text-[#17392d]">
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Access your dashboard and continue learning.
              </p>
            </div>

            <form className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Remember me
                </label>
                <button type="button" className="font-medium text-emerald-700 hover:text-emerald-800">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              New to MLW?{' '}
              <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Create an account
              </Link>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
