export default function LanguageCard({ image, name, description }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-lg">
      <div className="h-40 overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#17392d]">{name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        <button
          type="button"
          className="mt-4 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
        >
          Resume
        </button>
      </div>
    </article>
  );
}
