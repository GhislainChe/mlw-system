import { BookOpen } from 'lucide-react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import SectionHeader from '../components/ui/SectionHeader';

export default function AdminLessons() {
  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <SectionHeader
          eyebrow="Admin Lessons"
          title="Manage lesson content"
          subtitle="This section is reserved for adding, editing, and organizing lessons."
        />
      </section>

      <EmptyStateCard
        icon={BookOpen}
        title="Lesson management coming next"
        description="The admin lesson workspace can be added here without mixing it into the learner experience."
        className="border-slate-200 bg-white"
      />
    </div>
  );
}
