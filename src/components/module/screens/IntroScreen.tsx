
"use client";
import { Button } from '@/components/ui/button';
import { useModule } from '@/contexts/ModuleContext';
import type { ScreenConfig } from '@/types/module';
import { ArrowDownCircle } from 'lucide-react';
// ensureAudioContextStarted is no longer needed here as StartOverlay handles it.
// import { ensureAudioContextStarted, toneStarted } from '@/hooks/useSound';
// import * as Tone from 'tone'; 

interface IntroScreenProps {
  screenConfig: ScreenConfig;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ screenConfig }) => {
  const { nextScreen, playSound } = useModule();

  const handleStart = () => {
    // Audio context initiation is now handled by the StartOverlay.
    // This button just moves to the next screen.
    nextScreen();
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-4xl font-bold font-headline text-primary mb-2">
        {screenConfig.title}
      </h1>
      <p className="text-lg text-foreground mb-8">
        {screenConfig.content}
      </p>
      <Button onClick={handleStart} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        Start Learning <ArrowDownCircle className="ml-2 h-5 w-5" />
      </Button>
      <p className="text-sm mt-8 animate-pulse text-primary">
        Swipe up or scroll down to continue
      </p>
    </div>
  );
};
