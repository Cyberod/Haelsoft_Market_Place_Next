import SmartLink from '@/components/SmartLink';

// Mirrors the SPA's "Course Not Found" state.
export default function CourseNotFound() {
  return (
    <div className="min-h-screen bg-[#FCFAFA] font-inter flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold text-black">Course Not Found</h1>
      <p className="text-inactive text-sm text-center">
        This course doesn&apos;t exist or is no longer available.
      </p>
      <SmartLink href="/marketplace" className="text-haelsoft-primary underline text-sm">
        Browse Marketplace
      </SmartLink>
    </div>
  );
}
