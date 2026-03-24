import axios from 'axios';
import { Award, Medal, Star, Trophy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

function getCurrentUserId() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const [, payload] = token.split('.');
    if (!payload) return null;

    const decoded = JSON.parse(atob(payload));
    return decoded?.id ?? null;
  } catch {
    return null;
  }
}

function SpotlightCard({ leader, tone }) {
  if (!leader) {
    return (
      <div className="rounded-[1.7rem] border border-dashed border-[#d8e4d9] bg-white px-5 py-6 text-center shadow-sm">
        <p className="text-sm text-slate-500">No data yet</p>
      </div>
    );
  }

  return (
    <article className="rounded-[1.7rem] border border-slate-200 bg-white px-5 py-6 shadow-sm">
      <div
        className={[
          'flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm',
          tone,
        ].join(' ')}
      >
        <Trophy className="h-5 w-5" />
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
        Rank {leader.rank}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#17392d]">
        {leader.full_name}
      </h3>
      <p className="mt-3 text-sm text-slate-600">{leader.total_points} points</p>
    </article>
  );
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/leaderboard');
        setLeaderboard(Array.isArray(res.data?.leaderboard) ? res.data.leaderboard : []);
      } catch (fetchError) {
        setError('Unable to load the leaderboard right now.');
        setLeaderboard([]);
      }
    };

    fetchLeaderboard();
  }, []);

  const currentUserId = getCurrentUserId();
  const currentUser = useMemo(
    () => leaderboard.find((entry) => Number(entry.user_id) === Number(currentUserId)) || null,
    [leaderboard, currentUserId]
  );
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Leaderboard</p>
        <h2 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d]">
          See how learners are progressing.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Rankings are based on awarded points first and completed lessons as the secondary tie-breaker.
        </p>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {leaderboard.length === 0 && !error ? (
        <div className="rounded-[1.8rem] border border-dashed border-[#d5e2d7] bg-[#f8fbf8] px-6 py-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-[#17392d]">No leaderboard data yet</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Once learners start completing lessons and earning points, rankings will appear here.
          </p>
        </div>
      ) : null}

      {leaderboard.length > 0 ? (
        <>
          <section className="rounded-[1.8rem] border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Your Standing</p>
                <h3 className="text-lg font-semibold text-[#17392d]">Current user summary</h3>
              </div>
            </div>

            {currentUser ? (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fbf8] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Rank</p>
                  <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-[#17392d]">
                    #{currentUser.rank}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fbf8] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total Points</p>
                  <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-[#17392d]">
                    {currentUser.total_points}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fbf8] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Completed Lessons</p>
                  <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] text-[#17392d]">
                    {currentUser.completed_lessons}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-[1.4rem] border border-dashed border-[#d8e4d9] bg-[#f8fbf8] px-4 py-5 text-sm text-slate-600">
                Your account is not ranked yet. Complete lessons to appear on the leaderboard.
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="text-[1.28rem] font-semibold tracking-[-0.03em] text-[#17392d]">
                Top Learners
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Spotlight on the current top three learners.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <SpotlightCard leader={topThree[0]} tone="bg-[#17392d]" />
              <SpotlightCard leader={topThree[1]} tone="bg-emerald-600" />
              <SpotlightCard leader={topThree[2]} tone="bg-[#6c8a58]" />
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="text-[1.28rem] font-semibold tracking-[-0.03em] text-[#17392d]">
                Full Rankings
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Points are ranked first, then completed lessons.
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[90px_minmax(0,1fr)_140px_160px] gap-4 border-b border-slate-200 bg-[#f8fbf8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 md:grid">
                <span>Rank</span>
                <span>Learner</span>
                <span>Points</span>
                <span>Completed</span>
              </div>

              <div className="divide-y divide-slate-200">
                {leaderboard.map((entry) => {
                  const isCurrentUser = Number(entry.user_id) === Number(currentUserId);

                  return (
                    <div
                      key={entry.user_id}
                      className={[
                        'grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[90px_minmax(0,1fr)_140px_160px] md:items-center md:gap-4',
                        isCurrentUser ? 'bg-emerald-50/60' : 'bg-white',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4f0] text-sm font-semibold text-[#17392d]">
                          #{entry.rank}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 md:hidden">
                          Rank
                        </span>
                      </div>

                      <div>
                        <p className="text-base font-semibold text-[#17392d]">{entry.full_name}</p>
                        {isCurrentUser ? (
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                            You
                          </p>
                        ) : null}
                      </div>

                      <div className="text-sm text-slate-600">
                        <span className="font-semibold text-[#17392d]">{entry.total_points}</span> points
                      </div>

                      <div className="text-sm text-slate-600">
                        <span className="font-semibold text-[#17392d]">
                          {entry.completed_lessons}
                        </span>{' '}
                        lessons
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
