import axios from 'axios';
import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import LanguagesGridCard from '../components/dashboard/LanguagesGridCard';
import LessonsGridCard from '../components/dashboard/LessonsGridCard';

export default function Lessons() {
  const navigate = useNavigate();
  const { languageId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [recentProgress, setRecentProgress] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      if (languageId) {
        try {
          const res = await axios.get(`http://localhost:5000/api/lessons/${languageId}`);
          setLessons(res.data.lessons || res.data || []);
        } catch (error) {
          console.error('Failed to fetch lessons', error);
        }

        return;
      }

      setLessons([]);

      try {
        const languageRes = await axios.get('http://localhost:5000/api/languages');
        setLanguages(languageRes.data.languages || languageRes.data || []);
      } catch (error) {
        console.error('Failed to fetch languages', error);
      }

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setRecentProgress(null);
          return;
        }

        const progressRes = await axios.get('http://localhost:5000/api/progress/recent', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = progressRes.data;
        setRecentProgress(data?.lesson_id ? data : null);
      } catch (error) {
        console.error('Failed to fetch recent progress', error);
        setRecentProgress(null);
      }
    };

    fetchPageData();
  }, [languageId]);

  if (!languageId) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Lessons</p>
          <h2 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.03em] text-[#17392d]">
            Continue where you left off
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Pick up your latest lesson or choose a language to explore a new learning path.
          </p>
        </div>

        {recentProgress ? (
          <section className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-[#f5fbf7] via-white to-[#eef7f1] p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  <BookOpen className="h-4 w-4" />
                  Continue Learning
                </div>

                <div>
                  <p className="text-sm font-medium text-emerald-700">{recentProgress.language_name}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#17392d]">
                    {recentProgress.lesson_title}
                  </h3>
                </div>

                <div className="max-w-xl space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Progress</span>
                    <span>{recentProgress.progress_percent}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-emerald-100">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                      style={{ width: `${recentProgress.progress_percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/learn/${recentProgress.lesson_id}`)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
              >
                Resume Lesson
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        ) : null}

        <section className="space-y-5">
          <div>
            <h3 className="text-[1.3rem] font-semibold tracking-[-0.03em] text-[#17392d]">
              Choose a Language
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Start learning with any available language and move through lessons at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {languages.map((language) => (
              <LanguagesGridCard key={language.id} language={language} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Lessons</p>
        <h2 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.03em] text-[#17392d]">
          {languageId ? `Lessons for language ${languageId}` : 'Choose a language to view lessons'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Browse the lesson path and continue learning one step at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, index) => (
          <LessonsGridCard key={lesson.id} lesson={lesson} index={index} />
        ))}
      </div>
    </div>
  );
}
