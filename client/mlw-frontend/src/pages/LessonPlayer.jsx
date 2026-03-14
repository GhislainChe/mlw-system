import axios from 'axios';
import { CheckCircle2, ChevronLeft, Languages, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LessonPlayer() {
  const navigate = useNavigate();
  const { lessonId, id } = useParams();
  const currentLessonId = lessonId || id;
  const [lesson, setLesson] = useState(null);
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
        const res = await axios.get(`http://localhost:5000/api/lessons/${currentLessonId}`);
        const payload = res.data.lesson || res.data;

        if (payload?.title && payload?.content !== undefined) {
          setLesson(payload);
          return;
        }

        const fallbackRes = await axios.get(`http://localhost:5000/api/lesson/${currentLessonId}`);
        setLesson(fallbackRes.data.lesson || fallbackRes.data);
      } catch (fetchError) {
        try {
          const fallbackRes = await axios.get(`http://localhost:5000/api/lesson/${currentLessonId}`);
          setLesson(fallbackRes.data.lesson || fallbackRes.data);
        } catch {
          setError('Unable to load this lesson right now.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [currentLessonId]);

  const vocabularyItems = (lesson?.content || '')
    .split('.')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [english, translation] = item.split('=').map((part) => part?.trim() || '');

      return {
        english,
        translation,
      };
    })
    .filter((item) => item.english && item.translation);

  const handleComplete = async () => {
    try {
      setCompleting(true);
      setError('');
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/progress/complete',
        { lesson_id: currentLessonId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Lesson marked as complete. Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1000);
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition duration-200 hover:text-[#17392d]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-emerald-700">Lesson Player</p>
          <h2 className="mt-2 text-[1.8rem] font-semibold tracking-[-0.03em] text-[#17392d]">
            {lesson?.title || 'Lesson'}
          </h2>
        </div>

        {lesson?.is_pro ? (
          <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Pro Lesson
          </span>
        ) : null}
      </div>

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

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#17392d]">Vocabulary</h3>
              <p className="text-sm text-slate-500">Read each word pair and keep practicing.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {vocabularyItems.length ? (
              vocabularyItems.map((item, index) => (
                <article
                  key={`${item.english}-${item.translation}-${index}`}
                  className="rounded-xl border border-slate-200 bg-[#fbfdfb] p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">English</p>
                      <h4 className="mt-2 text-lg font-semibold text-[#17392d]">{item.english}</h4>
                    </div>
                    <div className="h-px flex-1 bg-slate-200" />
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Translation</p>
                      <h4 className="mt-2 text-lg font-semibold text-emerald-700">
                        {item.translation}
                      </h4>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 md:col-span-2">
                No vocabulary items were found in this lesson content yet.
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#17392d]">Lesson Actions</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Mark this lesson as completed once you have reviewed all vocabulary pairs.
          </p>

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
                Mark Lesson Complete
              </>
            )}
          </button>
        </aside>
      </section>
    </div>
  );
}
