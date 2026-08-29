'use client';

/**
 * Footer — Clean static footer section.
 */
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--footer-bg)' }}
    >
      {/* Top border — subtle pixel line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--card-border)' }}
      />

      {/* Text content */}
      <div
        className="relative py-12 px-6 text-center"
        style={{ background: 'var(--footer-bg)' }}
      >
        <p
          className="font-pixel text-xs md:text-sm tracking-wider mb-6"
          style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em' }}
        >
          Still wandering. Still together.
        </p>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-px" style={{ background: 'var(--card-border)' }} />
          {/* Tiny paw */}
          <svg width="10" height="10" viewBox="0 0 10 10" shapeRendering="crispEdges">
            <rect x="3" y="5" width="4" height="4" fill="var(--text-accent)" opacity="0.3" />
            <rect x="1" y="2" width="2" height="2" fill="var(--text-accent)" opacity="0.3" />
            <rect x="4" y="1" width="2" height="2" fill="var(--text-accent)" opacity="0.3" />
            <rect x="7" y="2" width="2" height="2" fill="var(--text-accent)" opacity="0.3" />
          </svg>
          <div className="w-8 h-px" style={{ background: 'var(--card-border)' }} />
        </div>

        <p
          className="text-xs"
          style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
        >
          &copy; 2 STRAY CATS
        </p>
      </div>
    </footer>
  );
}
