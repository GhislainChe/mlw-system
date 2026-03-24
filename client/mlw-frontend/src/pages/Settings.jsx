import axios from 'axios';
import { Lock, LogOut, Settings2, SlidersHorizontal, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { logout } from '../utils/auth';

function ReadOnlyField({ label, value }) {
  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold text-[#17392d]">{value || 'Not available'}</p>
    </div>
  );
}

export default function Settings() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (fetchError) {
        setError('Unable to load your settings right now.');
      }
    };

    fetchProfile();
  }, []);

  const user = profile?.user || {};

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Settings</p>
        <h2 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d]">
          Account and learning preferences
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Review your account information, keep your learning preferences simple, and manage your session in one place.
        </p>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <UserCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Account Information</p>
            <h3 className="text-lg font-semibold text-[#17392d]">Your account details</h3>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ReadOnlyField label="Full Name" value={user.full_name} />
          <ReadOnlyField label="Email" value={user.email} />
          <ReadOnlyField
            label="Role"
            value={user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Learning Preferences</p>
              <h3 className="text-lg font-semibold text-[#17392d]">Preferred language</h3>
            </div>
          </div>

          <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4">
            <label className="block text-xs uppercase tracking-[0.18em] text-slate-500">
              Preferred Language
            </label>
            <select
              disabled
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 outline-none"
              defaultValue=""
            >
              <option value="">Preference support coming soon</option>
            </select>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We&apos;ll let learners choose a preferred study language here once personalized recommendations are ready.
            </p>
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Security</p>
              <h3 className="text-lg font-semibold text-[#17392d]">Password management</h3>
            </div>
          </div>

          <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-[#fbfcfa] px-4 py-4">
            <p className="text-sm leading-6 text-slate-600">
              Password management is not available yet. This section is reserved for future account security tools.
            </p>
            <button
              type="button"
              disabled
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500"
            >
              <Settings2 className="h-4 w-4" />
              Password management coming soon
            </button>
          </div>
        </article>
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Session</p>
            <h3 className="mt-1 text-lg font-semibold text-[#17392d]">Manage your current session</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sign out of your current session whenever you need to switch learners or leave this device.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
