
"use client";

import React, { useEffect, useState } from 'react';
import { useModule } from '@/contexts/ModuleContext';

const NUM_CONFETTI = 50;

interface ConfettiPieceData {
  id: number;
  left: string;
  animationDelay: string;
  duration: string;
}

export const Confetti: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [pieces, setPieces] = useState<ConfettiPieceData[]>([]);
  const { playSound } = useModule();

  useEffect(() => {
    if (isActive) {
      playSound('confetti');
      const newPieces = Array.from({ length: NUM_CONFETTI }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 2}s`
      }));
      setPieces(newPieces);

      // Remove confetti after animation to prevent too many elements
      const longestDuration = Math.max(...newPieces.map(p => parseFloat(p.duration) + parseFloat(p.animationDelay))) * 1000;
      const timer = setTimeout(() => setPieces([]), longestDuration + 500);
      return () => clearTimeout(timer);

    } else {
      setPieces([]);
    }
  }, [isActive, playSound]);

  if (!isActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.animationDelay,
            animationDuration: piece.duration,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
