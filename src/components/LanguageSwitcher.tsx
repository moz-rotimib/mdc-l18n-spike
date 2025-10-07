'use client';

import { useEffect, useState } from 'react';

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
];

export default function LanguageSwitcher({
  initialLocale,
}: {
  initialLocale?: string;
}) {
  const [locale, setLocale] = useState(initialLocale || 'en');

  useEffect(() => {
    // Sync state with cookie on mount
    try {
      const c = document.cookie
        .split('; ')
        .find((row) => row.startsWith('locale='))
        ?.split('=')[1];
      if (c) setLocale(c);
    } catch {
      // ignore
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setLocale(newLocale);

    // Set cookie for 1 year
    document.cookie = `locale=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;

    // Reload to let server read the cookie and provide translations
    // Use location.replace to avoid adding history entries
    window.location.replace(
      window.location.pathname + window.location.search + window.location.hash
    );
  };

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={onChange}
        className="border rounded px-2 py-1"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
