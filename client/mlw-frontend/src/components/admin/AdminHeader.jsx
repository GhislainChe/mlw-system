import { Bell, Menu, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function getPageTitle(pathname) {
  if (pathname.includes('/admin/dashboard')) return 'Admin Dashboard';
  if (pathname.includes('/admin/languages')) return 'Languages';
  if (pathname.includes('/admin/lessons')) return 'Lessons';
  if (pathname.includes('/admin/users')) return 'Users';
  return 'Admin Panel';
}

function getInitials(name, email) {
  if (name) {
    return (
      name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'AD'
    );
  }

  if (email) return email.slice(0, 2).toUpperCase();
  return 'AD';
}

export default function AdminHeader({ onMenuOpen }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data?.user || null);
      } catch {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className="rounded-[1.6rem] border border-[#dce6de] bg-[#f7f8f2] shadow-sm">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3 lg:w-[220px]">
          <button
            type="button"
            onClick={onMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#7b8f82]">Admin Workspace</p>
            <h1 className="text-xl font-semibold tracking-[-0.04em] text-[#17392d]">
              {getPageTitle(location.pathname)}
            </h1>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:inline-flex">
            <Shield className="h-4 w-4" />
            Admin Access
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
          >
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#17392d] text-sm font-bold text-white">
              {getInitials(user?.full_name, user?.email)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-[#17392d]">
                {user?.full_name || user?.email || 'Admin'}
              </p>
              <p className="text-xs text-slate-500">{user?.email || 'Administrator'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
