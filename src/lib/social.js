/**
 * Single source of truth for Haelsoft's social profiles.
 *
 * These URLs lived in three places: Footer.jsx's SOCIALS, schema.js's
 * organization.sameAs, and ContactInformation.jsx — where the icons rendered
 * with href="#" because the array carried no URL at all. The copies had
 * already drifted: the footer's LinkedIn href carried a ?viewAsMember=true
 * param that sameAs did not. sameAs is meant to list canonical profile URLs,
 * so the tracking param is dropped rather than propagated.
 */
export const SOCIAL_LINKS = [
  { name: 'Twitter',   url: 'https://x.com/Haelsoftedtech',                           icon: '/twitter.svg' },
  { name: 'Facebook',  url: 'https://web.facebook.com/profile.php?id=61590413063452', icon: '/facebook.svg' },
  { name: 'Instagram', url: 'https://www.instagram.com/healsoftedtech/',              icon: '/instagram.svg' },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/company/haelsoft/',             icon: '/linkedin.svg' },
  { name: 'TikTok',    url: 'https://www.tiktok.com/@haelsoft',                       icon: '/tiktok.svg' },
];
