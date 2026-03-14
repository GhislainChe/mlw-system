import axios from 'axios';
import { useEffect, useState } from 'react';

import LanguagesGridCard from '../components/dashboard/LanguagesGridCard';

export default function Languages() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/languages');
        setLanguages(res.data.languages || res.data || []);
      } catch (error) {
        console.error('Failed to fetch languages', error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Languages</p>
        <h2 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.03em] text-[#17392d]">
          Explore available languages
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Choose a language path and begin learning with guided lessons.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => (
          <LanguagesGridCard key={language.id} language={language} />
        ))}
      </div>
    </div>
  );
}
