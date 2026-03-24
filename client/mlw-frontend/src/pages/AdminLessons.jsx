import axios from 'axios';
import { BookOpen, Edit3, Filter, Plus, Search, Star, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import SectionHeader from '../components/ui/SectionHeader';

const emptyForm = {
  language_id: '',
  title: '',
  content: '',
  order_number: 1,
  points: 10,
  is_pro: 0,
};

function LessonFormModal({
  mode,
  languages,
  formData,
  onChange,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17392d]/35 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-3xl rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">
              {mode === 'create' ? 'Add Lesson' : 'Edit Lesson'}
            </p>
            <h3 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.03em] text-[#17392d]">
              {mode === 'create' ? 'Create a new lesson' : 'Update this lesson'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Language</span>
              <select
                name="language_id"
                value={formData.language_id}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
              >
                <option value="">Select a language</option>
                {languages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                placeholder="Enter lesson title"
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Content</span>
            <textarea
              name="content"
              value={formData.content}
              onChange={onChange}
              rows={7}
              placeholder="Write the lesson content"
              className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Order Number</span>
              <input
                type="number"
                min="1"
                name="order_number"
                value={formData.order_number}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Points</span>
              <input
                type="number"
                min="0"
                name="points"
                value={formData.points}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Access</span>
              <select
                name="is_pro"
                value={formData.is_pro}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
              >
                <option value={0}>Free</option>
                <option value={1}>Pro</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
              {isSubmitting
                ? mode === 'create'
                  ? 'Creating...'
                  : 'Saving...'
                : mode === 'create'
                  ? 'Create Lesson'
                  : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminLessons() {
  const [languages, setLanguages] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem('token');

  const fetchPageData = async () => {
    try {
      const [languagesRes, lessonsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/languages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get('http://localhost:5000/api/admin/lessons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setLanguages(Array.isArray(languagesRes.data?.languages) ? languagesRes.data.languages : []);
      setLessons(Array.isArray(lessonsRes.data?.lessons) ? lessonsRes.data.lessons : []);
    } catch (fetchError) {
      setError('Unable to load admin lessons right now.');
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const mode = useMemo(() => (editingLesson ? 'edit' : 'create'), [editingLesson]);

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesLanguage =
        selectedLanguage === 'all' || Number(lesson.language_id) === Number(selectedLanguage);
      const matchesSearch = lesson.title
        ?.toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      return matchesLanguage && matchesSearch;
    });
  }, [lessons, searchQuery, selectedLanguage]);

  const openCreateModal = () => {
    setEditingLesson(null);
    setFormData(emptyForm);
    setError('');
    setNotice('');
    setIsModalOpen(true);
  };

  const openEditModal = (lesson) => {
    setEditingLesson(lesson);
    setFormData({
      language_id: lesson.language_id || '',
      title: lesson.title || '',
      content: lesson.content || '',
      order_number: lesson.order_number || 1,
      points: lesson.points || 10,
      is_pro: Number(lesson.is_pro) === 1 ? 1 : 0,
    });
    setError('');
    setNotice('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLesson(null);
    setFormData(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]:
        name === 'language_id' || name === 'order_number' || name === 'points' || name === 'is_pro'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setNotice('');

    try {
      if (mode === 'create') {
        await axios.post('http://localhost:5000/api/admin/lessons', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotice('Lesson created successfully.');
      } else {
        await axios.put(
          `http://localhost:5000/api/admin/lessons/${editingLesson.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotice('Lesson updated successfully.');
      }

      closeModal();
      fetchPageData();
    } catch (submitError) {
      setError(
        submitError.response?.data?.message || 'Unable to save this lesson right now.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (lesson) => {
    const confirmed = window.confirm(
      `Delete "${lesson.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError('');
    setNotice('');

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/lessons/${lesson.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotice(res.data?.message || 'Lesson deleted successfully.');
      fetchPageData();
    } catch (deleteError) {
      setError(
        deleteError.response?.data?.message ||
          'Unable to delete this lesson right now.'
      );
    }
  };

  const previewContent = (content) => {
    const segment = (content || '')
      .split(/[.=]/)
      .map((part) => part.trim())
      .find(Boolean);

    if (!segment) return 'No lesson content yet.';
    return segment.length > 110 ? `${segment.slice(0, 110)}...` : segment;
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <SectionHeader
          eyebrow="Admin Lessons"
          title="Manage Lessons"
          subtitle="Create, edit, and organize lessons for each language."
        />
      </section>

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,320px)]">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Filter className="h-4 w-4 text-emerald-700" />
                Filter by language
              </span>
              <select
                value={selectedLanguage}
                onChange={(event) => setSelectedLanguage(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
              >
                <option value="all">All languages</option>
                {languages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Search className="h-4 w-4 text-emerald-700" />
                Search lessons
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by lesson title"
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Add Lesson
          </button>
        </div>
      </section>

      {notice ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {notice}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {filteredLessons.length ? (
        <>
          <section className="hidden overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm xl:block">
            <div className="grid grid-cols-[90px_1.35fr_180px_90px_90px_1.6fr_180px] gap-4 border-b border-slate-200 bg-[#f8fbf8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span>Order</span>
              <span>Title</span>
              <span>Language</span>
              <span>Points</span>
              <span>Status</span>
              <span>Preview</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="grid grid-cols-[90px_1.35fr_180px_90px_90px_1.6fr_180px] gap-4 px-5 py-4"
                >
                  <div className="text-sm font-semibold text-[#17392d]">
                    {lesson.order_number}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#17392d]">{lesson.title}</p>
                  </div>
                  <div className="text-sm text-slate-600">{lesson.language_name}</div>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#17392d]">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    {lesson.points}
                  </div>
                  <div>
                    <span
                      className={[
                        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                        Number(lesson.is_pro) === 1
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700',
                      ].join(' ')}
                    >
                      {Number(lesson.is_pro) === 1 ? 'Pro' : 'Free'}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    {previewContent(lesson.content)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(lesson)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(lesson)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 xl:hidden">
            {filteredLessons.map((lesson) => (
              <article
                key={lesson.id}
                className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Lesson {lesson.order_number}</p>
                    <h3 className="mt-1 text-lg font-semibold text-[#17392d]">{lesson.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{lesson.language_name}</p>
                  </div>
                  <span
                    className={[
                      'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                      Number(lesson.is_pro) === 1
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700',
                    ].join(' ')}
                  >
                    {Number(lesson.is_pro) === 1 ? 'Pro' : 'Free'}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {previewContent(lesson.content)}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#17392d]">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  {lesson.points} points
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => openEditModal(lesson)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(lesson)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        </>
      ) : (
        <EmptyStateCard
          icon={BookOpen}
          title="No lessons match the current filters"
          description="Try a different language filter or create a new lesson to populate this workspace."
          className="border-slate-200 bg-white"
        />
      )}

      {isModalOpen ? (
        <LessonFormModal
          mode={mode}
          languages={languages}
          formData={formData}
          onChange={handleChange}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : null}
    </div>
  );
}
