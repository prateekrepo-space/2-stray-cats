'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { randomInt, pickRandom } from '@/lib/random';

export type CatBehaviorState = 
  | 'idle' 
  | 'looking-left' 
  | 'looking-right' 
  | 'looking-at-other' 
  | 'looking-at-cursor' 
  | 'stretching' 
  | 'yawning' 
  | 'scratching' 
  | 'shifting';

export type EarState = 'idle' | 'twitch' | 'perk';
export type TailAnimation = 'idle' | 'sway-gentle' | 'sway-playful' | 'flick';
export type BodyAnimation = 'idle' | 'breathe' | 'stretch' | 'shift';

export interface UseCatBehaviorProps {
  personality: 'calm' | 'playful';
  isOtherCatDirection: 'left' | 'right';
  cursorNear: boolean;
  cursorAngle: number;
  overrideState?: CatBehaviorState | null;
}

export function useCatBehavior({
  personality,
  isOtherCatDirection,
  cursorNear,
  cursorAngle,
  overrideState = null
}: UseCatBehaviorProps) {
  const [state, setState] = useState<CatBehaviorState>('idle');
  const [headRotation, setHeadRotation] = useState(0);
  const [earLeftState, setEarLeftState] = useState<EarState>('idle');
  const [earRightState, setEarRightState] = useState<EarState>('idle');
  const [isBlinking, setIsBlinking] = useState(false);
  
  const lastStateChangeRef = useRef(Date.now());
  const headRotationRef = useRef(0);

  // Behavior loop
  useEffect(() => {
    if (overrideState) {
      setState(overrideState);
      return;
    }

    if (cursorNear) {
      setState('looking-at-cursor');
      return;
    }

    let timeoutId: NodeJS.Timeout;
    
    const scheduleNextState = () => {
      const now = Date.now();
      const timeSinceLastChange = now - lastStateChangeRef.current;
      
      const isCalm = personality === 'calm';
      const delay = Math.max(
        2000 - timeSinceLastChange, 
        randomInt(isCalm ? 5000 : 3000, isCalm ? 10000 : 6000)
      );
      
      timeoutId = setTimeout(() => {
        let choices: string[];
        if (isCalm) {
          choices = ['idle', 'idle', 'idle', 'looking-left', 'looking-right'];
        } else {
          choices = ['idle', 'idle', 'looking-left', 'looking-right', 'looking-left', 'looking-right'];
        }
        const randomState = pickRandom(choices);
        setState(randomState as CatBehaviorState);
        lastStateChangeRef.current = Date.now();
        scheduleNextState();
      }, delay);
    };

    scheduleNextState();

    return () => clearTimeout(timeoutId);
  }, [personality, cursorNear, overrideState]);

  // Special states
  useEffect(() => {
    if (overrideState || cursorNear) return;

    let mainTimeoutId: NodeJS.Timeout;
    let innerTimeoutId: NodeJS.Timeout;
    
    const scheduleSpecialState = () => {
      const isCalm = personality === 'calm';
      const delay = randomInt(isCalm ? 60000 : 40000, isCalm ? 150000 : 100000);
      
      mainTimeoutId = setTimeout(() => {
        const special = pickRandom(['stretching', 'yawning', 'scratching', 'shifting']);
        setState(special as CatBehaviorState);
        lastStateChangeRef.current = Date.now();
        
        innerTimeoutId = setTimeout(() => {
          setState('idle');
          lastStateChangeRef.current = Date.now();
          scheduleSpecialState();
        }, randomInt(2000, 4000));
        
      }, delay);
    };

    scheduleSpecialState();
    return () => {
      clearTimeout(mainTimeoutId);
      clearTimeout(innerTimeoutId);
    };
  }, [personality, overrideState, cursorNear]);

  // Blinking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let doubleBlinkTimeoutId: NodeJS.Timeout;
    let endBlinkTimeoutId1: NodeJS.Timeout;
    let endBlinkTimeoutId2: NodeJS.Timeout;

    const scheduleBlink = () => {
      const isCalm = personality === 'calm';
      const delay = randomInt(isCalm ? 3000 : 2000, isCalm ? 7000 : 5000);
      
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        endBlinkTimeoutId1 = setTimeout(() => setIsBlinking(false), 120);
        
        // 30% chance for double blink
        if (Math.random() < 0.3) {
          doubleBlinkTimeoutId = setTimeout(() => {
            setIsBlinking(true);
            endBlinkTimeoutId2 = setTimeout(() => setIsBlinking(false), 120);
          }, 320); // 120ms for first blink + 200ms wait
        }
        
        scheduleBlink();
      }, delay);
    };
    
    scheduleBlink();
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(doubleBlinkTimeoutId);
      clearTimeout(endBlinkTimeoutId1);
      clearTimeout(endBlinkTimeoutId2);
    };
  }, [personality]);
  
  // Ear Twitches
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let earEndTimeout1: NodeJS.Timeout;
    
    const scheduleEarTwitch = () => {
      const delay = randomInt(5000, 12000);
      timeoutId = setTimeout(() => {
        if (cursorNear) {
          // Perk when cursor is near
          if (Math.random() > 0.5) setEarLeftState('perk');
          if (Math.random() > 0.5) setEarRightState('perk');
        } else {
          // Random twitch
          const choice = Math.random();
          if (choice < 0.4) {
            setEarLeftState('twitch');
          } else if (choice < 0.8) {
            setEarRightState('twitch');
          } else {
            setEarLeftState('twitch');
            setEarRightState('twitch');
          }
        }
        
        earEndTimeout1 = setTimeout(() => {
          setEarLeftState('idle');
          setEarRightState('idle');
        }, 500);
        
        scheduleEarTwitch();
      }, delay);
    };
    
    scheduleEarTwitch();
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(earEndTimeout1);
    };
  }, [cursorNear]);

  // Update head rotation smoothly
  useEffect(() => {
    let targetRotation = 0;
    
    if (state === 'looking-left') {
      targetRotation = -randomInt(8, 14);
    } else if (state === 'looking-right') {
      targetRotation = randomInt(8, 14);
    } else if (state === 'looking-at-other') {
      targetRotation = isOtherCatDirection === 'left' ? -15 : 15;
    } else if (state === 'looking-at-cursor') {
      const normalized = ((cursorAngle + 180) % 360 - 180);
      targetRotation = Math.max(-15, Math.min(15, normalized * 0.08));
    }
    
    let animationFrameId: number;
    
    const lerpRotation = () => {
      headRotationRef.current += (targetRotation - headRotationRef.current) * 0.1;
      
      // Stop animating if close enough
      if (Math.abs(targetRotation - headRotationRef.current) < 0.1) {
        headRotationRef.current = targetRotation;
        setHeadRotation(headRotationRef.current);
      } else {
        setHeadRotation(headRotationRef.current);
        animationFrameId = requestAnimationFrame(lerpRotation);
      }
    };
    
    animationFrameId = requestAnimationFrame(lerpRotation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [state, isOtherCatDirection, cursorAngle]);

  const tailAnimation: TailAnimation = state === 'scratching' || state === 'stretching' ? 'flick' 
    : personality === 'calm' ? 'sway-gentle' : 'sway-playful';
    
  const bodyAnimation: BodyAnimation = state === 'stretching' ? 'stretch' 
    : state === 'shifting' ? 'shift' : 'breathe';

  return {
    state,
    headRotation,
    earLeftState,
    earRightState,
    isBlinking,
    tailAnimation,
    bodyAnimation
  };
}
