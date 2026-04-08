import { useNavigate } from 'react-router-dom';
import { getLanguageImage } from '../../utils/languageImages';

export default function LanguagesGridCard({ language }) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/lessons/${language.id}`);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleOpen();
        }
      }}
      className="cursor-pointer overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-md"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={getLanguageImage(language)}
          alt={language.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-[#17392d] sm:text-xl">{language.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {language.description || 'Learn through guided lessons and cultural context.'}
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleOpen();
          }}
          className="mt-5 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
        >
          Start Learning
        </button>
      </div>
    </article>
  );
}
