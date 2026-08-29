'use client'

import { forwardRef } from 'react';
import { CatBehaviorState, EarState, TailAnimation, BodyAnimation } from './useCatBehavior';

export interface CatColors {
  fur: string;
  furDark: string;
  furLight: string;
  eyes: string;
  nose: string;
  belly: string;
  innerEar: string;
  stripe?: string;
  bandana?: string;
  bandanaDark?: string;
}

export interface CatProps {
  id: string;
  personality: 'calm' | 'playful';
  colors: CatColors;
  position?: { x: number, y: number }; // Kept for compatibility but ignored for placement
  className?: string;
  flipX: boolean;
  behaviorState: {
    state: CatBehaviorState;
    headRotation: number;
    earLeftState: EarState;
    earRightState: EarState;
    isBlinking: boolean;
    tailAnimation: TailAnimation;
    bodyAnimation: BodyAnimation;
  };
  accessories?: 'bandana';
}

export const Cat = forwardRef<SVGSVGElement, CatProps>(
  ({ id, colors, flipX, behaviorState, accessories, className, personality }, ref) => {
    const { headRotation, isBlinking, tailAnimation, bodyAnimation, state } = behaviorState;

    const tailAnimStyle = tailAnimation === 'sway-gentle' ? 'tail-sway-gentle 4s infinite' 
      : tailAnimation === 'sway-playful' ? 'tail-sway-playful 2s infinite'
      : tailAnimation === 'flick' ? 'tail-flick 1s' : 'none';

    const baseBreathe = personality === 'calm' ? 'idle-breathe 4s ease-in-out infinite' : 'idle-breathe 3s ease-in-out infinite';
    const bodyAnimStyle = bodyAnimation === 'stretch' ? 'cat-stretch 2s'
      : bodyAnimation === 'shift' ? 'shift-settle 1.5s' 
      : baseBreathe;

    return (
      <svg
        ref={ref}
        viewBox="0 0 120 110"
        shapeRendering="crispEdges"
        className={`pointer-events-auto transition-transform duration-500 ${className || ''}`}
        style={{
          transform: `scaleX(${flipX ? -1 : 1})`,
        }}
      >
        {/* Shadow */}
        <rect x="25" y="103" width="70" height="4" fill="#000" opacity="0.15" />

        {/* Tail Group */}
        <g 
          style={{ 
            animation: tailAnimStyle,
            transformOrigin: '35px 85px'
          }}
        >
          <rect x="25" y="75" width="15" height="10" fill={colors.furDark} />
          <rect x="15" y="65" width="10" height="20" fill={colors.fur} />
          <rect x="10" y="50" width="10" height="15" fill={colors.furDark} />
          <rect x="5" y="45" width="15" height="10" fill={colors.fur} />
          <rect x="5" y="40" width="10" height="5" fill={colors.furLight} />
        </g>

        {/* Body Group (Breathing) */}
        <g style={{ animation: bodyAnimStyle, transformOrigin: '60px 105px' }}>
          {/* Back leg hint */}
          <rect x="75" y="80" width="12" height="15" fill={colors.furDark} />
          <rect x="75" y="95" width="14" height="6" fill={colors.fur} />

          {/* Torso */}
          <rect x="30" y="50" width="55" height="40" fill={colors.fur} />
          <rect x="30" y="50" width="55" height="10" fill={colors.furDark} />
          <rect x="35" y="75" width="45" height="15" fill={colors.belly} />
          
          {/* Stripes (Body) */}
          {colors.stripe && (
            <g fill={colors.stripe}>
              <rect x="40" y="55" width="5" height="15" />
              <rect x="55" y="55" width="5" height="12" />
              <rect x="70" y="55" width="5" height="18" />
            </g>
          )}

          {/* Front Legs */}
          <rect x="35" y="85" width="14" height="16" fill={colors.fur} />
          <rect x="55" y="85" width="14" height="16" fill={colors.fur} />
          
          {/* Paws */}
          <rect x="33" y="101" width="16" height="5" fill={colors.furLight} />
          <rect x="53" y="101" width="16" height="5" fill={colors.furLight} />
          
          {/* Neck connection */}
          <rect x="50" y="45" width="20" height="10" fill={colors.fur} />

          {/* Accessory: Bandana */}
          {accessories === 'bandana' && colors.bandana && (
            <g>
              <rect x="44" y="46" width="32" height="7" fill={colors.bandana} />
              <rect x="68" y="53" width="8" height="6" fill={colors.bandanaDark} />
              <rect x="70" y="59" width="4" height="6" fill={colors.bandanaDark} />
            </g>
          )}
        </g>

        {/* Head Group (Rotation) */}
        <g 
          style={{ 
            transform: `rotate(${headRotation}deg)`, 
            transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
            transformOrigin: '60px 40px' 
          }}
        >
          {/* Left Ear */}
          <g className={behaviorState.earLeftState === 'twitch' ? 'animate-[ear-twitch_0.5s]' : ''} style={{ transformOrigin: '48px 25px' }}>
            <rect x="42" y="12" width="14" height="6" fill={colors.fur} />
            <rect x="44" y="6" width="10" height="6" fill={colors.fur} />
            <rect x="46" y="0" width="6" height="6" fill={colors.furDark} />
            <rect x="46" y="10" width="6" height="8" fill={colors.innerEar} />
          </g>

          {/* Right Ear */}
          <g className={behaviorState.earRightState === 'twitch' ? 'animate-[ear-twitch_0.5s]' : ''} style={{ transformOrigin: '72px 25px' }}>
            <rect x="64" y="12" width="14" height="6" fill={colors.fur} />
            <rect x="66" y="6" width="10" height="6" fill={colors.fur} />
            <rect x="68" y="0" width="6" height="6" fill={colors.furDark} />
            <rect x="68" y="10" width="6" height="8" fill={colors.innerEar} />
          </g>

          {/* Main Head Shape */}
          <rect x="38" y="18" width="44" height="34" fill={colors.fur} />
          <rect x="44" y="38" width="32" height="14" fill={colors.belly} />

          {/* Stripes (Head) */}
          {colors.stripe && (
            <g fill={colors.stripe}>
              <rect x="52" y="18" width="4" height="8" />
              <rect x="64" y="18" width="4" height="8" />
              <rect x="58" y="18" width="4" height="10" />
            </g>
          )}

          {/* Eyes Group (Blinking) */}
          <g 
            style={{ 
              transform: `scaleY(${isBlinking ? 0.05 : 1})`, 
              transition: 'transform 0.08s ease', 
              transformOrigin: '60px 28px' 
            }}
          >
            {/* Left Eye */}
            <rect x="46" y="26" width="8" height="10" fill="#fff" />
            <rect x="48" y="28" width="4" height="6" fill={colors.eyes} />
            <rect x={49 + (headRotation / 20)} y="29" width="2" height="4" fill="#111" />
            
            {/* Right Eye */}
            <rect x="66" y="26" width="8" height="10" fill="#fff" />
            <rect x="68" y="28" width="4" height="6" fill={colors.eyes} />
            <rect x={69 + (headRotation / 20)} y="29" width="2" height="4" fill="#111" />
          </g>

          {/* Nose */}
          <rect x="58" y="38" width="4" height="3" fill={colors.nose} />

          {/* Mouth */}
          {state === 'yawning' ? (
            <rect x="56" y="43" width="8" height="6" fill="#222" />
          ) : (
            <g fill="#444">
              <rect x="59" y="42" width="2" height="3" />
              <rect x="56" y="44" width="3" height="1" />
              <rect x="61" y="44" width="3" height="1" />
            </g>
          )}

          {/* Whiskers */}
          <g fill={colors.furLight}>
            <rect x="24" y="34" width="12" height="1" />
            <rect x="22" y="39" width="14" height="1" />
            <rect x="84" y="34" width="12" height="1" />
            <rect x="84" y="39" width="14" height="1" />
          </g>
        </g>
      </svg>
    );
  }
);
Cat.displayName = 'Cat';
