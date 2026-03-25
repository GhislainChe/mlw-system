import axios from 'axios';
import {
  BookText,
  CheckCircle2,
  ChevronLeft,
  Globe2,
  LoaderCircle,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingStateCard from '../components/ui/LoadingStateCard';
import ProgressBar from '../components/ui/ProgressBar';
import { getOrderedLessonSections, parseLessonContent } from '../utils/lessonContent';

export default function LessonPlayer() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonId) {
        setLoading(false);
        setError('Lesson not found.');
        return;
      }

      try {
        const lessonResponse = await axios.get(`http://localhost:5000/api/lessons/${lessonId}`);

        let lessonData = lessonResponse.data?.lesson || lessonResponse.data || null;

        if (!lessonData || !lessonData.id) {
          const fallbackResponse = await axios.get(`http://localhost:5000/api/lesson/${lessonId}`);
          lessonData = fallbackResponse.data?.lesson || fallbackResponse.data || null;
        }

        if (!lessonData || !lessonData.id) {
          throw new Error('Invalid lesson response');
        }

        let languageName = 'Language';
        try {
          const languagesRes = await axios.get('http://localhost:5000/api/languages');
          const languages = languagesRes.data.languages || languagesRes.data || [];
          const language = languages.find(
            (item) => Number(item.id) === Number(lessonData.language_id)
          );
          languageName = language?.name || 'Language';
        } catch (languageError) {
          console.error('Failed to fetch languages for lesson page', languageError);
        }

        let currentProgress = null;
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const progressRes = await axios.get('http://localhost:5000/api/progress', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const progressRows = Array.isArray(progressRes.data?.progress)
              ? progressRes.data.progress
              : [];
            currentProgress = progressRows.find(
              (item) => Number(item.lesson_id) === Number(lessonData.id)
            ) || null;
          } catch (progressError) {
            console.error('Failed to fetch lesson progress', progressError);
          }
        }

        setLesson({
          ...lessonData,
          language_name: languageName,
        });
        setProgressPercent(
          Number(currentProgress?.completed) === 1
            ? 100
            : Math.max(0, Number(currentProgress?.progress_percent) || 0)
        );
      } catch (fetchError) {
        setError('Unable to load this lesson right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const lessonOrder = Number(lesson?.order_number) || 1;
  const isCompleted = progressPercent === 100;
  const contentSections = getOrderedLessonSections(parseLessonContent(lesson?.content || ''));
  const statusLabel = isCompleted
    ? 'Completed'
    : progressPercent > 0
      ? 'In Progress'
      : 'Not Started';

  const handleComplete = async () => {
    try {
      setCompleting(true);
      setError('');

      if (!lesson || !lesson.id) {
        setError('Lesson data is missing. Please reload the page and try again.');
        setCompleting(false);
        return;
      }

      const token = localStorage.getItem('token');
      const payload = {
        lessonId: lesson.id,
        progress_percent: 100,
        completed: 1,
      };

      await axios.post(
        'http://localhost:5000/api/progress',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProgressPercent(100);
      setToast('Lesson completed successfully.');
      setTimeout(() => {
        navigate(lesson?.language_id ? `/lessons/${lesson.language_id}` : '/lessons');
      }, 1200);
    } catch (submitError) {
      setError('Unable to mark this lesson as complete right now.');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <LoadingStateCard
        title="Loading lesson"
        description="We are preparing the lesson content and your saved progress."
        className="border-slate-200 bg-white"
      />
    );
  }

  if (error && !lesson) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {toast ? (
        <div className="fixed right-5 top-5 z-50 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-lg">
          <div className="flex items-center gap-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {toast}
          </div>
        </div>
      ) : null}

      <div className="rounded-[1.7rem] border border-[#dce6de] bg-white px-5 py-4 shadow-sm sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition duration-200 hover:text-[#17392d]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#2d6c49]">
              <Globe2 className="h-4 w-4" />
              {lesson?.language_name || 'Language'}
            </span>
            <span className="rounded-full bg-[#f3f6f3] px-3 py-1 text-xs font-semibold text-slate-600">
              Lesson {lessonOrder}
            </span>
          </div>

          <span
            className={[
              'inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
              isCompleted
                ? 'bg-emerald-50 text-emerald-700'
                : progressPercent > 0
                  ? 'bg-sky-50 text-sky-700'
                  : 'bg-slate-100 text-slate-600',
            ].join(' ')}
          >
            {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
            {statusLabel}
          </span>
        </div>
      </div>

      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white p-6 shadow-sm sm:p-7">
        <div className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                Lesson Focus
              </p>
              <h1 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.04em] text-[#17392d] sm:text-[2.15rem]">
                {lesson?.title || 'Lesson'}
              </h1>
            </div>

            <div className="grid w-full gap-3 sm:max-w-sm sm:grid-cols-2 lg:w-[320px] lg:grid-cols-1">
              <div className="rounded-2xl border border-[#dce6de] bg-[#f8fbf8] px-4 py-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    Points
                  </span>
                  <span className="font-semibold text-[#17392d]">{Number(lesson?.points) || 10}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#dce6de] bg-[#fbfdfb] px-4 py-4">
            <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
              <span>Progress</span>
              <span className="font-semibold text-[#17392d]">{progressPercent}%</span>
            </div>
            <ProgressBar value={progressPercent} trackClassName="mt-3 bg-slate-200" />
          </div>
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <BookText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#17392d]">Lesson Content</h2>
            <p className="text-sm text-slate-500">
              Read the lesson in short segments for easier study and review.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {contentSections.length ? (
            contentSections.map((section) => (
              <section
                key={section.label}
                className={[
                  'rounded-2xl border px-4 py-4 sm:px-5',
                  section.label === 'Note'
                    ? 'border-emerald-100 bg-emerald-50/70'
                    : 'border-[#e1eae2] bg-[#fbfdfb]',
                ].join(' ')}
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#17392d]">
                  {section.label}
                </h3>

                {section.label === 'Vocabulary' ? (
                  <div className="mt-4 space-y-2">
                    {section.items.map((item, index) => {
                      const [term, meaning] = item.split('=').map((part) => part?.trim());

                      return (
                        <div
                          key={`${section.label}-${index}`}
                          className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="font-medium text-[#17392d]">{term || item}</span>
                          {meaning ? (
                            <span className="text-sm font-semibold text-emerald-700">{meaning}</span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    {section.items.map((item, index) => (
                      <div
                        key={`${section.label}-${index}`}
                        className={[
                          'rounded-2xl px-4 py-3 text-[0.98rem] leading-7 text-slate-700',
                          section.label === 'Note'
                            ? 'bg-white/70'
                            : 'border border-slate-200 bg-white',
                        ].join(' ')}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))
          ) : (
            <div className="rounded-2xl border border-[#e1eae2] bg-[#fbfdfb] px-4 py-4 text-[0.98rem] leading-7 text-slate-700">
              No lesson content available yet.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#17392d]">Lesson Actions</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Save your progress when you finish studying this lesson.
            </p>
          </div>

          <button
            type="button"
            onClick={handleComplete}
            disabled={completing || isCompleted}
            className={[
              'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200',
              isCompleted
                ? 'cursor-not-allowed border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400',
            ].join(' ')}
          >
            {completing ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isCompleted ? (
              <>
                <Trophy className="h-4 w-4" />
                Completed
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Complete Lesson
              </>
            )}
          </button>
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
