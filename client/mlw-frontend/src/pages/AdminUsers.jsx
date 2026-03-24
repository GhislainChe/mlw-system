import { Users } from 'lucide-react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import SectionHeader from '../components/ui/SectionHeader';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <SectionHeader
          eyebrow="Admin Users"
          title="Manage platform users"
          subtitle="This section is reserved for reviewing learner accounts and admin access."
        />
      </section>

      <EmptyStateCard
        icon={Users}
        title="User management coming next"
        description="The admin user management workspace can be added here when you are ready to manage accounts."
        className="border-slate-200 bg-white"
      />
    </div>
  );
}
