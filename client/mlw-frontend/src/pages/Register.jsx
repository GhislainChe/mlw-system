import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../api/api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    language_interest: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await registerUser({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      if (data.success || data.message === 'User registered successfully.') {
        setSuccess('Registration successful. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
        return;
      }

      setError(data.message || 'Registration failed. Please try again.');
    } catch (submitError) {
      setError('Unable to register right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcf8] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-3">
          <Link
            to="/"
            className="font-['Montserrat',sans-serif] text-[1.35rem] font-extrabold tracking-[-0.05em] text-[#17392d] sm:text-[1.55rem]"
          >
            MLW
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </nav>

        <main className="grid gap-5 pb-14 pt-8 lg:min-h-[calc(100vh-10rem)] lg:grid-cols-[1fr_1fr] lg:items-center">
          <section className="h-full rounded-[2rem] border border-slate-200 bg-[#f7f8f2] px-5 py-6 sm:px-6 sm:py-7">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Join MLW</p>
              <h1 className="mt-3 max-w-md text-[1.75rem] font-semibold leading-[1.06] tracking-[-0.04em] text-[#17392d] sm:text-[2.2rem]">
                Start with a profile built for real learning.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                Create your account, choose a language path, and enter a calmer digital
                space designed for preservation and steady progress.
              </p>
            </div>

            <div className="mt-7 grid gap-3">
              <div className="rounded-[1.5rem] border border-[#dbe7dc] bg-white px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f3ea] text-[#2d6c49]">
                    <span className="text-lg">+</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#47715d]">Language Paths</p>
                    <p className="mt-1 text-lg font-semibold text-[#17392d]">
                      Ghomala, Yemba, Medumba, Fe&apos;fe
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Start with the language that feels closest to home and grow from there.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[#dbe7dc] bg-white px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4f0] text-[#2d6c49]">
                    <span className="text-base">◇</span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#47715d]">Designed For</p>
                  <p className="mt-1 text-base font-semibold text-[#17392d]">
                    Steady, guided progress
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[#dbe7dc] bg-white px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4efe4] text-[#8c6239]">
                    <span className="text-base">◍</span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#47715d]">Built Around</p>
                  <p className="mt-1 text-base font-semibold text-[#17392d]">
                    Culture and continuity
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="h-full rounded-[2rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_24px_70px_rgba(60,94,74,0.08)] sm:px-6 sm:py-7">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Create Account</p>
              <h2 className="mt-2 text-[1.85rem] font-semibold tracking-[-0.03em] text-[#17392d]">
                Register
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Join MLW and begin your language learning journey.
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+237"
                    className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Language interest</span>
                  <select
                    name="language_interest"
                    value={formData.language_interest}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  >
                    <option>Choose a language</option>
                    <option>Ghomala</option>
                    <option>Yemba</option>
                    <option>Medumba</option>
                    <option>Fe'fe</option>
                    <option>Ngombale</option>
                    <option>Bamun</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Confirm password</span>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              ) : null}

              {success ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Sign in
              </Link>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
