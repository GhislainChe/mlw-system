import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfcf8] text-slate-900">
      <div className="mx-auto flex max-w-[1440px] gap-4 px-4 py-4 sm:px-5 lg:gap-5 lg:px-6">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="min-h-[calc(100vh-2rem)] flex-1">
          <AdminHeader onMenuOpen={() => setIsSidebarOpen(true)} />
          <main className="px-1 pt-4 sm:px-0 sm:pt-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
