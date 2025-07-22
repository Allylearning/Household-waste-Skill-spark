
"use client";

import { useModule } from '@/contexts/ModuleContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { Logo } from '@/components/core/Logo';

export const ProgressTracker: React.FC = () => {
  const { currentScreenIndex, totalScreens, isMuted, toggleMute, playSound } = useModule();
  const progressPercentage = totalScreens > 0 ? ((currentScreenIndex + 1) / totalScreens) * 100 : 0;

  const handleMuteToggle = () => {
    toggleMute();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 bg-transparent print:hidden">
      <Logo width={130} className="mr-3" />
      <Progress value={progressPercentage} className="h-2 flex-grow" />
      <Button
        onClick={handleMuteToggle}
        variant="ghost"
        size="icon"
        className="text-foreground rounded-full w-8 h-8 ml-3"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  );
};

