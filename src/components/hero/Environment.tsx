'use client';

export default function Environment() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none z-10">
      {/* Trees — background layer */}
      <svg className="absolute bottom-[22%] left-[8%] w-16 h-28 md:w-20 md:h-32" viewBox="0 0 50 100" shapeRendering="crispEdges">
        <rect x="21" y="60" width="8" height="40" fill="#1a1410" />
        <polygon points="25,5 2,58 48,58" fill="#0e2214" />
        <polygon points="25,18 8,58 42,58" fill="#132e1a" />
      </svg>

      <svg className="absolute bottom-[22%] right-[12%] w-20 h-36 md:w-24 md:h-40" viewBox="0 0 50 100" shapeRendering="crispEdges">
        <rect x="21" y="68" width="8" height="32" fill="#1a1410" />
        <polygon points="25,8 0,66 50,66" fill="#0e2214" />
        <polygon points="25,22 8,66 42,66" fill="#132e1a" />
      </svg>

      <svg className="absolute bottom-[24%] left-[45%] w-12 h-24 md:w-16 md:h-28 hidden md:block" viewBox="0 0 50 100" shapeRendering="crispEdges">
        <rect x="21" y="65" width="8" height="35" fill="#161210" />
        <polygon points="25,12 5,63 45,63" fill="#0c1e12" />
        <polygon points="25,25 10,63 40,63" fill="#112814" />
      </svg>

      {/* House 1 — left */}
      <svg className="absolute bottom-[12%] left-[2%] w-36 h-36 md:w-44 md:h-44" viewBox="0 0 100 100" shapeRendering="crispEdges">
        <rect x="10" y="45" width="80" height="55" fill="var(--house-1)" />
        <polygon points="50,8 5,45 95,45" fill="var(--house-roof-1)" />
        {/* Chimney */}
        <rect x="70" y="15" width="10" height="30" fill="#2a1a14" />
        {/* Windows */}
        <rect x="22" y="55" width="12" height="14" fill="var(--window-glow)" opacity="0.7" style={{ animation: 'window-glow 4s ease-in-out infinite' }} />
        <rect x="22" y="61" width="12" height="1" fill="var(--house-1)" opacity="0.5" />
        <rect x="28" y="55" width="1" height="14" fill="var(--house-1)" opacity="0.5" />
        <rect x="60" y="55" width="12" height="14" fill="var(--window-dim)" opacity="0.4" />
        {/* Door */}
        <rect x="42" y="70" width="14" height="30" fill="#1a1010" />
      </svg>

      {/* House 2 — center-left */}
      <svg className="absolute bottom-[12%] left-[22%] w-32 h-40 md:w-40 md:h-48 hidden md:block" viewBox="0 0 100 110" shapeRendering="crispEdges">
        <rect x="15" y="40" width="70" height="70" fill="var(--house-2)" />
        <polygon points="50,5 10,40 90,40" fill="var(--house-roof-2)" />
        {/* Window */}
        <rect x="35" y="52" width="14" height="16" fill="var(--window-glow)" opacity="0.6" style={{ animation: 'window-glow 5s ease-in-out infinite 1.5s' }} />
        <rect x="42" y="52" width="1" height="16" fill="var(--house-2)" opacity="0.4" />
        <rect x="35" y="60" width="14" height="1" fill="var(--house-2)" opacity="0.4" />
        <rect x="58" y="52" width="14" height="16" fill="#0a0e1a" opacity="0.8" />
      </svg>

      {/* House 3 — right */}
      <svg className="absolute bottom-[12%] right-[5%] w-36 h-36 md:w-44 md:h-44" viewBox="0 0 100 100" shapeRendering="crispEdges">
        <rect x="10" y="50" width="80" height="50" fill="var(--house-3)" />
        <rect x="10" y="40" width="80" height="10" fill="var(--house-roof-3)" />
        {/* Flat roof with small ridge */}
        <rect x="5" y="38" width="90" height="4" fill="#2a2010" />
        {/* Windows */}
        <rect x="25" y="58" width="10" height="12" fill="var(--window-glow)" opacity="0.5" style={{ animation: 'window-glow 6s ease-in-out infinite 3s' }} />
        <rect x="60" y="58" width="10" height="12" fill="var(--window-glow)" opacity="0.8" style={{ animation: 'window-glow 4.5s ease-in-out infinite 0.5s' }} />
        <rect x="65" y="58" width="1" height="12" fill="var(--house-3)" opacity="0.4" />
      </svg>

      {/* House 4 — far right, smaller */}
      <svg className="absolute bottom-[14%] right-[30%] w-24 h-28 md:w-32 md:h-36 hidden lg:block" viewBox="0 0 80 90" shapeRendering="crispEdges">
        <rect x="10" y="40" width="60" height="50" fill="#1e1a28" />
        <polygon points="40,10 5,40 75,40" fill="#141020" />
        <rect x="28" y="50" width="10" height="12" fill="var(--window-dim)" opacity="0.3" />
      </svg>

      {/* Street Lamp */}
      <div className="absolute bottom-[8%] left-[38%] md:left-[42%] flex flex-col items-center">
        <svg width="16" height="120" viewBox="0 0 16 120" shapeRendering="crispEdges">
          {/* Pole */}
          <rect x="6" y="20" width="4" height="100" fill="var(--lamp-post)" />
          {/* Lamp head */}
          <rect x="2" y="12" width="12" height="8" fill="#555560" />
          <rect x="4" y="10" width="8" height="4" fill="#666670" />
          {/* Lamp bulb area */}
          <rect x="4" y="16" width="8" height="4" fill="var(--lamp-glow)" style={{ animation: 'lamp-flicker 8s ease-in-out infinite' }} />
        </svg>
        {/* Glow effect */}
        <div
          className="absolute top-[10px] w-20 h-20 rounded-full blur-xl"
          style={{
            background: 'var(--lamp-glow-soft)',
            animation: 'lamp-flicker 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[14px] w-6 h-6 rounded-full blur-sm"
          style={{
            background: 'rgba(255, 204, 68, 0.4)',
            animation: 'lamp-flicker 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Bushes */}
      <div className="absolute bottom-[8%] left-[18%] w-20 h-8 md:w-24 md:h-10 bg-[#0c1a11] rounded-t-full" style={{ animation: 'grass-sway 6s ease-in-out infinite' }} />
      <div className="absolute bottom-[8%] right-[18%] w-16 h-6 md:w-20 md:h-8 bg-[#0e1c13] rounded-t-full" style={{ animation: 'grass-sway 7s ease-in-out infinite 2s' }} />
      <div className="absolute bottom-[8%] left-[55%] w-14 h-6 bg-[#0a160e] rounded-t-full hidden md:block" style={{ animation: 'grass-sway-alt 5s ease-in-out infinite 1s' }} />

      {/* Ground — grass strip */}
      <div
        className="absolute bottom-[5%] w-full h-[4%]"
        style={{ background: 'linear-gradient(to bottom, var(--grass-dark), var(--grass-mid))' }}
      />

      {/* Road surface */}
      <div className="absolute bottom-0 w-full h-[5%]" style={{ background: 'var(--road-dark)' }}>
        {/* Road center line dashes */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-center gap-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-6 h-[2px] hidden md:block" style={{ background: 'var(--road-line)', opacity: 0.3 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
