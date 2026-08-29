'use client';

import { useState, useEffect } from 'react';

interface FireflyData { id: number; x: number; y: number; delay: number; duration: number; variant: string; size: number; }
interface LeafData { id: number; startX: number; delay: number; duration: number; }
interface ParticleData { id: number; x: number; y: number; delay: number; duration: number; variant: string; }
interface OrbData { id: number; x: number; y: number; delay: number; duration: number; size: number; }
interface StarData { active: boolean; top: number; left: number; duration: number; }

export default function AmbientEffects() {
  const [fireflies, setFireflies] = useState<FireflyData[]>([]);
  const [leaves, setLeaves] = useState<LeafData[]>([]);
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [orbs, setOrbs] = useState<OrbData[]>([]);
  const [shootingStar, setShootingStar] = useState<StarData>({ active: false, top: 0, left: 0, duration: 2 });

  useEffect(() => {
    // Fireflies
    const fireflyVariants = ['firefly-float', 'firefly-float-2', 'firefly-float-3'];
    setFireflies(
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 40,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 4,
        variant: fireflyVariants[Math.floor(Math.random() * fireflyVariants.length)],
        size: Math.random() * 2 + 2,
      }))
    );
    
    // Leaves
    setLeaves(
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        startX: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 12,
      }))
    );
    
    // Particles
    const particleVariants = ['particle-drift', 'particle-drift-2'];
    setParticles(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 8,
        variant: particleVariants[Math.floor(Math.random() * particleVariants.length)],
      }))
    );

    // Atmospheric Orbs
    setOrbs(
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 20 + 20,
        size: Math.random() * 100 + 50,
      }))
    );

    // Shooting Star
    let starTimeout: NodeJS.Timeout;
    const scheduleShootingStar = () => {
      const nextDelay = (Math.random() * 30 + 30) * 1000;
      starTimeout = setTimeout(() => {
        setShootingStar({
          active: true,
          top: Math.random() * 30,
          left: Math.random() * 50 + 25,
          duration: Math.random() * 1 + 2,
        });
        
        setTimeout(() => {
          setShootingStar(prev => ({ ...prev, active: false }));
          scheduleShootingStar();
        }, 3000);
      }, nextDelay);
    };

    scheduleShootingStar();
    
    return () => clearTimeout(starTimeout);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Background Atmospheric Orbs */}
      {orbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full bg-white opacity-[0.02] blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            animation: `cloud-drift-slow ${orb.duration}s linear infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      {/* Shooting Star */}
      {shootingStar.active && (
        <div
          className="absolute h-[2px] bg-gradient-to-r from-white to-transparent shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] z-0 rounded-full animate-[shooting-star_ease-in-out_forwards]"
          style={{
            left: `${shootingStar.left}%`,
            top: `${shootingStar.top}%`,
            animationDuration: `${shootingStar.duration}s`,
          }}
        />
      )}

      {/* Fireflies */}
      {fireflies.map((ff) => (
        <div
          key={`ff-${ff.id}`}
          className="absolute rounded-full bg-[#b8e040] shadow-[0_0_6px_1px_rgba(184,224,64,0.6)] blur-[0.5px]"
          style={{
            left: `${ff.x}%`,
            top: `${ff.y}%`,
            width: `${ff.size}px`,
            height: `${ff.size}px`,
            animation: `${ff.variant} ${ff.duration}s ease-in-out infinite, firefly-glow ${ff.duration}s ease-in-out infinite`,
            animationDelay: `${ff.delay}s`,
          }}
        />
      ))}

      {/* Leaves */}
      {leaves.map((leaf) => (
        <div
          key={`leaf-${leaf.id}`}
          className="absolute animate-[leaf-fall_linear_infinite]"
          style={{
            left: `${leaf.startX}%`,
            top: '-5%',
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#8b4513" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
            <path d="M17 8C14.5 5 11 4 8 4C8 7 9 10.5 11.5 13C14 15.5 17.5 16.5 20.5 16.5C20.5 13.5 19.5 10 17 8Z" />
          </svg>
        </div>
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={`p-${p.id}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `${p.variant} ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
