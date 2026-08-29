'use client'

import { useEffect, useRef, useState } from 'react';
import { Cat } from './Cat';
import { useCatBehavior, CatBehaviorState } from './useCatBehavior';
import { useCursorInteraction } from './useCursorInteraction';
import { useMousePosition } from '@/hooks/useMousePosition';
import { pickRandom, randomInt } from '@/lib/random';

const cat1Colors = {
  fur: '#c07830', furDark: '#a06020', furLight: '#d49040',
  eyes: '#5cb85c', nose: '#e08080', belly: '#e0b060', innerEar: '#d4a0a0',
  stripe: '#8a5018'
};

const cat2Colors = {
  fur: '#484858', furDark: '#303038', furLight: '#585868',
  eyes: '#daa520', nose: '#a07070', belly: '#606070', innerEar: '#907878',
  bandana: '#cc3333', bandanaDark: '#991a1a'
};

export function CatCanvas() {
  const mousePosition = useMousePosition();
  const cat1Ref = useRef<SVGSVGElement>(null);
  const cat2Ref = useRef<SVGSVGElement>(null);

  const interaction1 = useCursorInteraction(cat1Ref, mousePosition);
  const interaction2 = useCursorInteraction(cat2Ref, mousePosition);

  const [override1, setOverride1] = useState<CatBehaviorState | null>(null);
  const [override2, setOverride2] = useState<CatBehaviorState | null>(null);

  const behavior1 = useCatBehavior({
    personality: 'calm',
    isOtherCatDirection: 'right',
    cursorNear: interaction1.isNear,
    cursorAngle: interaction1.angle,
    overrideState: override1
  });

  const behavior2 = useCatBehavior({
    personality: 'playful',
    isOtherCatDirection: 'left',
    cursorNear: interaction2.isNear,
    cursorAngle: interaction2.angle,
    overrideState: override2
  });

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let mainTimeout: NodeJS.Timeout;

    const scheduleInteraction = () => {
      mainTimeout = setTimeout(() => {
        const type = pickRandom(['LOOK_AT_EACH_OTHER', 'TAIL_REACT', 'ONE_LOOKS_AWAY']);

        if (type === 'LOOK_AT_EACH_OTHER') {
          setOverride1('looking-at-other');
          timeout1 = setTimeout(() => {
            setOverride2('looking-at-other');
            timeout2 = setTimeout(() => {
              setOverride1(null);
              setOverride2(null);
            }, 3000);
          }, 1000);
        } else if (type === 'TAIL_REACT') {
          setOverride2('scratching');
          timeout1 = setTimeout(() => {
            setOverride1('looking-at-other');
            timeout2 = setTimeout(() => {
              setOverride1(null);
              setOverride2(null);
            }, 1500);
          }, 500);
        } else if (type === 'ONE_LOOKS_AWAY') {
          setOverride1('shifting');
          timeout1 = setTimeout(() => {
            setOverride2('looking-at-other');
            timeout2 = setTimeout(() => {
              setOverride1(null);
              setOverride2(null);
            }, 2000);
          }, 1000);
        }
        scheduleInteraction();
      }, randomInt(30000, 90000));
    };

    scheduleInteraction();

    return () => {
      clearTimeout(mainTimeout);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const catSizeClass = "w-20 h-[73px] sm:w-24 sm:h-[88px] md:w-28 md:h-[103px] lg:w-32 lg:h-[117px]";

  return (
    <div className="absolute bottom-[6%] left-0 w-full h-40 pointer-events-none">
      <div className="relative w-full max-w-4xl h-full mx-auto">
        {/* Cat 1 */}
        <div className="absolute bottom-0 left-[25%]">
          <Cat
            id="cat1"
            ref={cat1Ref}
            personality="calm"
            colors={cat1Colors}
            flipX={false}
            behaviorState={behavior1}
            className={catSizeClass}
          />
        </div>
        
        {/* Cat 2 */}
        <div className="absolute bottom-0 left-[55%]">
          <Cat
            id="cat2"
            ref={cat2Ref}
            personality="playful"
            colors={cat2Colors}
            flipX={true}
            behaviorState={behavior2}
            accessories="bandana"
            className={catSizeClass}
          />
        </div>
      </div>
    </div>
  );
}
