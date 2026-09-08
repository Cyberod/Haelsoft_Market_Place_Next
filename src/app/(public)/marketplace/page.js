import { Suspense } from 'react';
import CourseCard from '@/components/CourseCard';
import ProductCard from '@/components/ProductCard';
import MarketplaceFilters from '@/components/MarketplaceFilters';
import { getPublicCourses, getMarketplaceProducts } from '@/lib/api';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Digital Products, Courses & Services | Haelsoft Marketplace',
  description:
    'Explore courses, e-books, templates, digital products and services from African creators and experts. Discover and buy digital products on Haelsoft Marketplace.',
  // Canonical stays on the bare path so filtered views consolidate into it
  // rather than competing as near-duplicates.
  path: '/marketplace',
  absoluteTitle: true,
});

function EmptyState({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-grey py-12 text-center">
      <p className="text-sm text-inactive">{children}</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
      {message}
    </div>
  );
}

const GRID = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

export default async function Marketplace({ searchParams }) {
  // Next 16: searchParams is a Promise.
  const sp = await searchParams;
  const category = sp?.category ?? 'all';
  const search = sp?.search ?? '';
  const selectedType = sp?.type ?? '';

  const showCourses = category === 'all' || category === 'courses';
  const showProducts = category === 'all' || category === 'products';

  // Fetched on the server so the catalogue is in the initial HTML for every
  // filter state. Responses are cached by the API client's revalidate window,
  // so a dynamic render does not mean an upstream request per visitor.
  const [coursesRes, productsRes] = await Promise.all([
    showCourses ? getPublicCourses({ search }).catch((e) => ({ error: e })) : null,
    showProducts ? getMarketplaceProducts({ search, type: selectedType }).catch((e) => ({ error: e })) : null,
  ]);

  const courses = coursesRes?.courses ?? [];
  const products = productsRes?.products ?? [];
  const totalCount = (coursesRes?.count ?? 0) + (productsRes?.count ?? 0);
  const hasActiveFilters = Boolean(search || selectedType);

  return (
    <div className="min-h-screen bg-[#FCFAFA] font-inter">
      {/* Page header */}
      <div className="bg-white border-b border-grey">
        <div className="frame py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Marketplace</h1>
          <p className="text-inactive mb-6 text-sm md:text-base">
            Browse courses and digital products from top creators
          </p>

          <div>
            <Suspense fallback={<div className="h-[42px] max-w-lg" />}>
              <MarketplaceFilters category={category} search={search} selectedType={selectedType} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="frame py-8">
        {/* Results summary */}
        <p className="text-sm text-inactive mb-5">
          {totalCount} {totalCount === 1 ? 'result' : 'results'} found
          {search && (
            <span> for &ldquo;<span className="font-medium text-black">{search}</span>&rdquo;</span>
          )}
        </p>

        {/* ── Courses ── */}
        {showCourses && (
          <div className={category === 'all' && showProducts ? 'mb-12' : ''}>
            {category === 'all' && <h2 className="text-lg font-bold text-black mb-4">Courses</h2>}
            {coursesRes?.error ? (
              <ErrorState message="Failed to load courses." />
            ) : courses.length === 0 ? (
              <EmptyState>{search ? 'No courses match your search.' : 'No published courses yet.'}</EmptyState>
            ) : (
              <div className={GRID}>
                {courses.map((course) => <CourseCard key={course.id} course={course} />)}
              </div>
            )}
          </div>
        )}

        {/* ── Digital Products ── */}
        {showProducts && (
          <div>
            {category === 'all' && <h2 className="text-lg font-bold text-black mb-4">Digital Products</h2>}
            {productsRes?.error ? (
              <ErrorState message="Failed to load products." />
            ) : products.length === 0 ? (
              <EmptyState>{hasActiveFilters ? 'No products match your filters.' : 'No products listed yet.'}</EmptyState>
            ) : (
              <div className={GRID}>
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
