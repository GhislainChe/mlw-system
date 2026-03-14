import { useNavigate } from 'react-router-dom';

export default function LanguageCard({ language }) {
  const navigate = useNavigate();

  const handleResume = () => {
    navigate(`/lessons/${language.id}`);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-lg">
      <div className="h-40 overflow-hidden">
        <img
          src={
            language.image_url ||
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
          }
          alt={language.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#17392d]">{language.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {language.description || 'Continue learning with guided lessons and cultural context.'}
        </p>
        <button
          type="button"
          onClick={handleResume}
          className="mt-4 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
        >
          Resume
        </button>
      </div>
    </article>
  );
}
