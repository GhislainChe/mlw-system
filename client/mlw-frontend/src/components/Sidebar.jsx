import { NavLink, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Languages', to: '/languages' },
  { label: 'Lessons', to: '/lessons' },
  { label: 'Learn', to: '/learn' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Profile', to: '/dashboard' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('mlw_token');
    navigate('/login');
  };

  return (
    <aside className="flex min-h-full flex-col rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-emerald-400 text-lg font-black text-slate-950">
          MLW
        </div>
        <div>
          <p className="text-lg font-semibold text-white">MLW</p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Mother Learn West
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              [
                'rounded-2xl px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-left text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
      >
        Logout
      </button>
    </aside>
  );
}
