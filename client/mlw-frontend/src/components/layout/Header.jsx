import axios from 'axios';
import { Bell, BookOpen, Menu, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function getInitials(name, email) {
  if (name) {
    return (
      name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'ML'
    );
  }

  if (email) {
    return email.slice(0, 2).toUpperCase();
  }

  return 'ML';
}

function SearchResults({ query, results, onSelect }) {
  if (!query.trim()) return null;

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-30 overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-lg">
      {results.length ? (
        <div className="max-h-[320px] overflow-y-auto p-2">
          {results.map((result) => (
            <button
              key={`${result.type}-${result.id}`}
              type="button"
              onClick={() => onSelect(result)}
              className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition duration-150 hover:bg-[#f6faf7]"
            >
              <div
                className={[
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl',
                  result.type === 'language'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-[#eef4f0] text-[#2d6c49]',
                ].join(' ')}
              >
                {result.type === 'language' ? (
                  <Search className="h-4 w-4" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#17392d]">{result.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                  {result.type === 'language'
                    ? 'Language'
                    : `${result.languageName || 'Lesson'}${result.orderNumber ? ` - Lesson ${result.orderNumber}` : ''}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4 py-4 text-sm text-slate-500">No results found</div>
      )}
    </div>
  );
}

export default function Header({ onMenuOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [allLessons, setAllLessons] = useState([]);

  const getPageTitle = () => {
    if (location.pathname.includes('dashboard')) return 'Dashboard';
    if (location.pathname.includes('about')) return 'About';
    if (location.pathname.includes('lessons')) return 'Lessons';
    if (location.pathname.includes('lesson')) return 'Lesson Player';
    if (location.pathname.includes('leaderboard')) return 'Leaderboard';
    if (location.pathname.includes('profile')) return 'Profile';
    if (location.pathname.includes('settings')) return 'Settings';
    return 'MLW';
  };

  useEffect(() => {
    const fetchHeaderData = async () => {
      const token = localStorage.getItem('token');

      try {
        const profileRes = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(profileRes.data?.user || null);
      } catch (error) {
        setUser(null);
      }

      try {
        const languagesRes = await axios.get('http://localhost:5000/api/languages');
        const languageRows = Array.isArray(languagesRes.data?.languages)
          ? languagesRes.data.languages
          : Array.isArray(languagesRes.data)
            ? languagesRes.data
            : [];

        setLanguages(languageRows);

        const lessonResponses = await Promise.all(
          languageRows.map((language) =>
            axios
              .get(`http://localhost:5000/api/lessons/language/${language.id}`)
              .then((res) => ({
                language,
                lessons: Array.isArray(res.data?.lessons) ? res.data.lessons : [],
              }))
              .catch(() => ({
                language,
                lessons: [],
              }))
          )
        );

        const lessonRows = lessonResponses.flatMap(({ language, lessons }) =>
          lessons.map((lesson) => ({
            ...lesson,
            language_name: language.name,
          }))
        );

        setAllLessons(lessonRows);
      } catch (error) {
        setLanguages([]);
        setAllLessons([]);
      }
    };

    fetchHeaderData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopSearchRef.current?.contains(event.target) ||
        mobileSearchRef.current?.contains(event.target)
      ) {
        return;
      }

      setSearchQuery('');
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchQuery('');
  }, [location.pathname]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    const languageMatches = languages
      .filter((language) => language.name?.toLowerCase().includes(query))
      .slice(0, 4)
      .map((language) => ({
        type: 'language',
        id: language.id,
        label: language.name,
        path: `/lessons/${language.id}`,
      }));

    const lessonMatches = allLessons
      .filter((lesson) => lesson.title?.toLowerCase().includes(query))
      .slice(0, 6)
      .map((lesson) => ({
        type: 'lesson',
        id: lesson.id,
        label: lesson.title,
        path: `/lesson/${lesson.id}`,
        languageName: lesson.language_name,
        orderNumber: lesson.order_number,
      }));

    return [...languageMatches, ...lessonMatches].slice(0, 8);
  }, [allLessons, languages, searchQuery]);

  const handleSelectResult = (result) => {
    setSearchQuery('');
    navigate(result.path);
  };

  const primaryLabel = user?.full_name || user?.email || 'MLW Learner';
  const secondaryLabel = user?.full_name ? user?.email || '' : '';

  const renderSearchBox = (ref) => (
    <div ref={ref} className="relative">
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search lessons or languages..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>
      <SearchResults query={searchQuery} results={searchResults} onSelect={handleSelectResult} />
    </div>
  );

  return (
    <header className="rounded-[1.6rem] border border-[#dce6de] bg-[#f7f8f2] shadow-sm">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3 lg:w-[180px]">
          <button
            type="button"
            onClick={onMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#7b8f82]">Workspace</p>
            <h1 className="text-xl font-semibold tracking-[-0.04em] text-[#17392d]">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        <div className="hidden flex-1 lg:block">{renderSearchBox(desktopSearchRef)}</div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
          >
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#17392d] text-sm font-bold text-white">
              {getInitials(user?.full_name, user?.email)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-[#17392d]">{primaryLabel}</p>
              {secondaryLabel ? (
                <p className="text-xs text-slate-500">{secondaryLabel}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-5 lg:hidden">{renderSearchBox(mobileSearchRef)}</div>
    </header>
  );
}
