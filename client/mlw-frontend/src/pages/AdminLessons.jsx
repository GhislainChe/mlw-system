import axios from 'axios';
import { BookOpen, Edit3, Filter, Plus, Search, Star, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import LoadingStateCard from '../components/ui/LoadingStateCard';
import SectionHeader from '../components/ui/SectionHeader';
import {
  buildLessonContentPreview,
  buildStructuredLessonContent,
  getOrderedLessonSections,
  getStructuredLessonTemplate,
  parseLessonContent,
  parseLessonContentForForm,
} from '../utils/lessonContent';

const emptyForm = {
  language_id: '',
  title: '',
  introduction: '',
  vocabulary: '',
  examples: '',
  note: '',
  order_number: 1,
  points: 10,
  is_pro: 0,
};

function LessonFormModal({
  mode,
  languages,
  formData,
  onChange,
  onLanguageChange,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const previewContent = buildStructuredLessonContent(formData);
  const parsedPreview = getOrderedLessonSections(parseLessonContent(previewContent));
  const template = getStructuredLessonTemplate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17392d]/35 p-4 backdrop-blur-[2px]">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-[1.8rem] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
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

        <div className="overflow-y-auto px-6 py-5">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Language</span>
                <select
                  name="language_id"
                  value={formData.language_id}
                  onChange={onLanguageChange}
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

            <div className="rounded-[1.4rem] border border-[#dce6de] bg-[#f8fbf8] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">Content Structure</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fill the lesson in sections instead of typing raw headings manually. We will still save everything into the existing single content field.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Introduction</span>
              <textarea
                name="introduction"
                value={formData.introduction}
                onChange={onChange}
                rows={4}
                placeholder={template.introduction}
                className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
              />
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Vocabulary</span>
                <textarea
                  name="vocabulary"
                  value={formData.vocabulary}
                  onChange={onChange}
                  rows={6}
                  placeholder={template.vocabulary}
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Examples</span>
                <textarea
                  name="examples"
                  value={formData.examples}
                  onChange={onChange}
                  rows={6}
                  placeholder={template.examples}
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Note</span>
              <textarea
                name="note"
                value={formData.note}
                onChange={onChange}
                rows={3}
                placeholder={template.note}
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
                  readOnly
                  className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 outline-none"
                />
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Auto-generated from the selected language.
                </p>
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

          <div className="mt-6 rounded-[1.5rem] border border-[#dce6de] bg-[#f8fbf8] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Lesson Preview</p>
            <div className="mt-4 space-y-3">
              {parsedPreview.length ? (
                parsedPreview.map((section) => (
                  <div
                    key={section.label}
                    className={[
                      'rounded-2xl border px-4 py-4',
                      section.label === 'Note'
                        ? 'border-emerald-100 bg-emerald-50/70'
                        : 'border-slate-200 bg-white',
                    ].join(' ')}
                  >
                    <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#17392d]">
                      {section.label}
                    </h4>
                    <div className="mt-3 space-y-2">
                      {section.items.map((item, index) => (
                        <p key={`${section.label}-${index}`} className="text-sm leading-6 text-slate-600">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-600">
                  Start writing with the structured section headings to preview the lesson layout.
                </p>
              )}
            </div>
          </div>
        </div>
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
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError('');
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
      setLanguages([]);
      setLessons([]);
    } finally {
      setLoading(false);
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
    const parsedContent = parseLessonContentForForm(lesson.content || '');

    setEditingLesson(lesson);
    setFormData({
      language_id: lesson.language_id || '',
      title: lesson.title || '',
      introduction: parsedContent.introduction,
      vocabulary: parsedContent.vocabulary,
      examples: parsedContent.examples,
      note: parsedContent.note,
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

  const fetchNextOrderNumber = async (languageId) => {
    if (!languageId) {
      return 1;
    }

    const res = await axios.get(
      `http://localhost:5000/api/admin/languages/${languageId}/next-order`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return Number(res.data?.nextOrderNumber || 1);
  };

  const handleLanguageChange = async (event) => {
    const selectedValue = Number(event.target.value) || '';

    setFormData((current) => ({
      ...current,
      language_id: selectedValue,
    }));

    if (mode !== 'create') {
      return;
    }

    if (!selectedValue) {
      setFormData((current) => ({
        ...current,
        language_id: '',
        order_number: 1,
      }));
      return;
    }

    try {
      const nextOrderNumber = await fetchNextOrderNumber(selectedValue);
      setFormData((current) => ({
        ...current,
        language_id: selectedValue,
        order_number: nextOrderNumber,
      }));
    } catch (fetchError) {
      setError('Unable to determine the next order number right now.');
      setFormData((current) => ({
        ...current,
        language_id: selectedValue,
        order_number: 1,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setNotice('');

    try {
      const payload = {
        ...formData,
        content: buildStructuredLessonContent(formData),
      };

      if (mode === 'create') {
        await axios.post('http://localhost:5000/api/admin/lessons', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotice('Lesson created successfully.');
      } else {
        await axios.put(
          `http://localhost:5000/api/admin/lessons/${editingLesson.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotice('Lesson updated successfully.');
      }

      closeModal();
      await fetchPageData();
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
      await fetchPageData();
    } catch (deleteError) {
      setError(
        deleteError.response?.data?.message ||
          'Unable to delete this lesson right now.'
      );
    }
  };

  const previewContent = (content) => {
    const segment = buildLessonContentPreview(content);

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

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span className="rounded-full bg-[#f3f7f4] px-3 py-1.5 font-medium text-[#17392d]">
            {filteredLessons.length} lesson{filteredLessons.length === 1 ? '' : 's'}
          </span>
          {selectedLanguage !== 'all' ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-medium text-emerald-700">
              Filtered by language
            </span>
          ) : null}
          {searchQuery.trim() ? (
            <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600">
              Search: "{searchQuery.trim()}"
            </span>
          ) : null}
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

      {loading ? (
        <LoadingStateCard
          title="Loading lessons"
          description="We are fetching lesson records and available language filters."
          className="border-slate-200 bg-white"
        />
      ) : filteredLessons.length ? (
        <>
          <section className="hidden overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm xl:block">
            <div className="grid grid-cols-[80px_minmax(0,1.2fr)_160px_90px_100px_minmax(0,1.55fr)_170px] gap-4 border-b border-slate-200 bg-[#f8fbf8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
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
                  className="grid grid-cols-[80px_minmax(0,1.2fr)_160px_90px_100px_minmax(0,1.55fr)_170px] items-start gap-4 px-5 py-4"
                >
                  <div className="pt-1 text-sm font-semibold text-[#17392d]">
                    {lesson.order_number}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-[#17392d]">{lesson.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                      Lesson record
                    </p>
                  </div>
                  <div className="pt-1 text-sm text-slate-600">{lesson.language_name}</div>
                  <div className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-[#17392d]">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    {lesson.points}
                  </div>
                  <div className="pt-0.5">
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
                  <div className="min-w-0">
                    <p
                      className="overflow-hidden text-sm leading-6 text-slate-600"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {previewContent(lesson.content)}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
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
                  <div className="min-w-0 flex-1">
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

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#f8fbf8] px-3 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Points</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#17392d]">
                      <Star className="h-3.5 w-3.5 text-amber-500" />
                      {lesson.points}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f8fbf8] px-3 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Access</p>
                    <p className="mt-1 text-sm font-semibold text-[#17392d]">
                      {Number(lesson.is_pro) === 1 ? 'Pro Lesson' : 'Free Lesson'}
                    </p>
                  </div>
                </div>

                <p className="mt-4 rounded-2xl bg-[#fbfcfa] px-4 py-3 text-sm leading-6 text-slate-600">
                  {previewContent(lesson.content)}
                </p>

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
          onLanguageChange={handleLanguageChange}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : null}
    </div>
  );
}
