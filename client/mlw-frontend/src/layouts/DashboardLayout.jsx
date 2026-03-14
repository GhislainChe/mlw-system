import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-4 lg:grid-cols-[280px_1fr]">
        <Sidebar />

        <div className="flex flex-col gap-4">
          <Navbar />
          <main className="flex-1 rounded-[2rem] border border-white/10 bg-slate-900/50 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
