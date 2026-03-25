import { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, Mail, ShieldCheck, Users } from 'lucide-react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import LoadingStateCard from '../components/ui/LoadingStateCard';
import SectionHeader from '../components/ui/SectionHeader';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:5000/api/admin/users';

const formatDate = (value) => {
  if (!value) {
    return 'N/A';
  }

  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const token = getToken();
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userRows = Array.isArray(response.data?.users) ? response.data.users : [];
        setUsers(userRows);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Unable to load users right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <SectionHeader
          eyebrow="Admin Users"
          title="Manage platform users"
          subtitle="Review registered accounts and keep visibility on who is using the platform."
        />
      </section>

      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold text-slate-900">Registered users</h2>
            <p className="mt-1 text-sm text-slate-500">
              Users are listed from newest to oldest based on account creation date.
            </p>
          </div>
          <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            {users.length} user{users.length === 1 ? '' : 's'}
          </div>
        </div>

        {loading ? (
          <LoadingStateCard
            title="Loading users"
            description="We are fetching the current list of registered accounts."
            className="border-slate-200 bg-slate-50"
          />
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        ) : users.length === 0 ? (
          <EmptyStateCard
            icon={Users}
            title="No users found yet"
            description="Once people register on MLW, their accounts will appear here."
            className="border-slate-200 bg-slate-50"
          />
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-[1.4rem] border border-slate-200 lg:block">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50/90">
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-5 py-4">User</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className="align-top transition hover:bg-slate-50/80">
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">{user.full_name || 'Unnamed user'}</div>
                        <div className="mt-1 text-sm text-slate-500">ID #{user.id}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{user.email}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 lg:hidden">
              {users.map((user) => (
                <article
                  key={user.id}
                  className="rounded-[1.4rem] border border-slate-200 bg-slate-50/60 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-base font-semibold text-slate-900">
                        {user.full_name || 'Unnamed user'}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">ID #{user.id}</p>
                    </div>
                    <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      {user.role}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-emerald-600" />
                      <span>{formatDate(user.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
