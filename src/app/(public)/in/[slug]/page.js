import { notFound } from 'next/navigation';
import InstructorProfile from '@/components/InstructorProfile';
import { getInstructorBySlug, getFeaturedInstructors, ApiError } from '@/lib/api';
import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { personSchema } from '@/lib/schema';

export async function generateStaticParams() {
  try {
    const instructors = await getFeaturedInstructors();
    return instructors.filter((i) => i.profile_slug).map((i) => ({ slug: i.profile_slug }));
  } catch {
    return [];
  }
}

async function load(slug) {
  try {
    return await getInstructorBySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

/**
 * Canonical home for an instructor. /profile/<id> renders the same person and
 * points its canonical here, because the API uses the same value for `id` and
 * `profile_slug` — so the two URLs are exact duplicates.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  let instructor;
  try {
    instructor = await getInstructorBySlug(slug);
  } catch {
    return buildMetadata({
      title: 'Instructor not found',
      description: 'This instructor profile is not available on Haelsoft Marketplace.',
      path: `/in/${slug}`,
      noindex: true,
    });
  }
  return instructorMetadata(instructor, `/in/${slug}`);
}

export function instructorMetadata(instructor, path) {
  const bio = (instructor.bio || '').replace(/\s+/g, ' ').trim();
  return buildMetadata({
    title: `${instructor.name}${instructor.title ? ` — ${instructor.title}` : ''} | Haelsoft Marketplace`,
    description: bio ? bio.slice(0, 155) : `Courses and digital products by ${instructor.name} on Haelsoft Marketplace.`,
    path,
    image: instructor.profileImage || instructor.image || undefined,
    type: 'profile',
    absoluteTitle: true,
  });
}

export default async function InstructorPage({ params }) {
  const { slug } = await params;
  const instructor = await load(slug);
  return (
    <>
      <JsonLd data={personSchema(instructor, slug)} />
      <InstructorProfile instructor={instructor} />
    </>
  );
}
