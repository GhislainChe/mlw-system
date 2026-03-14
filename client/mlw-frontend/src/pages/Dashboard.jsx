import { BookOpen, Flame, Star, Trophy } from 'lucide-react';

import LanguageCard from '../components/dashboard/LanguageCard';
import LessonCard from '../components/dashboard/LessonCard';
import StatCard from '../components/dashboard/StatCard';

const stats = [
  { label: 'Day Streak', value: '12', icon: Flame, tone: 'bg-emerald-600' },
  { label: 'Total Points', value: '1,240', icon: Star, tone: 'bg-[#17392d]' },
  { label: 'Lessons Completed', value: '28', icon: BookOpen, tone: 'bg-[#6c8a58]' },
  { label: 'Leaderboard Rank', value: '#4', icon: Trophy, tone: 'bg-[#b8893f]' },
];

const languages = [
  {
    name: 'Ghomala',
    description: 'Resume practical conversation lessons and pronunciation review.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Yemba',
    description: 'Continue vocabulary building with sentence flow and speaking prompts.',
    image:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Medumba',
    description: 'Return to recent lessons focused on daily usage and cultural context.',
    image:
      'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=900&q=80',
  },
];

const lessons = [
  { title: 'Greeting Lesson', lessonNumber: '01', status: 'In Progress' },
  { title: 'Numbers Lesson', lessonNumber: '02', status: 'Completed' },
  { title: 'Family Members', lessonNumber: '03', status: 'Locked', locked: true },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

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
          {languages.map((language) => (
            <LanguageCard key={language.name} {...language} />
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
          {lessons.map((lesson) => (
            <LessonCard key={lesson.title} {...lesson} />
          ))}
        </div>
      </section>
    </div>
  );
}
