import axios from 'axios';
import {
  BookText,
  CheckCircle2,
  ChevronLeft,
  Globe2,
  LoaderCircle,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LessonPlayer() {
  const navigate = useNavigate();
  const { lessonId, id } = useParams();
  const currentLessonId = lessonId || id;
  const [lesson, setLesson] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLesson = async () => {
      if (!currentLessonId) {
        setLoading(false);
        setError('Lesson not found.');
        return;
      }

      try {
        let lessonPayload = null;

        try {
          const res = await axios.get(`http://localhost:5000/api/lessons/${currentLessonId}`);
          const payload = res.data.lesson || res.data;

          if (payload?.id && payload?.title && payload?.content !== undefined) {
            lessonPayload = payload;
          }
        } catch {
          lessonPayload = null;
        }

        if (!lessonPayload) {
          const fallbackRes = await axios.get(`http://localhost:5000/api/lesson/${currentLessonId}`);
          lessonPayload = fallbackRes.data.lesson || fallbackRes.data;
        }

        const [languagesRes, , progressRes] = await Promise.all([
          axios.get('http://localhost:5000/api/languages'),
          axios.get(`http://localhost:5000/api/lessons/${lessonPayload.language_id}`),
          axios.get('http://localhost:5000/api/progress', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        const languages = languagesRes.data.languages || languagesRes.data || [];
        const language = languages.find(
          (item) => Number(item.id) === Number(lessonPayload.language_id)
        );
        const progressRows = progressRes.data.progress || progressRes.data || [];
        const currentProgress = progressRows.find(
          (item) => Number(item.lesson_id) === Number(lessonPayload.id)
        );

        setLesson({
          ...lessonPayload,
          language_name: language?.name || 'Language',
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
  }, [currentLessonId]);

  const lessonOrder = Number(lesson?.order_number) || 1;

  const handleComplete = async () => {
    try {
      setCompleting(true);
      setError('');
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/progress',
        { lessonId: currentLessonId, progressPercent: 100, completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProgressPercent(100);
      setMessage('Lesson completed successfully. Returning to lessons...');
      setTimeout(() => navigate(lesson?.language_id ? `/lessons/${lesson.language_id}` : '/lessons'), 1200);
    } catch (submitError) {
      setError('Unable to mark this lesson as complete right now.');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <LoaderCircle className="h-5 w-5 animate-spin text-emerald-600" />
          Loading lesson...
        </div>
      </div>
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
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-[#dce6de] bg-white shadow-sm">
        <div className="border-b border-[#e4ede5] bg-gradient-to-br from-[#f7fbf8] via-[#fdfefc] to-[#eef6f0] px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition duration-200 hover:text-[#17392d]"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                Lesson Player
              </div>
              <div className="mt-4 space-y-2">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#2d6c49]">
                  <Globe2 className="h-4 w-4" />
                  {lesson?.language_name || 'Language'}
                </div>
                <h1 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-[#17392d] sm:text-[2.15rem]">
                  {lesson?.title || 'Lesson'}
                </h1>
                <p className="text-sm text-slate-600">Lesson {lessonOrder}</p>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-2xl border border-[#dce6de] bg-white/90 p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-emerald-600"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">
                {progressPercent === 100 ? 'Lesson completed' : 'Saved lesson progress'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <BookText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#17392d]">Lesson Content</h2>
                <p className="text-sm text-slate-500">
                  Read through the full lesson carefully before marking it complete.
                </p>
              </div>
            </div>

            <article className="rounded-2xl border border-slate-200 bg-[#fbfdfb] p-5 sm:p-6">
              <p className="whitespace-pre-line text-[0.98rem] leading-8 text-slate-700">
                {lesson?.content || 'No lesson content available yet.'}
              </p>
            </article>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-[#fcfdfb] p-5 shadow-sm">
            <h3 className="text-base font-semibold text-[#17392d]">Complete this lesson</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              When you finish reading and practicing, save your progress and continue to the next lesson.
            </p>

            {lesson?.is_pro ? (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                This is a Pro lesson.
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleComplete}
              disabled={completing}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
              {completing ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Complete Lesson
                </>
              )}
            </button>
          </aside>
        </div>
      </section>

      {message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
