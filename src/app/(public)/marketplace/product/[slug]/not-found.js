import SmartLink from '@/components/SmartLink';

// Mirrors the SPA's error state for a missing product.
export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-[#FCFAFA] font-inter flex items-center justify-center">
      <div className="text-center">
        <p className="text-inactive mb-4">Product not found.</p>
        <SmartLink href="/marketplace" className="text-haelsoft-primary font-semibold hover:underline">
          Back to Marketplace
        </SmartLink>
      </div>
    </div>
  );
}
