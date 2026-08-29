'use client';

import StoryTimeline from '../story/StoryTimeline';

/**
 * IntroSection — Clean modern section after the hero with Pixel Story Timeline.
 */
export default function IntroSection() {
  return (
    <section
      id="intro"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0a0e1a 0%, #0f1424 30%, #121828 100%)' }}
    >
      {/* Subtle pixel-art edge decorations */}
      <PawPrintDecorations />

      <div className="max-w-3xl mx-auto text-center opacity-100 translate-y-0">
        {/* Heading */}
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide mb-8"
          style={{ color: 'var(--text-primary)', letterSpacing: '0.02em' }}
        >
          Somewhere between friendship
          <br />
          and something else.
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px" style={{ background: 'var(--card-border)' }} />
          <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges">
            <rect x="2" y="0" width="3" height="3" fill="var(--text-accent)" opacity="0.5" />
            <rect x="7" y="0" width="3" height="3" fill="var(--text-accent)" opacity="0.3" />
            <rect x="0" y="5" width="3" height="3" fill="var(--text-accent)" opacity="0.3" />
            <rect x="5" y="4" width="4" height="4" fill="var(--text-accent)" opacity="0.6" />
            <rect x="9" y="5" width="3" height="3" fill="var(--text-accent)" opacity="0.3" />
            <rect x="2" y="9" width="3" height="3" fill="var(--text-accent)" opacity="0.3" />
            <rect x="7" y="9" width="3" height="3" fill="var(--text-accent)" opacity="0.5" />
          </svg>
          <div className="w-12 h-px" style={{ background: 'var(--card-border)' }} />
        </div>

        {/* Description */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-12"
          style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
        >
          Two wandering souls who found each other in the quiet corners of life.
          This is their little space — a collection of shared moments, inside jokes,
          favorite songs, and all the small things that make up their story.
        </p>

        {/* Interactive Story Timeline */}
        <StoryTimeline />

        {/* Small pixel cat silhouettes as separator */}
        <div className="mt-12 flex items-center justify-center gap-6 opacity-100">
          <SmallCatSilhouette facing="right" />
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--text-accent)',
                  opacity: 0.3 + i * 0.15,
                }}
              />
            ))}
          </div>
          <SmallCatSilhouette facing="left" />
        </div>
      </div>
    </section>
  );
}

/** Tiny pixel cat silhouette for decoration */
function SmallCatSilhouette({ facing }: { facing: 'left' | 'right' }) {
  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      shapeRendering="crispEdges"
      style={{ transform: facing === 'left' ? 'scaleX(-1)' : undefined, opacity: 0.3 }}
    >
      {/* Ears */}
      <rect x="4" y="0" width="3" height="3" fill="var(--text-primary)" />
      <rect x="10" y="0" width="3" height="3" fill="var(--text-primary)" />
      {/* Head */}
      <rect x="3" y="3" width="11" height="6" fill="var(--text-primary)" />
      {/* Body */}
      <rect x="5" y="9" width="12" height="5" fill="var(--text-primary)" />
      {/* Tail */}
      <rect x="17" y="7" width="3" height="2" fill="var(--text-primary)" />
      <rect x="20" y="5" width="3" height="2" fill="var(--text-primary)" />
      {/* Legs */}
      <rect x="6" y="14" width="3" height="2" fill="var(--text-primary)" />
      <rect x="13" y="14" width="3" height="2" fill="var(--text-primary)" />
    </svg>
  );
}

/** Subtle paw print decorations along the edges */
function PawPrintDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Top-left paw */}
      <svg
        className="absolute top-12 left-8 md:left-16"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        shapeRendering="crispEdges"
        style={{ opacity: 0.06 }}
      >
        <rect x="8" y="12" width="5" height="5" fill="var(--text-primary)" rx="1" />
        <rect x="4" y="6" width="3" height="3" fill="var(--text-primary)" rx="1" />
        <rect x="9" y="4" width="3" height="3" fill="var(--text-primary)" rx="1" />
        <rect x="14" y="6" width="3" height="3" fill="var(--text-primary)" rx="1" />
      </svg>

      {/* Bottom-right paw */}
      <svg
        className="absolute bottom-16 right-8 md:right-20"
        width="18"
        height="18"
        viewBox="0 0 20 20"
        shapeRendering="crispEdges"
        style={{ opacity: 0.06 }}
      >
        <rect x="8" y="12" width="5" height="5" fill="var(--text-primary)" rx="1" />
        <rect x="4" y="6" width="3" height="3" fill="var(--text-primary)" rx="1" />
        <rect x="9" y="4" width="3" height="3" fill="var(--text-primary)" rx="1" />
        <rect x="14" y="6" width="3" height="3" fill="var(--text-primary)" rx="1" />
      </svg>

      {/* Stars scattered */}
      {[
        { top: '15%', left: '5%', right: undefined, size: 2 },
        { top: '70%', left: undefined, right: '8%', size: 3 },
        { top: '40%', left: '92%', right: undefined, size: 2 },
        { top: '85%', left: '15%', right: undefined, size: 2 },
      ].map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            width: star.size,
            height: star.size,
            background: 'var(--text-accent)',
            opacity: 0.1,
          }}
        />
      ))}
    </div>
  );
}
