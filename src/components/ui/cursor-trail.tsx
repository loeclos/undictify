'use client';

import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export function CursorTrail() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<CursorPosition[]>([]);
  const maxTrailLength = 8;

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      setTrail(prev => {
        const newTrail = [newPosition, ...prev.slice(0, maxTrailLength - 1)];
        return newTrail;
      });
    };

    document.addEventListener('mousemove', updateCursorPosition);
    return () => document.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <div 
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
      {trail.map((pos, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - (i / maxTrailLength),
            transition: 'opacity 0.5s ease-out'
          }}
        >
          <div 
            className="bg-white rounded-full"
            style={{
              width: `${Math.max(4, 8 - i)}px`,
              height: `${Math.max(4, 8 - i)}px`,
            }}
          />
        </div>
      ))}
    </>
  );
}