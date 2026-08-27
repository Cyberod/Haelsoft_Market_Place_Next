import { notFound } from 'next/navigation';
import InstructorProfile from '@/components/InstructorProfile';
import { getInstructorBySlug, ApiError } from '@/lib/api';
import { instructorMetadata } from '../../in/[slug]/page';

// The SPA exposes the same profile at /in/<slug> and /profile/<id>, and the API
// returns the same value for both. Rendered on demand rather than prerendered,
// and its canonical points at /in/<slug> so the duplicate consolidates there
// instead of the two URLs competing.
export async function generateMetadata({ params }) {
  const { instructorId } = await params;
  let instructor;
  try {
    instructor = await getInstructorBySlug(instructorId);
  } catch {
    return { title: 'Instructor not found', robots: { index: false, follow: false } };
  }
  return instructorMetadata(instructor, `/in/${instructor.profile_slug || instructorId}`);
}

export default async function ProfileByIdPage({ params }) {
  const { instructorId } = await params;
  try {
    const instructor = await getInstructorBySlug(instructorId);
    return <InstructorProfile instructor={instructor} />;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}
