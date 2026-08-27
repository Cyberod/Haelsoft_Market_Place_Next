'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { extractYouTubeId, buildEmbedUrl } from '@/lib/youtube';
import { fetchBlob } from '@/lib/auth-client';

// ── PDF icon (shared between PDFViewer states) ─────────────────────────────────
function PdfIcon({ className: cls }) {
  return (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

// ── PDFViewer ──────────────────────────────────────────────────────────────────
// Fetches the PDF through the auth-protected serve endpoint (so the file is
// never accessible without a valid session), creates a Blob URL for the iframe,
// and handles loading / error states explicitly.
function PDFViewer({ lesson, className }) {
  // 'loading' → 'loaded' | 'error'
  const [status, setStatus] = useState('loading');
  const [objectUrl, setObjectUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const prevObjectUrl = useRef(null);

  const serveUrl = lesson?.pdf_file_url;

  useEffect(() => {
    if (!serveUrl) {
      setStatus('error');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setObjectUrl(null);

    fetchBlob(serveUrl)
      .then(blob => {
        if (cancelled) return;
        // Revoke previous Blob URL to avoid memory leaks
        if (prevObjectUrl.current) URL.revokeObjectURL(prevObjectUrl.current);
        const url = URL.createObjectURL(blob);
        prevObjectUrl.current = url;
        setObjectUrl(url);
        setStatus('loaded');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, [serveUrl]);

  // Revoke Blob URL on unmount
  useEffect(() => () => {
    if (prevObjectUrl.current) URL.revokeObjectURL(prevObjectUrl.current);
  }, []);

  const handleDownload = async () => {
    if (downloading) return;
    // Re-use the already-fetched Blob URL if available, otherwise re-fetch
    if (objectUrl) {
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `${lesson?.title || 'lesson'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    if (!serveUrl) return;
    setDownloading(true);
    try {
      const blob = await fetchBlob(serveUrl);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${lesson?.title || 'lesson'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // silently fail — user can retry
    } finally {
      setDownloading(false);
    }
  };

  if (!serveUrl) {
    return (
      <div className={`flex aspect-video items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 ${className}`}>
        <p className="text-sm text-gray-400">No PDF file available for this lesson.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white overflow-hidden ${className}`}>
      {/* Viewer area */}
      <div className="relative" style={{ height: '75vh', minHeight: '460px' }}>

        {/* Loading overlay */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 gap-3">
            <div className="w-10 h-10 border-4 border-haelsoft-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-inactive">Loading PDF…</p>
          </div>
        )}

        {/* Error overlay */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 gap-4 px-8 text-center">
            <PdfIcon cls="w-12 h-12 text-red-300" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Could not display the PDF</p>
              <p className="text-xs text-gray-400 mt-1">Use the Download button below to save and open it locally.</p>
            </div>
          </div>
        )}

        {/* iframe renders the Blob URL — no auth headers needed for blob: scheme */}
        {objectUrl && (
          <iframe
            src={objectUrl}
            title={lesson?.title || 'PDF Lesson'}
            className="w-full h-full border-0"
          />
        )}
      </div>

      {/* Download bar — always visible, reuses cached Blob */}
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2.5 min-w-0">
          <PdfIcon cls="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-sm font-medium text-gray-700 truncate">{lesson?.title || 'PDF Document'}</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {downloading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          {downloading ? 'Preparing…' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}

const LessonPlayer = ({ lesson, videoUrl, title, className = '' }) => {
  const lessonType = lesson?.lesson_type || (videoUrl || lesson?.video_url ? 'video' : null);

  if (lessonType === 'video') {
    // Uploaded video file takes priority over YouTube URL
    if (lesson?.video_file_url) {
      return (
        <div className={`aspect-video w-full overflow-hidden rounded-2xl bg-black ${className}`}>
          <video
            src={lesson.video_file_url}
            controls
            controlsList="nodownload"
            className="h-full w-full"
            title={title || lesson?.title || 'Lesson video'}
          />
        </div>
      );
    }

    const ytUrl  = videoUrl || lesson?.video_url;
    const videoId = extractYouTubeId(ytUrl);

    if (!videoId) {
      return (
        <div className={`flex aspect-video items-center justify-center rounded-2xl bg-gray-100 ${className}`}>
          <p className="text-sm text-gray-400">Invalid or missing video source.</p>
        </div>
      );
    }

    return (
      <div className={`aspect-video w-full overflow-hidden rounded-2xl bg-black ${className}`}>
        <iframe
          src={buildEmbedUrl(videoId)}
          title={title || lesson?.title || 'Lesson video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  // Standalone videoUrl prop (no lesson object) — always treat as YouTube
  if (videoUrl) {
    const videoId = extractYouTubeId(videoUrl);
    if (videoId) {
      return (
        <div className={`aspect-video w-full overflow-hidden rounded-2xl bg-black ${className}`}>
          <iframe
            src={buildEmbedUrl(videoId)}
            title={title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      );
    }
  }

  if (lessonType === 'pdf') {
    return <PDFViewer lesson={lesson} className={className} />;
  }

  if (lessonType === 'text') {
    return (
      <div className={`min-h-48 rounded-2xl border border-gray-200 bg-white p-6 ${className}`}>
        {lesson?.content ? (
          <div className="prose prose-sm max-w-none text-gray-800">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No content for this lesson.</p>
        )}
      </div>
    );
  }

  return null;
};

export default LessonPlayer;
