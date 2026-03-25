import axios from 'axios';
import { Edit3, Globe2, Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import EmptyStateCard from '../components/ui/EmptyStateCard';
import LoadingStateCard from '../components/ui/LoadingStateCard';
import SectionHeader from '../components/ui/SectionHeader';

const emptyForm = {
  name: '',
  description: '',
  image_url: '',
};

function LanguageFormModal({
  mode,
  formData,
  onChange,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17392d]/35 p-4 backdrop-blur-[2px]">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">
              {mode === 'create' ? 'Add Language' : 'Edit Language'}
            </p>
            <h3 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.03em] text-[#17392d]">
              {mode === 'create'
                ? 'Create a new learning language'
                : 'Update this language entry'}
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
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Language Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter language name"
              className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={4}
              placeholder="Write a short description for this language path"
              className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Image URL</span>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={onChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-2xl border border-slate-200 bg-[#fbfbf7] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
            />
          </label>

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
                  ? 'Create Language'
                  : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminLanguages() {
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5000/api/admin/languages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLanguages(Array.isArray(res.data?.languages) ? res.data.languages : []);
    } catch (fetchError) {
      setError('Unable to load admin languages right now.');
      setLanguages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const mode = useMemo(() => (editingLanguage ? 'edit' : 'create'), [editingLanguage]);

  const openCreateModal = () => {
    setEditingLanguage(null);
    setFormData(emptyForm);
    setError('');
    setNotice('');
    setIsModalOpen(true);
  };

  const openEditModal = (language) => {
    setEditingLanguage(language);
    setFormData({
      name: language.name || '',
      description: language.description || '',
      image_url: language.image_url || '',
    });
    setError('');
    setNotice('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLanguage(null);
    setFormData(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setNotice('');

    try {
      if (mode === 'create') {
        await axios.post('http://localhost:5000/api/admin/languages', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotice('Language created successfully.');
      } else {
        await axios.put(
          `http://localhost:5000/api/admin/languages/${editingLanguage.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotice('Language updated successfully.');
      }

      closeModal();
      await fetchLanguages();
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          'Unable to save this language right now.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (language) => {
    const confirmed = window.confirm(
      `Delete "${language.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError('');
    setNotice('');

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/languages/${language.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotice(res.data?.message || 'Language deleted successfully.');
      await fetchLanguages();
    } catch (deleteError) {
      setError(
        deleteError.response?.data?.message ||
          'Unable to delete this language right now.'
      );
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#dce6de] bg-white px-6 py-6 shadow-sm sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Admin Languages"
            title="Manage Languages"
            subtitle="Create, edit, and organize available learning languages."
          />

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Add Language
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

      {loading ? (
        <LoadingStateCard
          title="Loading languages"
          description="We are fetching the language catalog for administration."
          className="border-slate-200 bg-white"
        />
      ) : languages.length ? (
        <>
          <section className="hidden overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm lg:block">
            <div className="grid grid-cols-[88px_1.2fr_2fr_120px_180px] gap-4 border-b border-slate-200 bg-[#f8fbf8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span>Image</span>
              <span>Name</span>
              <span>Description</span>
              <span>Lessons</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-slate-200">
              {languages.map((language) => (
                <div
                  key={language.id}
                  className="grid grid-cols-[88px_1.2fr_2fr_120px_180px] gap-4 px-5 py-4"
                >
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-[#eef4f0]">
                    {language.image_url ? (
                      <img
                        src={language.image_url}
                        alt={language.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#2d6c49]">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-base font-semibold text-[#17392d]">{language.name}</p>
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    {language.description || 'No description provided yet.'}
                  </p>

                  <div className="text-sm font-semibold text-[#17392d]">
                    {language.lesson_count}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(language)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(language)}
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

          <section className="grid grid-cols-1 gap-4 lg:hidden">
            {languages.map((language) => (
              <article
                key={language.id}
                className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#eef4f0]">
                    {language.image_url ? (
                      <img
                        src={language.image_url}
                        alt={language.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#2d6c49]">
                        <Globe2 className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-[#17392d]">{language.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {language.description || 'No description provided yet.'}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      {language.lesson_count} lessons
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => openEditModal(language)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(language)}
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
          icon={Globe2}
          title="No languages available yet"
          description="Create the first language path to begin organizing learning content for the platform."
          className="border-slate-200 bg-white"
        />
      )}

      {isModalOpen ? (
        <LanguageFormModal
          mode={mode}
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
