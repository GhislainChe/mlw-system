const languages = [
  {
    name: 'Bafut',
    village: 'North West',
    description: 'Daily expressions, greetings, and cultural context.',
  },
  {
    name: 'Mungaka',
    village: 'Bali',
    description: 'Foundational vocabulary and sentence rhythm practice.',
  },
  {
    name: 'Metaʼ',
    village: 'Mankon',
    description: 'Core conversation lessons with listening prompts.',
  },
];

export default function Languages() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Languages</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Explore language paths</h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {languages.map((language) => (
          <article
            key={language.name}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
              {language.village}
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{language.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{language.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
