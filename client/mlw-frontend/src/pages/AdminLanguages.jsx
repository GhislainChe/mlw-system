import { Globe2 } from 'lucide-react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import SectionHeader from '../components/ui/SectionHeader';

export default function AdminLanguages() {
  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <SectionHeader
          eyebrow="Admin Languages"
          title="Manage language content"
          subtitle="This section is reserved for creating and organizing language paths."
        />
      </section>

      <EmptyStateCard
        icon={Globe2}
        title="Language management coming next"
        description="The admin dashboard is ready. Language management screens can be added on top of this admin layout next."
        className="border-slate-200 bg-white"
      />
    </div>
  );
}
