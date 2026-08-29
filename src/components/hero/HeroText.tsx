'use client';

export default function HeroText() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-start pt-[12vh] md:pt-[16vh] px-4">
      <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wider">
        2 STRAY CATS
      </h1>
      
      <p className="mt-4 text-sm sm:text-base md:text-xl text-white/90 font-light text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-lg">
        Two strays. One little corner of the internet.
      </p>
    </div>
  );
}
