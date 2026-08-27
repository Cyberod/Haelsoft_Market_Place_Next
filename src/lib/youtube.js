const YT_RE = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

/**
 * Extracts the 11-character video ID from any YouTube URL format.
 * Returns null if the URL is not a recognisable YouTube URL.
 *
 * Supported formats:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(YT_RE);
  return match ? match[1] : null;
}

/**
 * Returns a privacy-enhanced embed URL for a YouTube video ID.
 * Uses youtube-nocookie.com — no tracking cookies until the user clicks play.
 */
export function buildEmbedUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/**
 * Returns true if the URL is a valid YouTube URL.
 */
export function isValidYouTubeUrl(url) {
  return extractYouTubeId(url) !== null;
}
