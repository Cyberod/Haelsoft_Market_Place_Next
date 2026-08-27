'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const CATEGORY_TABS = [
  { value: 'all',      label: 'All'              },
  { value: 'courses',  label: 'Courses'          },
  { value: 'products', label: 'Digital Products' },
];

export const PRODUCT_TYPES = [
  { value: '',      label: 'All Types' },
  { value: 'pdf',   label: 'PDF'       },
  { value: 'zip',   label: 'ZIP'       },
  { value: 'figma', label: 'Figma'     },
  { value: 'psd',   label: 'PSD'       },
  { value: 'ppt',   label: 'PPT'       },
  { value: 'other', label: 'Other'     },
];

/**
 * Only the controls are a client island. The grid itself is rendered on the
 * server from searchParams, because useSearchParams forces everything up to the
 * nearest Suspense boundary to be client-rendered — putting the catalogue in
 * here would keep it out of the initial HTML and undo the point of the migration.
 *
 * Filter state lives in the URL rather than React state, so filtered views are
 * shareable and server-rendered.
 */
export default function MarketplaceFilters({ category, search, selectedType }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [searchInput, setSearchInput] = useState(search);

  const push = (next) => {
    const q = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === '' || v == null || (k === 'category' && v === 'all')) q.delete(k);
      else q.set(k, v);
    }
    const qs = q.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(search || selectedType);

  return (
    <>
      {/* Search — rendered in the page header slot */}
      <form
        onSubmit={(e) => { e.preventDefault(); push({ search: searchInput.trim() }); }}
        className="flex gap-3 max-w-lg"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={category === 'courses' ? 'Search courses…' : category === 'products' ? 'Search products…' : 'Search courses & products…'}
          className="flex-1 border border-grey rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-haelsoft-primary transition-colors"
        />
        <button
          type="submit"
          className="bg-haelsoft-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      </form>

      {/* Category tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-grey mt-8">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => push({ category: tab.value, type: '' })}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              category === tab.value
                ? 'border-haelsoft-primary text-haelsoft-primary'
                : 'border-transparent text-inactive hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product type filter — only on the Digital Products tab */}
      {category === 'products' && (
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-sm text-inactive font-medium mr-1">Type:</span>
          {PRODUCT_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => push({ type: t.value })}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
                selectedType === t.value
                  ? 'bg-haelsoft-primary text-white border-haelsoft-primary'
                  : 'border-grey text-inactive hover:border-haelsoft-primary hover:text-haelsoft-primary bg-white'
              }`}
            >
              {t.label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={() => { setSearchInput(''); push({ search: '', type: '' }); }}
              className="text-sm px-3 py-1.5 text-inactive hover:text-black transition-colors underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
