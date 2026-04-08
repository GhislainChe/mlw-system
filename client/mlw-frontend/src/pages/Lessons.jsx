import axios from 'axios';
import { ArrowLeft, ArrowRight, BookOpen, CircleDashed, Languages, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LanguagesGridCard from '../components/dashboard/LanguagesGridCard';
import LessonsGridCard from '../components/dashboard/LessonsGridCard';
import EmptyStateCard from '../components/ui/EmptyStateCard';
import LoadingStateCard from '../components/ui/LoadingStateCard';
import ProgressBar from '../components/ui/ProgressBar';
import SectionHeader from '../components/ui/SectionHeader';
import { getLanguageImage } from '../utils/languageImages';

export default function Lessons() {
  const navigate = useNavigate();
  const { languageId } = useParams();
  const [languages, setLanguages] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [recentProgress, setRecentProgress] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [hubLoading, setHubLoading] = useState(true);
  const [languageLoading, setLanguageLoading] = useState(true);
  const [hubError, setHubError] = useState('');
  const [languageError, setLanguageError] = useState('');

  useEffect(() => {
    const fetchLessonsHub = async () => {
      if (languageId) {
        setHubLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      setHubLoading(true);
      setHubError('');

      try {
        const languageRes = await axios.get('http://localhost:5000/api/languages');
        const languageRows = Array.isArray(languageRes.data?.languages)
          ? languageRes.data.languages
          : Array.isArray(languageRes.data)
            ? languageRes.data
            : [];

        setLanguages(languageRows);
      } catch (error) {
        console.error('Failed to fetch languages', error);
        setLanguages([]);
        setHubError('Unable to load lessons right now.');
      }

      if (!token) {
        setRecentProgress(null);
        setHubLoading(false);
        return;
      }

      try {
        const progressRes = await axios.get(
          'http://localhost:5000/api/progress/recent',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = progressRes.data;
        setRecentProgress(data?.lesson_id ? data : null);
      } catch (error) {
        console.error('Failed to fetch recent progress', error);
        setRecentProgress(null);
      } finally {
        setHubLoading(false);
      }
    };

    fetchLessonsHub();
  }, [languageId]);

  useEffect(() => {
    const fetchLanguageLessons = async () => {
      if (!languageId) {
        setLessons([]);
        setSelectedLanguage(null);
        setLanguageLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      setLanguageLoading(true);
      setLanguageError('');

      try {
        const languageRes = await axios.get('http://localhost:5000/api/languages');
        const languageRows = Array.isArray(languageRes.data?.languages)
          ? languageRes.data.languages
          : Array.isArray(languageRes.data)
            ? languageRes.data
            : [];

        setLanguages(languageRows);
        setSelectedLanguage(
          languageRows.find((item) => Number(item.id) === Number(languageId)) || null,
        );
      } catch (error) {
        console.error('Failed to fetch languages', error);
        setSelectedLanguage(null);
      }

      let lessonRows = [];

      try {
        const lessonsRes = await axios.get(
          `http://localhost:5000/api/lessons/language/${languageId}`
        );

        lessonRows = Array.isArray(lessonsRes.data?.lessons)
          ? lessonsRes.data.lessons
          : [];
      } catch (error) {
        console.error('Failed to fetch lessons', error);
        setLessons([]);
        setLanguageError('Unable to load lessons for this language right now.');
        setLanguageLoading(false);
        return;
      }

      let progressRows = [];

      if (token) {
        try {
          const progressRes = await axios.get('http://localhost:5000/api/progress', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          progressRows = Array.isArray(progressRes.data?.progress)
            ? progressRes.data.progress
            : Array.isArray(progressRes.data)
              ? progressRes.data
              : [];
        } catch (error) {
          console.error('Failed to fetch progress', error);
          progressRows = [];
        }
      }

      const progressByLessonId = new Map(
        progressRows.map((item) => [Number(item.lesson_id), item]),
      );

      const mergedLessons = lessonRows
        .map((lesson) => {
          const progress = progressByLessonId.get(Number(lesson.id));
          const savedProgress = progress?.progress_percent ?? 0;
          const completed = Number(progress?.completed) === 1;

          return {
            ...lesson,
            completed: completed ? 1 : 0,
            progress_percent: completed ? 100 : Math.max(0, Number(savedProgress) || 0),
          };
        })
        .sort((a, b) => Number(a.order_number || 0) - Number(b.order_number || 0));

      setLessons(mergedLessons);
      setLanguageLoading(false);
    };

    fetchLanguageLessons();
  }, [languageId]);

  const languageSummary = useMemo(() => {
    if (!lessons.length) {
      return {
        totalLessons: 0,
        completedLessons: 0,
        overallPercent: 0,
      };
    }

    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(
      (lesson) => Number(lesson.progress_percent) === 100,
    ).length;
    const totalProgress = lessons.reduce(
      (sum, lesson) => sum + Math.max(0, Number(lesson.progress_percent) || 0),
      0,
    );

    return {
      totalLessons,
      completedLessons,
      overallPercent: Math.round(totalProgress / totalLessons),
    };
  }, [lessons]);

  if (!languageId) {
    return (
      <div className="space-y-6">
        <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">
            Lessons
          </p>
          <h2 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d]">
            Continue learning or choose a language path.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Pick up your latest lesson progress or start a guided path in one of the
            supported West Region languages.
          </p>
        </section>

        {hubError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {hubError}
          </div>
        ) : null}

        <section className="space-y-4">
          <SectionHeader
            title="Continue Learning"
            subtitle="Return to the lesson you last worked on."
          />

          {hubLoading ? (
            <LoadingStateCard
              title="Loading your lessons hub"
              description="We are preparing your latest lesson activity and language paths."
            />
          ) : recentProgress ? (
            <section className="rounded-[1.8rem] border border-emerald-100 bg-gradient-to-r from-[#f5fbf7] via-white to-[#eef7f1] p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    <BookOpen className="h-4 w-4" />
                    Recent Progress
                  </div>

                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      {recentProgress.language_name}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#17392d]">
                      {recentProgress.lesson_title}
                    </h3>
                  </div>

                  <div className="max-w-xl space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Progress</span>
                      <span>{recentProgress.progress_percent}%</span>
                    </div>
                    <ProgressBar value={recentProgress.progress_percent} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/lesson/${recentProgress.lesson_id}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
                >
                  Resume Lesson
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          ) : (
            <EmptyStateCard
              icon={CircleDashed}
              title="No recent lesson yet"
              description="Start with a language below and your latest lesson progress will appear here."
            />
          )}
        </section>

        <section className="space-y-5">
          <SectionHeader
            title="Choose a Language"
            subtitle="Explore all available language paths and begin learning with guided lessons."
          />

          {hubLoading ? (
            <LoadingStateCard
              title="Loading language paths"
              description="We are fetching the available language paths for you."
            />
          ) : languages.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {languages.map((language) => (
                <LanguagesGridCard key={language.id} language={language} />
              ))}
            </div>
          ) : (
            <EmptyStateCard
              icon={Languages}
              title="No languages available yet"
              description="Language paths will appear here once they are added to the platform."
              className="border-slate-200 bg-white"
            />
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {languageError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {languageError}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-[1.9rem] border border-[#dce6de] bg-white shadow-sm">
        <div className="grid items-center gap-0 lg:grid-cols-[minmax(0,1.1fr)_300px]">
          <div className="px-6 py-5 sm:px-7 sm:py-6">
            <button
              type="button"
              onClick={() => navigate('/lessons')}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition duration-200 hover:text-[#17392d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all languages
            </button>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Languages className="h-4 w-4" />
              Language Path
            </div>

            <h2 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d] sm:text-[2.05rem]">
              {selectedLanguage?.name || 'Language Lessons'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {selectedLanguage?.description ||
                'Move through lessons in order and keep your progress steady as you learn.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dce6de] bg-[#f7faf7] px-3 py-2 text-slate-600">
                <span className="font-semibold text-[#17392d]">{languageSummary.totalLessons}</span>
                <span>Total lessons</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dce6de] bg-[#f7faf7] px-3 py-2 text-slate-600">
                <span className="font-semibold text-[#17392d]">
                  {languageSummary.completedLessons}
                </span>
                <span>Completed</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dce6de] bg-[#f7faf7] px-3 py-2 text-slate-600">
                <span className="font-semibold text-[#17392d]">
                  {languageSummary.overallPercent}%
                </span>
                <span>Progress</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e3ece4] bg-[#f7faf7] p-4 lg:border-l lg:border-t-0">
            <img
              src={getLanguageImage(selectedLanguage)}
              alt={selectedLanguage?.name || 'Language'}
              className="h-52 w-full rounded-[1.5rem] object-cover lg:h-56"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">
            Total Lessons
          </p>
          <p className="mt-2 text-[1.9rem] font-semibold tracking-[-0.04em] text-[#17392d]">
            {languageSummary.totalLessons}
          </p>
        </div>

        <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">
            Completed
          </p>
          <p className="mt-2 text-[1.9rem] font-semibold tracking-[-0.04em] text-[#17392d]">
            {languageSummary.completedLessons}
          </p>
        </div>

        <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">
            Overall Progress
          </p>
          <p className="mt-2 text-[1.9rem] font-semibold tracking-[-0.04em] text-[#17392d]">
            {languageSummary.overallPercent}%
          </p>
          <ProgressBar
            value={languageSummary.overallPercent}
            trackClassName="mt-2 bg-slate-200"
            className="h-2 rounded-full"
          />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Lessons"
          title="Follow the lesson path in order"
          subtitle="Start where you are, continue from saved progress, or review completed lessons."
        />

        {languageLoading ? (
          <LoadingStateCard
            title="Loading lessons"
            description="We are preparing this language path and your saved progress."
            className="border-slate-200 bg-white"
          />
        ) : lessons.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
              <LessonsGridCard
                key={lesson.id}
                lesson={lesson}
                index={Number(lesson.order_number) || 0}
              />
            ))}
          </div>
        ) : (
          <EmptyStateCard
            icon={Sparkles}
            title="No lessons available"
            description="This language does not have lessons yet. Try another language path for now."
            className="border-slate-200 bg-white"
          />
        )}
      </section>
    </div>
  );
}
