import { Link } from 'react-router-dom';

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

const pillars = [
  {
    title: 'Preserve Living Language',
    text: 'Capture pronunciation, common expressions, and meaning in a way that can still be used years from now.',
  },
  {
    title: 'Learn With Structure',
    text: 'Move through lessons that feel guided instead of scattered, from first words to confident usage.',
  },
  {
    title: 'Stay Close To Culture',
    text: 'Connect language learning to identity, stories, and everyday life instead of memorizing isolated terms.',
  },
  {
    title: 'Grow With Community',
    text: 'Follow progress, share motivation, and keep local languages visible together.',
  },
];

function HeroVisual() {
  return (
    <div className="mx-auto grid max-w-[50rem] gap-3 rounded-[2rem] border border-[#dbe7dc] bg-white p-3 shadow-[0_24px_70px_rgba(60,94,74,0.08)] lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative overflow-hidden rounded-[1.7rem] bg-[#eef3ea]">
        <svg
          viewBox="0 0 920 560"
          className="aspect-[1.45/1] w-full"
          role="img"
          aria-label="Illustrated West Region village scene"
        >
          <defs>
            <linearGradient id="mlwHeroSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f6edd6" />
              <stop offset="52%" stopColor="#ecd39a" />
              <stop offset="100%" stopColor="#dbe8c8" />
            </linearGradient>
          </defs>

          <rect width="920" height="560" fill="url(#mlwHeroSky)" />
          <circle cx="730" cy="110" r="48" fill="#e7bb59" opacity="0.82" />
          <path d="M0 245C170 178 340 166 492 188C661 213 788 171 920 218V560H0Z" fill="#355f4f" />
          <path d="M0 314C182 265 341 276 494 304C643 332 785 320 920 270V560H0Z" fill="#6c8a58" />
          <path d="M0 400C171 374 342 385 493 414C629 440 775 450 920 424V560H0Z" fill="#9cb958" />

          <rect x="245" y="282" width="116" height="90" rx="8" fill="#925328" />
          <polygon points="220,294 303,226 385,294" fill="#a86733" />
          <rect x="290" y="325" width="24" height="47" fill="#5a2d12" />

          <rect x="428" y="258" width="148" height="106" rx="8" fill="#7f4920" />
          <polygon points="401,270 502,191 605,270" fill="#9c602c" />
          <rect x="489" y="312" width="27" height="52" fill="#5a2d12" />

          <rect x="111" y="338" width="61" height="101" rx="10" fill="#315c48" />
          <path d="M141 240C91 277 84 338 105 368H178C196 336 188 278 141 240Z" fill="#3e7552" />

          <rect x="710" y="328" width="58" height="104" rx="10" fill="#315c48" />
          <path d="M738 235C688 272 682 333 699 362H774C791 331 785 273 738 235Z" fill="#3e7552" />

          <circle cx="612" cy="394" r="15" fill="#22303b" />
          <rect x="603" y="411" width="18" height="55" rx="9" fill="#22303b" />
          <path d="M611 431L578 468" stroke="#22303b" strokeWidth="10" strokeLinecap="round" />
          <path d="M615 430L648 459" stroke="#22303b" strokeWidth="10" strokeLinecap="round" />
          <path d="M611 464L591 520" stroke="#22303b" strokeWidth="10" strokeLinecap="round" />
          <path d="M617 464L641 519" stroke="#22303b" strokeWidth="10" strokeLinecap="round" />
        </svg>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-5 sm:pb-5">
          <div className="mx-auto max-w-lg rounded-[1.25rem] bg-[#17392d]/88 px-4 py-4 text-center shadow-lg backdrop-blur-sm">
            <p className="text-lg font-semibold leading-tight text-white sm:text-[1.45rem]">
              A modern home for West Region languages.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#eef5f0] sm:text-[0.95rem]">
              Learn, preserve, and reconnect through guided lessons built around language and culture.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="rounded-[1.7rem] border border-[#dbe7dc] bg-[#f7f8f2] px-5 py-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#47715d]">MLW Focus</p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-[#17392d]">
            Learn with structure, culture, and continuity.
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Designed to keep language active through practical lessons and cultural context.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[1.4rem] border border-[#dbe7dc] bg-[#f2f6ef] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#47715d]">Languages</p>
            <p className="mt-2 text-2xl font-semibold text-[#17392d]">6+</p>
          </div>
          <div className="rounded-[1.4rem] border border-[#e7dfcf] bg-[#f8f4ea] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#47715d]">Lesson Paths</p>
            <p className="mt-2 text-2xl font-semibold text-[#17392d]">40+</p>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-[#dbe7dc] bg-white px-4 py-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#47715d]">Why It Feels Different</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Smaller modules, easier scanning, and a calmer layout designed for steady learning.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#fcfcf8] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-3">
          <Link
            to="/"
            className="font-['Quicksand',sans-serif] text-[1.45rem] font-semibold tracking-[-0.05em] text-[#17392d] sm:text-[1.7rem]"
          >
            MLW
          </Link>

          <div className="order-3 flex w-full items-center justify-center gap-5 text-sm text-slate-600 sm:order-2 sm:w-auto sm:gap-8">
            <a href="#home" className="hover:text-emerald-700">
              Home
            </a>
            <a href="#languages" className="hover:text-emerald-700">
              Languages
            </a>
            <a href="#leaderboard" className="hover:text-emerald-700">
              Leaderboard
            </a>
          </div>

          <div className="order-2 flex items-center gap-2 sm:order-3">
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

        <main className="pb-14 pt-7 sm:pt-10">
          <section id="home" className="text-center">
            <div className="mx-auto max-w-4xl">
              <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:text-sm">
                Preserving mother tongues through digital learning
              </div>

              <h1 className="mx-auto mt-4 max-w-4xl text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.04em] text-[#17392d] sm:text-[3.1rem] lg:text-[4.1rem]">
                Learn the language of home.
                <span className="block text-emerald-600">Keep it spoken for the future.</span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                MLW helps learners explore Ghomala, Yemba, Medumba, Fe&apos;fe, Ngombale,
                and Bamun through structured lessons, cultural understanding, and steady progress.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/register"
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Start Learning
                </Link>
                <a
                  href="#languages"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Explore Languages
                </a>
              </div>
            </div>

            <div className="mt-8">
              <HeroVisual />
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-[#17392d] px-5 py-6 text-white sm:px-6">
              <p className="text-xs uppercase tracking-[0.22em] text-white/65">MLW Vision</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Built like a cultural learning journal, not a crowded dashboard.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/80 sm:text-base">
                This layout is intentionally different: calmer, more editorial, and easier
                to scan on both mobile and desktop.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-[1.7rem] border border-slate-200 bg-white px-5 py-5"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#17392d]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="languages" className="mt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">
                  Languages Preview
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#17392d] sm:text-3xl">
                  Begin with the language that calls you first.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                A horizontal editorial strip instead of heavy stacked blocks.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {languages.map((language) => (
                <article
                  key={language.name}
                  className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white"
                >
                  <div className="h-56 overflow-hidden">
                    <img src={language.image} alt={language.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
                      {language.region}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[#17392d]">{language.name}</h3>
                    <Link
                      to="/register"
                      className="mt-4 inline-flex rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Start Learning
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-[#eef7ea] px-5 py-6 sm:px-6">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Why It Matters</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#17392d] sm:text-3xl">
                Language preservation becomes real when learning stays active.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
                MLW is built so language does not sit in archives only. It remains spoken,
                practiced, and connected to the people who carry it.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white px-5 py-6 sm:px-6">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Quick Focus</p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                <li>Ghomala, Yemba, Medumba, Fe&apos;fe, Ngombale, Bamun</li>
                <li>Lesson-first learning flow</li>
                <li>Community and cultural context</li>
              </ul>
            </div>
          </section>

          <section
            id="leaderboard"
            className="mt-8 rounded-[2rem] bg-gradient-to-r from-emerald-600 to-lime-500 px-5 py-7 text-white sm:px-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-50/85">Start Today</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Start learning your mother tongue today
                </h2>
                <p className="mt-2 text-sm leading-6 text-emerald-50/90 sm:text-base">
                  Join MLW and learn through a lighter, more focused experience built for real continuity.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="rounded-2xl border border-white/40 px-5 py-3 text-sm font-semibold text-white"
                >
                  Login
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 py-5 text-center text-sm leading-6 text-slate-500">
          MLW helps communities learn and preserve West Region languages through modern, accessible digital education.
        </footer>
      </div>
    </div>
  );
}
