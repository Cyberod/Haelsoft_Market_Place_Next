import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/**
 * Shared chrome for the migrated public pages.
 *
 * A route group, so it adds no path segment: (public)/features still serves
 * /features. In the SPA the Navbar was rendered centrally in App.jsx behind a
 * pathname allow-list, while each page rendered its own <Footer />. Pages that
 * excluded the Navbar (auth, dashboard, checkout, player) are all staying on
 * the legacy SPA, so the allow-list has no equivalent here — anything inside
 * this group gets both.
 */
export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
