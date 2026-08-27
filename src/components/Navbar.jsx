'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ActiveLink from './ActiveLink';
import { readStoredUser, logout } from '@/lib/auth-client';

const NAV_LINKS = [
  { to: '/',            label: 'Home',         end: true },
  { to: '/HowitWorks',  label: 'How it works'            },
  { to: '/features',    label: 'Features'                },
  { to: '/pricing',     label: 'Pricing'                 },
  { to: '/marketplace', label: 'Marketplace'             },
];

function Avatar({ user, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  const initials = [user.first_name?.[0], user.last_name?.[0]]
    .filter(Boolean).join('').toUpperCase() || user.username?.[0]?.toUpperCase() || '?';

  if (user.avatar) {
    return (
      <img src={user.avatar} alt="" className={`${sizeClass} rounded-full object-cover flex-shrink-0`} />
    );
  }
  return (
    <div className={`${sizeClass} rounded-full bg-linear-to-br from-[#FFF0EB] to-[#FCDDD3] flex items-center justify-center text-haelsoft-primary font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  // Auth state lives in localStorage, which the server cannot read. Until the
  // first client render we deliberately render neither the signed-in nor the
  // signed-out UI, so a signed-in visitor never sees a flash of "Get Started".
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Re-read auth state on every navigation so the Navbar is always in sync
  useEffect(() => {
    setUser(readStoredUser());
    setMounted(true);
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileOpen(false);
    await logout();
    // /login is still served by the legacy SPA — force a real navigation.
    window.location.href = '/login';
  };

  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || ''
    : '';
  const isStudent = user?.role === 'student';

  return (
    <nav className="max-w-full frame bg-white h-20 py-auto flex justify-between items-center lg:justify-center lg:py-auto sticky top-0 z-50 font-inter border-b border-grey shadow-xs">

      {/* Logo */}
      <ActiveLink href="/" end>
        <img src="/HaelsoftLogo.svg" alt="Haelsoft Logo" className="w-27 h-auto" />
      </ActiveLink>

      {/* Desktop nav links */}
      <div className="hidden lg:flex flex-1 justify-center space-x-8 text-inactive text-sm font-medium">
        {NAV_LINKS.map(({ to, label, end }) => (
          <ActiveLink
            key={to}
            href={to}
            end={end}
            className="hover:text-[#F15F27] transition-colors"
            activeClassName="text-haelsoft-primary font-semibold"
          >
            {label}
          </ActiveLink>
        ))}
        <a
          href="https://www.haelsoftmasterclass.com/blog/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#F15F27]"
        >
          Blog
        </a>
      </div>

      {/* Desktop right — auth section */}
      <div className="hidden lg:flex items-center gap-3 min-h-11">
        {!mounted ? null : user ? (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition cursor-pointer"
            >
              <Avatar user={user} size="sm" />
              <span className="text-sm font-semibold text-black max-w-[130px] truncate">{displayName}</span>
              <svg
                className={`w-4 h-4 text-inactive transition-transform flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-grey shadow-xl z-50 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-grey">
                  <Avatar user={user} size="md" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-black truncate">{displayName}</p>
                    <p className="text-xs text-inactive truncate">@{user.username}</p>
                  </div>
                </div>

                <div className="py-1">
                  <a
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-haelsoft-primary transition"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </a>
                  {isStudent && (
                    <a
                      href="/dashboard/courses"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-haelsoft-primary transition"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      My Courses
                    </a>
                  )}
                  <a
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-haelsoft-primary transition"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </a>
                </div>

                <div className="border-t border-grey py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <a
              href="/login"
              className="text-[#F15F27] font-semibold py-3 text-sm px-3.20 lg:w-15.5 2xl:w-22.5"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
            >
              Get Started
            </a>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <div className="lg:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="focus:outline-none p-2" aria-label="Toggle menu">
          {mobileOpen ? (
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-gray-600 text-4xl leading-none">×</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-gray-600" />
              <div className="w-5 h-0.5 bg-gray-600" />
              <div className="w-5 h-0.5 bg-gray-600" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#F7F8FA] border-b border-grey shadow-lg z-10 font-inter font-medium text-sm">
          <div className="px-4 py-3 space-y-0.5">
            {NAV_LINKS.map(({ to, label, end }) => (
              <ActiveLink
                key={to}
                href={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl transition"
                activeClassName="text-haelsoft-primary font-semibold bg-orange-50"
                inactiveClassName="text-gray-700 hover:bg-white"
              >
                {label}
              </ActiveLink>
            ))}
            <a
              href="https://www.haelsoftmasterclass.com/blog/"
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-white"
            >
              Blog
            </a>
          </div>

          <div className="border-t border-grey px-4 py-3 space-y-1">
            {!mounted ? null : user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mb-1 bg-white rounded-xl">
                  <Avatar user={user} size="md" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-black truncate">{displayName}</p>
                    <p className="text-xs text-inactive truncate">@{user.username}</p>
                  </div>
                </div>
                <a href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-white hover:text-haelsoft-primary transition">Dashboard</a>
                {isStudent && (
                  <a href="/dashboard/courses" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-white hover:text-haelsoft-primary transition">My Courses</a>
                )}
                <a href="/dashboard/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-white hover:text-haelsoft-primary transition">Profile</a>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition mt-1">Logout</button>
              </>
            ) : (
              <div className="space-y-3 pt-1">
                <a href="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-white transition">Login</a>
                <a href="/signup" onClick={() => setMobileOpen(false)} className="block w-full py-3 bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white rounded-xl text-center font-semibold">Get Started</a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
