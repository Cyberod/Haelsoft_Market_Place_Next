import { notFound } from 'next/navigation';
import SmartLink from '@/components/SmartLink';
import { getProductBySlug, getMarketplaceProducts, ApiError } from '@/lib/api';
import { buildMetadata } from '@/lib/metadata';

const TYPE_LABELS = {
  pdf: 'PDF Document', zip: 'ZIP Archive', figma: 'Figma File',
  psd: 'PSD File', ppt: 'PowerPoint', other: 'Digital File',
};
const TYPE_ICONS = {
  pdf: '📄', zip: '🗜️', figma: '🎨', psd: '🖼️', ppt: '📊', other: '📁',
};

// Prerender every listed product at build time. Unknown slugs still render on
// demand and fall through to notFound().
export async function generateStaticParams() {
  try {
    const { products } = await getMarketplaceProducts();
    return products.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
  } catch {
    // A cold backend at build time must not fail the build; pages then render
    // on demand instead of being prerendered.
    return [];
  }
}

async function loadProduct(slug) {
  try {
    return await getProductBySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

export async function generateMetadata({ params }) {
  // Next 16: params is a Promise.
  const { slug } = await params;
  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    return buildMetadata({
      title: 'Product not found',
      description: 'This product is no longer available on Haelsoft Marketplace.',
      path: `/marketplace/product/${slug}`,
      noindex: true,
    });
  }

  const typeLabel = TYPE_LABELS[product.product_type] || TYPE_LABELS.other;
  return buildMetadata({
    title: `${product.title} — ${typeLabel} | Haelsoft Marketplace`,
    description: product.description
      ? product.description.slice(0, 155)
      : `Buy ${product.title} — a premium ${typeLabel} on Haelsoft Marketplace.`,
    path: `/marketplace/product/${slug}`,
    // The SPA read product.cover_image, which the API does not return, so no
    // product page has ever emitted an og:image. thumbnail_url is the real field.
    image: product.thumbnail_url || undefined,
    // The SPA emitted og:type="product" through raw Helmet, which does no
    // validation. Next's Metadata API rejects it ("Invalid OpenGraph type"),
    // and it buys nothing here — it matters for Facebook product catalogues,
    // not for link previews. Product rich results come from Product JSON-LD
    // in Step 5.3, which is what Google actually reads for price/availability.
    type: 'website',
    absoluteTitle: true,
  });
}

export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  const symbol = product.currency_symbol || product.currency;
  const typeLabel = TYPE_LABELS[product.product_type] || TYPE_LABELS.other;
  const typeIcon = TYPE_ICONS[product.product_type] || TYPE_ICONS.other;

  return (
    <div className="min-h-screen bg-[#FCFAFA] font-inter">
      {/* Breadcrumb */}
      <div className="frame py-5">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <SmartLink href="/" className="text-haelsoft-primary hover:underline">Home</SmartLink>
          <span className="text-inactive">/</span>
          <SmartLink href="/marketplace" className="text-haelsoft-primary hover:underline">Marketplace</SmartLink>
          <span className="text-inactive">/</span>
          <span className="text-inactive truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      <div className="frame pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">{product.title}</h1>
              <p className="text-sm text-inactive">
                by{' '}
                <SmartLink href={`/profile/${product.seller_id}`} className="text-haelsoft-primary hover:underline">
                  {product.seller_name}
                </SmartLink>
              </p>
            </div>

            {/* Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-[#FFF0EB] to-[#FEF7FF] rounded-2xl overflow-hidden">
              {product.thumbnail_url ? (
                <img src={product.thumbnail_url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <span className="text-6xl">{typeIcon}</span>
                  <span className="text-inactive text-sm">{typeLabel}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white border border-grey rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">About this product</h2>
              <p className="text-inactive leading-relaxed whitespace-pre-wrap text-sm">{product.description}</p>
            </div>

            {/* What's included */}
            <div className="bg-white border border-grey rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">What&apos;s included</h2>
              <div className="inline-flex items-center gap-4 bg-[#FFF0EB] rounded-xl px-5 py-4">
                <span className="text-3xl">{typeIcon}</span>
                <div>
                  <p className="font-semibold text-black text-sm">{typeLabel}</p>
                  {product.file_size_mb > 0 && (
                    <p className="text-xs text-inactive mt-0.5">{product.file_size_mb} MB</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column — sticky price card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-grey rounded-2xl p-6 sticky top-24 space-y-5">
              <div>
                <p className="text-3xl font-bold text-black">
                  {symbol}{Number(product.price).toLocaleString()}
                </p>
                <p className="text-xs text-inactive mt-1">{product.currency} · One-time purchase</p>
              </div>

              {/* CTA — /checkout is still on the legacy SPA. The SPA passed the
                  product through router state; Checkout already has a fallback
                  that refetches by productId for direct arrivals. */}
              <a
                href={`/checkout?productId=${product.id}`}
                className="block text-center w-full bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Buy Now
              </a>

              <div className="border-t border-grey pt-5 space-y-3">
                <h3 className="font-bold text-black text-sm">Product Details</h3>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-xl w-5 text-center">{typeIcon}</span>
                  <span className="text-inactive">{typeLabel}</span>
                </div>

                {product.file_size_mb > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-inactive flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span className="text-inactive">{product.file_size_mb} MB download</span>
                  </div>
                )}

                {product.total_sales > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-inactive flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-inactive">{product.total_sales} purchases</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-inactive flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-inactive">Instant digital download</span>
                </div>
              </div>

              {/* Seller */}
              <div className="border-t border-grey pt-5">
                <h3 className="font-bold text-black text-sm mb-3">Seller</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-inactive">{product.seller_name}</span>
                  <SmartLink href={`/profile/${product.seller_id}`} className="text-xs text-haelsoft-primary font-medium hover:underline">
                    View profile →
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
