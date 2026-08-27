'use client';

import { useEffect, useRef } from 'react';

/**
 * Trustindex injects a <script> into a container and calls a global to render.
 * Kept as a client island so the rest of the homepage stays server-rendered;
 * the widget's own content is third-party and not indexable either way.
 */
export default function TrustindexWidget({ src, className = 'min-h-[160px]' }) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-trustindex', 'true');
    container.appendChild(script);

    if (window.renderTrustindexWidgets) window.renderTrustindexWidgets();
  }, [src]);

  return <div ref={ref} className={className} />;
}
