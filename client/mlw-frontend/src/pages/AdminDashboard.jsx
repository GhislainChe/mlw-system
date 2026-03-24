import axios from 'axios';
import { ArrowRight, BookOpen, CheckCircle2, Globe2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import SectionHeader from '../components/ui/SectionHeader';

function SummaryCard({ icon: Icon, label, value, tone }) {
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    total_users: 0,
    total_languages: 0,
    total_lessons: 0,
    total_completed_lessons: 0,
    recent_users: [],
    recent_activity: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSummary({
          total_users: res.data?.total_users || 0,
          total_languages: res.data?.total_languages || 0,
          total_lessons: res.data?.total_lessons || 0,
          total_completed_lessons: res.data?.total_completed_lessons || 0,
          recent_users: Array.isArray(res.data?.recent_users) ? res.data.recent_users : [],
          recent_activity: Array.isArray(res.data?.recent_activity) ? res.data.recent_activity : [],
        });
      } catch (fetchError) {
        setError('Unable to load admin dashboard data right now.');
      }
    };

    fetchSummary();
  }, []);

  const summaryCards = [
    { label: 'Total Users', value: summary.total_users, icon: Users, tone: 'bg-emerald-600' },
    { label: 'Total Languages', value: summary.total_languages, icon: Globe2, tone: 'bg-[#17392d]' },
    { label: 'Total Lessons', value: summary.total_lessons, icon: BookOpen, tone: 'bg-[#6c8a58]' },
    {
      label: 'Completed Progress',
      value: summary.total_completed_lessons,
      icon: CheckCircle2,
      tone: 'bg-[#b8893f]',
    },
  ];
  const quickActions = [
    {
      label: 'Add Language',
      description: 'Open the language management workspace.',
      to: '/admin/languages',
    },
    {
      label: 'Add Lesson',
      description: 'Open the lesson management workspace.',
      to: '/admin/lessons',
    },
    {
      label: 'Manage Users',
      description: 'Review learner and admin accounts.',
      to: '/admin/users',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Admin Dashboard</p>
        <h2 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d]">
          Manage platform content and monitor activity
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Track system growth, keep an eye on content volume, and move quickly into the main admin workflows.
        </p>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          title="Quick Actions"
          subtitle="Jump directly into the main admin tasks."
        />

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => navigate(action.to)}
              className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4 text-left shadow-sm transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <div>
                <p className="text-base font-semibold text-[#17392d]">{action.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{action.description}</p>
              </div>
              <span className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recent Users"
            subtitle="Latest learner accounts created in the system."
          />

          {summary.recent_users.length ? (
            <div className="mt-5 space-y-3">
              {summary.recent_users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-[1.4rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4"
                >
                  <p className="text-base font-semibold text-[#17392d]">{user.full_name}</p>
                  <p className="mt-1 text-sm text-slate-600">{user.email}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    {user.role}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyStateCard
              icon={Users}
              title="No recent users"
              description="Newly registered users will appear here."
              className="mt-5"
            />
          )}
        </article>

        <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Recent Activity"
            subtitle="Latest lesson activity across the platform."
          />

          {summary.recent_activity.length ? (
            <div className="mt-5 space-y-3">
              {summary.recent_activity.map((activity, index) => (
                <div
                  key={`${activity.user_name}-${activity.lesson_title}-${index}`}
                  className="rounded-[1.4rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4"
                >
                  <p className="text-base font-semibold text-[#17392d]">{activity.user_name}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {activity.lesson_title} - {activity.language_name}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    {activity.completed === 1 ? 'Completed' : `${activity.progress_percent}% progress`}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyStateCard
              icon={BookOpen}
              title="No recent activity"
              description="Recent lesson progress will appear here once learners start using the platform."
              className="mt-5"
            />
          )}
        </article>
      </section>
    </div>
  );
}
