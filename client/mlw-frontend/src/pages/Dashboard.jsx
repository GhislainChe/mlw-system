import axios from 'axios';
import { BookOpen, Flame, Star, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

import LanguageCard from '../components/dashboard/LanguageCard';
import LessonCard from '../components/dashboard/LessonCard';
import StatCard from '../components/dashboard/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState({
    streak: 0,
    points: 0,
    completedLessons: 0,
    rank: 0,
  });
  const [languages, setLanguages] = useState([]);
  const [recentLessons, setRecentLessons] = useState([]);
  const [error, setError] = useState('');

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
    const fetchLanguages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/languages');
        setLanguages(res.data.languages || res.data || []);
      } catch (fetchError) {
        console.error('Failed to load languages', fetchError);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchRecentLessons = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/dashboard/recent-lessons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecentLessons(res.data);
      } catch (fetchError) {
        console.error('Failed to load recent lessons', fetchError);
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
    <div className="space-y-8">
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
        <div className="mb-4">
          <h2 className="text-[1.55rem] font-semibold tracking-[-0.03em] text-[#17392d]">
            Continue Learning
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Jump back into your active language paths.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {languages.slice(0, 3).map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-[1.55rem] font-semibold tracking-[-0.03em] text-[#17392d]">
            Recent Lessons
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Pick up from your latest lesson activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {recentLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </div>
  );
}
