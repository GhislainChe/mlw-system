import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Language Preservation',
    description:
      'Protect words, sounds, and meanings by turning living languages into learnable digital journeys.',
  },
  {
    title: 'Structured Lessons',
    description:
      'Move from greetings to real conversation with lessons designed in a clear, progressive order.',
  },
  {
    title: 'Community Learning',
    description:
      'Learn with others, celebrate progress, and keep local languages visible across generations.',
  },
  {
    title: 'Cultural Knowledge',
    description:
      'Go beyond vocabulary with stories, context, and traditions that give each language its soul.',
  },
];

const languages = [
  {
    name: 'Ghomala',
    region: 'Bamileke Highlands',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Yemba',
    region: 'West Region',
    image:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Medumba',
    region: 'Bangangte',
    image:
      'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: "Fe'fe",
    region: 'Upper Nkam',
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80',
  },
];

const stats = [
  { label: 'Languages Growing', value: '6+' },
  { label: 'Lesson Tracks', value: '40+' },
  { label: 'Active Learners', value: '1,000+' },
];

function HeroArtwork() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-emerald-200/60 blur-3xl" />
      <div className="absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-lime-200/70 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100/80 bg-gradient-to-br from-emerald-950 via-emerald-800 to-lime-500 p-4 shadow-[0_30px_100px_rgba(22,163,74,0.18)]">
        <div className="overflow-hidden rounded-[2rem]">
          <svg
            viewBox="0 0 920 720"
            className="h-full w-full"
            role="img"
            aria-label="Village landscape celebrating West Region cultural heritage"
          >
            <defs>
              <linearGradient id="mlwSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fefce8" />
                <stop offset="52%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#bbf7d0" />
              </linearGradient>
              <linearGradient id="mlwHillOne" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14532d" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
              <linearGradient id="mlwHillTwo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#166534" />
                <stop offset="100%" stopColor="#65a30d" />
              </linearGradient>
            </defs>

            <rect width="920" height="720" fill="url(#mlwSky)" />
            <circle cx="705" cy="135" r="64" fill="#facc15" opacity="0.8" />

            <path
              d="M0 310C151 234 282 202 411 220C566 242 699 180 920 244V720H0Z"
              fill="url(#mlwHillOne)"
            />
            <path
              d="M0 390C178 301 344 318 475 350C632 389 761 357 920 286V720H0Z"
              fill="url(#mlwHillTwo)"
            />
            <path
              d="M0 492C146 451 277 446 408 474C589 514 718 523 920 460V720H0Z"
              fill="#84cc16"
            />
            <path
              d="M0 560C165 525 311 531 471 565C641 602 769 608 920 565V720H0Z"
              fill="#65a30d"
            />

            <rect x="232" y="382" width="116" height="98" rx="8" fill="#854d0e" />
            <polygon points="208,394 290,323 374,394" fill="#92400e" />
            <rect x="278" y="430" width="26" height="50" fill="#422006" />

            <rect x="432" y="352" width="144" height="120" rx="8" fill="#78350f" />
            <polygon points="406,365 504,283 603,365" fill="#92400e" />
            <rect x="491" y="417" width="28" height="55" fill="#422006" />

            <rect x="128" y="432" width="68" height="122" rx="12" fill="#14532d" />
            <path
              d="M161 305C107 349 98 417 120 455H203C225 414 214 344 161 305Z"
              fill="#166534"
            />

            <rect x="688" y="401" width="64" height="126" rx="12" fill="#14532d" />
            <path
              d="M720 281C663 327 656 401 676 440H764C784 396 776 324 720 281Z"
              fill="#166534"
            />

            <circle cx="600" cy="496" r="18" fill="#1f2937" />
            <rect x="590" y="516" width="20" height="63" rx="10" fill="#1f2937" />
            <path d="M598 540L560 584" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />
            <path d="M603 540L646 576" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />
            <path d="M599 580L573 650" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />
            <path d="M606 579L637 649" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />

            <circle cx="704" cy="472" r="17" fill="#1f2937" />
            <rect x="694" y="491" width="20" height="60" rx="10" fill="#1f2937" />
            <path d="M702 514L744 544" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />
            <path d="M700 513L666 562" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />
            <path d="M701 550L679 621" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />
            <path d="M708 550L739 620" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />

            <rect x="0" y="595" width="920" height="125" fill="#365314" opacity="0.35" />
          </svg>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent px-6 pb-7 pt-20 sm:px-8">
            <p className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Learning language through memory, community, and culture.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/90 sm:text-base">
              MLW gives West Region languages a modern digital home with lessons,
              stories, and progress that learners can keep building over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f8fbf6] text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.15),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(163,230,53,0.18),_transparent_28%),linear-gradient(180deg,_#ffffff,_#f8fbf6)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="pt-6 sm:pt-8">
          <nav className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur md:flex-row md:items-center md:justify-between md:px-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-base font-black text-white shadow-lg shadow-emerald-200">
                MLW
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">Mother Learn West</p>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                  Preserve Local Voices
                </p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600 md:gap-8">
              <a href="#home" className="transition hover:text-emerald-600">
                Home
              </a>
              <a href="#languages" className="transition hover:text-emerald-600">
                Languages
              </a>
              <a href="#leaderboard" className="transition hover:text-emerald-600">
                Leaderboard
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
              >
                Register
              </Link>
            </div>
          </nav>
        </header>

        <main className="pb-20 pt-10 sm:pt-14">
          <section
            id="home"
            className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)] lg:gap-16"
          >
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                Digital learning for West Region mother tongues
              </div>

              <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-slate-950 sm:text-6xl lg:text-7xl">
                Keep our languages
                <span className="block text-emerald-600">alive, spoken, and shared.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                MLW helps learners reconnect with Ghomala, Yemba, Medumba, Fe&apos;fe,
                Ngombale, Bamun and more through structured lessons, community
                motivation, and cultural knowledge that feels grounded in home.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="rounded-2xl bg-emerald-600 px-7 py-4 text-base font-semibold text-white shadow-[0_18px_35px_rgba(22,163,74,0.2)] transition hover:bg-emerald-700"
                >
                  Start Learning
                </Link>
                <a
                  href="#languages"
                  className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
                >
                  Explore Languages
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.8rem] border border-slate-200/80 bg-white/85 px-5 py-6 shadow-sm"
                  >
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <HeroArtwork />
          </section>

          <section className="mt-24 sm:mt-28">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">
                What MLW Offers
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                A learning platform built with more space, clarity, and cultural depth.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <article
                  key={feature.title}
                  className="rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-semibold text-emerald-700">
                    0{index + 1}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="languages"
            className="mt-24 rounded-[2.75rem] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 lg:px-10"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">
                  Languages Preview
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                  Start with a language that feels personal and familiar.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-slate-600">
                Each language path is designed to feel approachable, visual, and easy to
                continue on any screen size.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {languages.map((language) => (
                <article
                  key={language.name}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-[#fbfdf9] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={language.image}
                      alt={language.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent p-5">
                      <p className="text-sm font-medium text-emerald-100">{language.region}</p>
                      <h3 className="mt-1 text-2xl font-semibold text-white">{language.name}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm leading-6 text-slate-600">
                      Practical lessons, cultural expressions, and learner-friendly
                      progression.
                    </p>
                    <Link
                      to="/register"
                      className="mt-5 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Start Learning
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="leaderboard"
            className="mt-24 grid gap-8 rounded-[2.75rem] bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 px-6 py-10 text-white shadow-[0_30px_90px_rgba(22,163,74,0.22)] sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-12"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-50/85">
                Start Today
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Start learning your mother tongue today
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/90">
                Build confidence, follow structured lessons, and keep cultural identity
                visible through a platform designed for real learning momentum.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:flex-col">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Create Your Account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-white/35 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Login
              </Link>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 py-8 text-center text-sm leading-6 text-slate-500">
          MLW is a modern learning platform helping communities preserve and learn West
          Region languages through accessible digital lessons and cultural storytelling.
        </footer>
      </div>
    </div>
  );
}
