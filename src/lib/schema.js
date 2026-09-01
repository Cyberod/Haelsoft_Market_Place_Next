import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from './metadata';
import { SOCIAL_LINKS } from './social';

const abs = (path) => `${SITE_URL}${path}`;

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs('/HaelsoftLogo.svg'),
  description:
    "Haelsoft Marketplace is Nigeria's premier platform to buy and sell digital products, online courses, and creative assets.",
  sameAs: SOCIAL_LINKS.map((s) => s.url),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'info@haelsoftmasterclass.com',
    telephone: '+234 7062827560',
  },
};

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export function breadcrumbs(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/**
 * schema.org's inLanguage expects a BCP-47 code, but the API stores display
 * names ("English"). Map the ones we know, pass through anything that already
 * looks like a code, and omit the rest rather than emit an invalid value.
 */
const LANGUAGE_CODES = {
  english: 'en', french: 'fr', spanish: 'es', portuguese: 'pt', arabic: 'ar',
  swahili: 'sw', hausa: 'ha', yoruba: 'yo', igbo: 'ig', german: 'de',
  italian: 'it', chinese: 'zh', hindi: 'hi',
};

function bcp47(language) {
  if (!language) return null;
  const raw = String(language).trim();
  const named = LANGUAGE_CODES[raw.toLowerCase()];
  if (named) return named;
  // Already a code — pass it through unchanged so region subtags keep their case.
  return /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/i.test(raw) ? raw : null;
}

export function courseSchema(course, slug) {
  const price = Number(course.price) || 0;
  const rating = Number(course.average_rating) || 0;
  const reviews = Number(course.total_reviews) || 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.short_description || course.description || course.title,
    url: abs(`/courses/${slug}`),
    ...(course.thumbnail_url && { image: course.thumbnail_url }),
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    ...(course.instructor_name && {
      instructor: { '@type': 'Person', name: course.instructor_name },
    }),
    ...(bcp47(course.language) && { inLanguage: bcp47(course.language) }),
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      url: abs(`/courses/${slug}`),
    },
    // Only emit a rating when there is one — an aggregateRating with
    // reviewCount 0 is invalid and Google flags it.
    ...(rating > 0 && reviews > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviews,
      },
    }),
  };
}

export function productSchema(product, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || product.title,
    url: abs(`/marketplace/product/${slug}`),
    image: product.thumbnail_url || DEFAULT_OG_IMAGE,
    ...(product.seller_name && {
      brand: { '@type': 'Brand', name: product.seller_name },
    }),
    offers: {
      '@type': 'Offer',
      price: Number(product.price) || 0,
      priceCurrency: product.currency || 'NGN',
      availability: 'https://schema.org/InStock',
      url: abs(`/marketplace/product/${slug}`),
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
  };
}

export function personSchema(instructor, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: instructor.name,
      ...(instructor.title && { jobTitle: instructor.title }),
      ...(instructor.bio && { description: instructor.bio.replace(/\s+/g, ' ').trim() }),
      ...((instructor.profileImage || instructor.image) && {
        image: abs(instructor.profileImage || instructor.image),
      }),
      url: abs(`/in/${slug}`),
      worksFor: { '@id': `${SITE_URL}/#organization` },
      // The API currently returns "#" for every instructor social link.
      // sameAs must contain real URLs, so placeholders are dropped and the
      // property is omitted entirely when nothing real remains.
      ...(() => {
        const urls = (instructor.socialLinks ?? [])
          .map((s) => s.url)
          .filter((u) => typeof u === 'string' && /^https?:\/\//.test(u));
        return urls.length > 0 ? { sameAs: urls } : {};
      })(),
    },
  };
}
