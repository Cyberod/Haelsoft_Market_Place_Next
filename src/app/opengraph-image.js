import { ImageResponse } from 'next/og';

/**
 * Default social preview, generated at build time.
 *
 * The site has no OG image asset: HomeImage.png is 10 MB (over Facebook's
 * limit) and the logo is an SVG, which crawlers do not render. Generating one
 * avoids blocking on artwork and guarantees the correct 1200x630 dimensions.
 * Pages with their own imagery (courses, products, instructors) override this
 * with their real thumbnail.
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Haelsoft Marketplace — Buy & Sell Digital Products & Online Courses';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #F15F27 0%, #FFA684 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 2, opacity: 0.9 }}>
          HAELSOFT MARKETPLACE
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.15, marginTop: 24 }}>
          Buy &amp; sell digital products and online courses
        </div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.92 }}>
          Courses, eBooks, templates and creative assets — across Africa
        </div>
      </div>
    ),
    size,
  );
}
