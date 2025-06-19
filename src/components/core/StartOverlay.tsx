
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/core/Logo';
import { PlayCircle } from 'lucide-react';
import { ensureAudioContextStarted } from '@/hooks/useSound';
import { useModule } from '@/contexts/ModuleContext'; // Import useModule
import { cn } from '@/lib/utils';

interface StartOverlayProps {
  onStart: () => void;
}

export const StartOverlay: React.FC<StartOverlayProps> = ({ onStart }) => {
  const { markAudioAsReady } = useModule(); // Get markAudioAsReady from context

  const handleStartClick = async () => {
    await ensureAudioContextStarted(); // Ensure Tone.js audio context is started
    markAudioAsReady(); // Signal to ModuleContext that interaction has occurred
    onStart(); // Proceed to hide overlay and show module content
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 text-center",
        "bg-cover bg-no-repeat",
        "bg-background/95 backdrop-blur-sm"
      )}
      style={{ backgroundImage: "url('/images/Waste_Micro_2.svg')" }}
      data-ai-hint="community recycling abstract"
    >
      <Logo width={180} className="mb-8" />
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
          Newtown Waste Management
      </h1>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-xl">
        Learn how to manage household waste and recycling in Newtown Borough. Click below to begin your learning journey.
      </p>
      <p className="text-sm text-foreground mb-10 max-w-xl">
        This experience includes audio. Ensure your sound is on.
      </p>
      <Button onClick={handleStartClick} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-lg shadow-xl">
        <PlayCircle className="mr-3 h-6 w-6" />
        Start Module
      </Button>
    </div>
  );
};
