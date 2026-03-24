import { BookMarked, Globe2, HeartHandshake, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

const supportedLanguages = ['Ghomala', 'Yemba', 'Medumba', "Fe'fe", 'Ngombale', 'Bamun'];

const aboutPillars = [
  {
    icon: HeartHandshake,
    title: 'Purpose',
    text: 'MLW exists to help learners reconnect with West Region mother tongues through guided digital lessons and steady practice.',
  },
  {
    icon: BookMarked,
    title: 'Preservation',
    text: 'The platform treats language as living culture, preserving meaning, expression, and identity through continued use.',
  },
  {
    icon: Globe2,
    title: 'Access',
    text: 'We make learning calmer and more structured so communities can keep language visible across devices and generations.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#fcfcf8] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
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

        <main className="space-y-8 pb-12 pt-8 sm:pt-10">
          <section className="rounded-[2rem] border border-[#dce6de] bg-white px-6 py-8 shadow-sm sm:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                <Languages className="h-4 w-4" />
                About MLW
              </div>
              <h1 className="text-[2rem] font-semibold tracking-[-0.04em] text-[#17392d] sm:text-[2.8rem]">
                A digital home for learning and preserving West Region languages.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Mother Learn West is built to help learners study language with structure while keeping
                culture, memory, and identity alive. The goal is not only to teach words, but to support
                continuity across generations.
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {aboutPillars.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-[1.6rem] border border-slate-200 bg-white px-5 py-5 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#17392d]">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-[#f7f8f2] px-6 py-7 sm:px-8">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Supported Languages</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {supportedLanguages.map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-[#d7e4d9] bg-white px-4 py-2 text-sm font-semibold text-[#17392d]"
                >
                  {language}
                </span>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              MLW focuses on preserving and teaching community languages from Cameroon&apos;s West Region
              with a calmer learning flow built around lessons, progress, and continuity.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
