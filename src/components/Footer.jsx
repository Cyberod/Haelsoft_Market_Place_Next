import ActiveLink from './ActiveLink';

// Server component: the only interactive part is active-link styling, which is
// isolated in <ActiveLink>. Everything else ships as plain HTML.

const NAV_LINK = {
  className: 'transition-colors cursor-pointer',
  activeClassName: 'text-haelsoft-primary font-semibold',
  inactiveClassName: 'text-inactive hover:text-haelsoft-primary',
};

const SOCIALS = [
  { href: 'https://x.com/Haelsoftedtech', src: '/twitter.svg', alt: 'Twitter' },
  { href: 'https://web.facebook.com/profile.php?id=61590413063452', src: '/facebook.svg', alt: 'Facebook' },
  { href: 'https://www.instagram.com/healsoftedtech/', src: '/instagram.svg', alt: 'Instagram' },
  { href: 'https://www.linkedin.com/company/haelsoft/?viewAsMember=true', src: '/linkedin.svg', alt: 'LinkedIn' },
  { href: 'https://www.tiktok.com/@haelsoft', src: '/tiktok.svg', alt: 'TikTok' },
];

const WEBSITE_LINKS = [
  { href: '/', label: 'Home', end: true },
  { href: '/HowitWorks', label: 'How it Works' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/marketplace', label: 'Marketplace' },
];

export default function Footer() {
  return (
    <footer className="w-full  text-white pt-16">
      <div className="flex flex-col lg:flex-row justify-between frame">
        {/* Left Section - Logo and Social */}
        <div className="flex flex-col">
          <img src="/HaelsoftLogo.svg" alt="Haelsoft Logo" className="w-20 h-auto mb-3" />
          <p className="text-inactive text-base leading-6 mb-8 max-w-sm">
            Get answers to common questions about Haelsoft, how it works, and what to expect.
          </p>
          <div className="flex gap-6 mb-8">
            {SOCIALS.map(({ href, src, alt }) => (
              <a key={alt} href={href} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={src} alt={alt} className="w-8 h-8" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="flex flex-col sm:flex-row gap-16 md:justify-between lg:gap-24">
          {/* Website */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-black">Website</h3>
            <ul className="space-y-4">
              {WEBSITE_LINKS.map(({ href, label, end }) => (
                <li key={href}>
                  <ActiveLink href={href} end={end} {...NAV_LINK}>{label}</ActiveLink>
                </li>
              ))}
              <li>
                <a href="https://www.haelsoftmasterclass.com/blog/" target="_blank" rel="noreferrer" className="text-inactive hover:text-haelsoft-primary cursor-pointer transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-black">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-inactive hover:text-haelsoft-primary transition-colors">FAQs</a></li>
              <li>
                <ActiveLink href="/contact" className="transition-colors" activeClassName="text-haelsoft-primary font-semibold" inactiveClassName="text-inactive hover:text-haelsoft-primary">Contact</ActiveLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-black">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-inactive hover:text-haelsoft-primary transition-colors">Haelsoft Edtech</a></li>
              <li><a href="#" className="text-inactive hover:text-haelsoft-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="text-inactive hover:text-haelsoft-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="frame">
        <div className="footer-divider mt-8 "></div>
      </div>

      {/* Copyright and Legal Links */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-8 frame">
        <p className="text-inactive text-sm">
          @{new Date().getFullYear()} Haelsoft. All rights reserved
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-inactive text-sm underline hover:text-haelsoft-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-inactive text-sm underline hover:text-haelsoft-primary transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Scrolling Footer SVG */}
      <div className="mt-20 overflow-hidden w-full">
        <div className="animate-scroll flex gap-10 lg:gap-20">
          <img src="/HaelsoftFooter.svg" alt="HaelsoftFooter" className="w-full h-auto flex-shrink-0" />
          <img src="/HaelsoftFooter.svg" alt="HaelsoftFooter" className="w-full h-auto flex-shrink-0" />
        </div>
      </div>
    </footer>
  );
}
