import axios from 'axios';
import { ArrowRight, BookOpen, CircleDashed, Flame, Star, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LessonCard from '../components/dashboard/LessonCard';
import StatCard from '../components/dashboard/StatCard';
import EmptyStateCard from '../components/ui/EmptyStateCard';
import LoadingStateCard from '../components/ui/LoadingStateCard';
import ProgressBar from '../components/ui/ProgressBar';
import SectionHeader from '../components/ui/SectionHeader';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    streak: 0,
    points: 0,
    completedLessons: 0,
    rank: 0,
  });
  const [continueLesson, setContinueLesson] = useState(null);
  const [recentLessons, setRecentLessons] = useState([]);
  const [error, setError] = useState('');
  const [isContinueLoading, setIsContinueLoading] = useState(true);
  const [isRecentLoading, setIsRecentLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (fetchError) {
        setError('Unable to load dashboard statistics right now.');
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchContinueLearning = async () => {
      try {
        setIsContinueLoading(true);
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/dashboard/continue-learning', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setContinueLesson(res.data || null);
      } catch (fetchError) {
        console.error('Failed to load continue learning lesson', fetchError);
        setContinueLesson(null);
      } finally {
        setIsContinueLoading(false);
      }
    };

    fetchContinueLearning();
  }, []);

  useEffect(() => {
    const fetchRecentLessons = async () => {
      try {
        setIsRecentLoading(true);
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/dashboard/recent-lessons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecentLessons(Array.isArray(res.data) ? res.data.slice(0, 3) : []);
      } catch (fetchError) {
        console.error('Failed to load recent lessons', fetchError);
        setRecentLessons([]);
      } finally {
        setIsRecentLoading(false);
      }
    };

    fetchRecentLessons();
  }, []);

  const statCards = [
    { label: 'Day Streak', value: stats.streak, icon: Flame, tone: 'bg-emerald-600' },
    { label: 'Total Points', value: stats.points, icon: Star, tone: 'bg-[#17392d]' },
    {
      label: 'Lessons Completed',
      value: stats.completedLessons,
      icon: BookOpen,
      tone: 'bg-[#6c8a58]',
    },
    {
      label: 'Leaderboard Rank',
      value: stats.rank,
      icon: Trophy,
      tone: 'bg-[#b8893f]',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <section>
        <SectionHeader
          title="Continue Learning"
          subtitle="Jump back into the lesson you were studying most recently."
          className="mb-4"
        />

        {isContinueLoading ? (
          <LoadingStateCard
            title="Loading continue learning"
            description="We are finding the best lesson for you to resume."
          />
        ) : continueLesson ? (
          <div className="rounded-[1.8rem] border border-emerald-100 bg-gradient-to-r from-[#f5fbf7] via-white to-[#eef7f1] p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  <BookOpen className="h-4 w-4" />
                  Continue Learning
                </div>

                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    {continueLesson.language_name}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#17392d]">
                    {continueLesson.lesson_title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Lesson {continueLesson.order_number}
                  </p>
                </div>

                <div className="max-w-xl space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Progress</span>
                    <span>{continueLesson.progress_percent || 0}%</span>
                  </div>
                  <ProgressBar value={continueLesson.progress_percent || 0} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/lesson/${continueLesson.lesson_id}`)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
              >
                Resume Lesson
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <EmptyStateCard
            icon={CircleDashed}
            title="You have no lesson in progress yet."
            description="Start a language path from the lessons page and your next lesson to resume will appear here."
          />
        )}
      </section>

      <section>
        <SectionHeader
          title="Recent Lessons"
          subtitle="Pick up from your latest lesson activity."
          className="mb-4"
        />

        {isRecentLoading ? (
          <LoadingStateCard
            title="Loading recent lessons"
            description="We are pulling in your latest lesson activity."
          />
        ) : recentLessons.length ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {recentLessons.map((lesson) => (
              <LessonCard key={lesson.lesson_id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <EmptyStateCard
            icon={CircleDashed}
            title="No recent lessons yet"
            description="Your latest lesson activity will show here once you start working through a language path."
          />
        )}
      </section>
    </div>
  );
}
