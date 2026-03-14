import { Bell, Menu, Search } from 'lucide-react';

export default function Header({ onMenuOpen }) {
  return (
    <header className="rounded-[1.6rem] border border-[#dce6de] bg-[#f7f8f2] shadow-sm">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3 lg:w-[180px]">
          <button
            type="button"
            onClick={onMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#7b8f82]">Workspace</p>
            <h1 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[#17392d]">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="hidden flex-1 lg:block">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search lessons or languages..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
          >
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#17392d] text-sm font-bold text-white">
              ML
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-[#17392d]">Mother Learn User</p>
              <p className="text-xs text-slate-500">Learner</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-5 lg:hidden">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search lessons or languages..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
      </div>
    </header>
  );
}
