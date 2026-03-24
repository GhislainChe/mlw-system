import {
  BookOpen,
  ChevronRight,
  Globe2,
  House,
  LogOut,
  Users,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { logout } from '../../utils/auth';

const navigationItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: House, end: true },
  { label: 'Languages', to: '/admin/languages', icon: Globe2, end: true },
  { label: 'Lessons', to: '/admin/lessons', icon: BookOpen, end: true },
  { label: 'Users', to: '/admin/users', icon: Users, end: true },
];

function SidebarContent({ onClose }) {
  return (
    <div className="flex h-full flex-col rounded-[1.6rem] border border-[#dce6de] bg-[#f7f8f2] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-['Montserrat',sans-serif] text-lg font-extrabold tracking-[-0.05em] text-[#17392d]">
            MLW
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#6f8a79]">
            Admin Panel
          </p>
        </div>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <nav className="mt-6 flex-1 space-y-2">
        {navigationItems.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'group flex items-center justify-between rounded-2xl px-3 py-2.5 transition duration-200',
                isActive
                  ? 'bg-[#17392d] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-[#17392d]',
              ].join(' ')
            }
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-[#2d6c49]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </span>
            <ChevronRight className="h-4 w-4 opacity-30" />
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-5 flex items-center gap-3 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
}

export default function AdminSidebar({ isOpen = false, onClose }) {
  return (
    <>
      <aside className="hidden w-[232px] shrink-0 lg:block">
        <div className="sticky top-4 h-[calc(100vh-2rem)]">
          <SidebarContent />
        </div>
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-[#17392d]/30 backdrop-blur-[2px] lg:hidden">
          <div className="h-full max-w-[280px] p-4">
            <SidebarContent onClose={onClose} />
          </div>
        </div>
      ) : null}
    </>
  );
}
