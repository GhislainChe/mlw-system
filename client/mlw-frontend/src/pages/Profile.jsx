import axios from 'axios';
import {
  Activity,
  Award,
  Flame,
  Languages,
  Medal,
  Trophy,
  UserCircle2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import LoadingStateCard from '../components/ui/LoadingStateCard';
import ProgressBar from '../components/ui/ProgressBar';

function MetricCard({ icon: Icon, label, value, tone }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-2xl ${tone} p-2.5 text-white`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-4 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d]">{value}</p>
      <p className="mt-1.5 text-sm text-slate-600">{label}</p>
    </article>
  );
}

function getInitials(name) {
  return (
    name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'ML'
  );
}

function formatActivityDate(value) {
  if (!value) return 'Recently updated';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Recently updated';
  }

  return date.toLocaleString([], {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (fetchError) {
        setError('Unable to load your profile right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const user = profile?.user || {};
  const personalStats = profile?.personal_stats || {};
  const learningSummary = profile?.learning_summary || {};
  const progressByLanguage = Array.isArray(profile?.progress_by_language)
    ? profile.progress_by_language
    : [];
  const recentActivity = Array.isArray(profile?.recent_activity) ? profile.recent_activity : [];

  const statCards = useMemo(
    () => [
      {
        label: 'Total Points',
        value: personalStats.total_points ?? 0,
        icon: Award,
        tone: 'bg-emerald-600',
      },
      {
        label: 'Completed Lessons',
        value: personalStats.completed_lessons ?? 0,
        icon: Medal,
        tone: 'bg-[#17392d]',
      },
      {
        label: 'Current Streak',
        value: personalStats.current_streak ?? 0,
        icon: Flame,
        tone: 'bg-[#6c8a58]',
      },
      {
        label: 'Leaderboard Rank',
        value:
          personalStats.leaderboard_rank && personalStats.leaderboard_rank > 0
            ? `#${personalStats.leaderboard_rank}`
            : '-',
        icon: Trophy,
        tone: 'bg-[#b8893f]',
      },
    ],
    [personalStats]
  );

  if (loading) {
    return (
      <LoadingStateCard
        title="Loading profile"
        description="We are gathering your learner profile and latest progress."
        className="border-slate-200 bg-white"
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-[#17392d] text-lg font-bold text-white shadow-sm">
              {getInitials(user.full_name)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Profile</p>
              <h2 className="mt-1 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d]">
                {user.full_name || 'Your MLW profile'}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{user.email || 'No email available'}</p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold capitalize text-emerald-700">
            <UserCircle2 className="h-4 w-4" />
            {user.role || 'Learner'}
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_1.3fr]">
        <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Learning Summary</p>
              <h3 className="text-lg font-semibold text-[#17392d]">Your momentum so far</h3>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fbf8] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Languages Started</p>
              <p className="mt-2 text-[1.65rem] font-semibold tracking-[-0.04em] text-[#17392d]">
                {learningSummary.languages_started ?? 0}
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fbf8] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">In Progress</p>
              <p className="mt-2 text-[1.65rem] font-semibold tracking-[-0.04em] text-[#17392d]">
                {learningSummary.lessons_in_progress ?? 0}
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fbf8] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Completed</p>
              <p className="mt-2 text-[1.65rem] font-semibold tracking-[-0.04em] text-[#17392d]">
                {learningSummary.lessons_completed ?? 0}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Progress By Language</p>
              <h3 className="text-lg font-semibold text-[#17392d]">Where you are making progress</h3>
            </div>
          </div>

          {progressByLanguage.length > 0 ? (
            <div className="mt-5 space-y-3">
              {progressByLanguage.map((language) => (
                <div
                  key={language.language_id}
                  className="rounded-[1.4rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-[#17392d]">
                        {language.language_name}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600">
                        {language.completed_lessons}/{language.total_lessons} lessons completed
                      </p>
                    </div>
                    <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {language.progress_percent}%
                    </span>
                  </div>

                  <ProgressBar value={language.progress_percent} className="mt-3 h-2.5 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <EmptyStateCard
              icon={Languages}
              title="No language progress yet"
              description="Start a lesson path to see language progress here."
              className="mt-5"
            />
          )}
        </article>
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Recent Activity</p>
            <h3 className="text-lg font-semibold text-[#17392d]">Your latest lesson activity</h3>
          </div>
        </div>

        {recentActivity.length > 0 ? (
          <div className="mt-5 space-y-3">
            {recentActivity.map((activity) => {
              const displayProgress = activity.completed === 1 ? 100 : activity.progress_percent || 0;

              return (
                <div
                  key={activity.lesson_id}
                  className="rounded-[1.4rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">{activity.language_name}</p>
                      <h4 className="mt-1 text-base font-semibold text-[#17392d]">
                        {activity.lesson_title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {activity.completed === 1 ? 'Completed' : 'In progress'} -{' '}
                        {formatActivityDate(activity.updated_at)}
                      </p>
                    </div>

                    <div className="w-full max-w-xs">
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                        <span>Progress</span>
                        <span>{displayProgress}%</span>
                      </div>
                      <ProgressBar value={displayProgress} className="h-2.5 rounded-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyStateCard
            icon={Activity}
            title="No recent activity yet"
            description="Your latest lesson activity will appear here once you begin learning."
            className="mt-5"
          />
        )}
      </section>
    </div>
  );
}
