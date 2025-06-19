
"use client";

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Badge, ScreenConfig } from '@/types/module';
import { badges as allBadges, screens as allScreens } from '@/config/moduleConfig';
import { useSound, type SoundName } from '@/hooks/useSound';
import * as Tone from 'tone'; // Import Tone to check context state

interface ModuleContextType {
  screens: ScreenConfig[];
  currentScreenIndex: number;
  setCurrentScreenIndex: (index: number) => void;
  progress: number;
  earnedBadges: Badge[];
  addBadge: (badgeId: string) => void;
  playSound: (soundName: SoundName) => void;
  totalScreens: number;
  isLoading: boolean;
  nextScreen: () => void;
  previousScreen: () => void;
  isFirstScreen: boolean;
  isLastScreen: boolean;
  resetModule: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  markAudioAsReady: () => void; // New function to signal audio readiness
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreenIndex, setCurrentScreenIndexState] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const { playSoundEffect, playVoiceover, stopCurrentVoiceover } = useSound();
  const [isMuted, setIsMuted] = useState(false);
  const [audioReadyForPlayback, setAudioReadyForPlayback] = useState(false); // New state

  const totalScreens = allScreens.length;
  const progress = totalScreens > 0 ? ((currentScreenIndex + 1) / totalScreens) * 100 : 0;

  const markAudioAsReady = useCallback(() => {
    setAudioReadyForPlayback(true);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prevMuted => {
      const newMutedState = !prevMuted;
      if (newMutedState) {
        stopCurrentVoiceover();
      } else {
        // If unmuting, and audio is ready, and current screen has voiceover, play it
        if (audioReadyForPlayback && Tone.context.state === 'running') {
          const currentScreenConfig = allScreens[currentScreenIndex];
          if (currentScreenConfig?.voiceoverUrl) {
            playVoiceover(currentScreenConfig.voiceoverUrl, newMutedState); // Pass newMutedState (which is false)
          }
        }
      }
      return newMutedState;
    });
  }, [stopCurrentVoiceover, playVoiceover, currentScreenIndex, audioReadyForPlayback]);

  const playSound = useCallback((soundName: SoundName) => {
    playSoundEffect(soundName, isMuted);
  }, [playSoundEffect, isMuted]);

  const setCurrentScreenIndex = useCallback((index: number) => {
    if (index >= 0 && index < totalScreens) {
      setCurrentScreenIndexState(index);
    }
  }, [totalScreens]);

  useEffect(() => {
    stopCurrentVoiceover();
    // Ensure audio context has been started by user interaction (audioReadyForPlayback)
    // AND Tone.js is actually running, before attempting to play voiceover.
    if (!audioReadyForPlayback || Tone.context.state !== 'running') {
      return;
    }
    const currentScreenConfig = allScreens[currentScreenIndex];
    if (currentScreenConfig?.voiceoverUrl && !isMuted) {
      playVoiceover(currentScreenConfig.voiceoverUrl, isMuted); // Pass the current isMuted state
    }
  }, [currentScreenIndex, isMuted, audioReadyForPlayback, playVoiceover, stopCurrentVoiceover]);


  const nextScreen = useCallback(() => {
    setCurrentScreenIndex(Math.min(currentScreenIndex + 1, totalScreens - 1));
  }, [currentScreenIndex, totalScreens, setCurrentScreenIndex]);

  const previousScreen = useCallback(() => {
    setCurrentScreenIndex(Math.max(currentScreenIndex - 1, 0));
  }, [currentScreenIndex, setCurrentScreenIndex]);

  const addBadge = useCallback((badgeId: string) => {
    const badgeToAdd = allBadges.find(b => b.id === badgeId);
    if (badgeToAdd && !earnedBadges.some(b => b.id === badgeId)) {
      setEarnedBadges(prev => [...prev, badgeToAdd]);
      playSound('sparkle');
    }
  }, [earnedBadges, playSound]);

  const resetModule = useCallback(() => {
    stopCurrentVoiceover();
    setCurrentScreenIndexState(0);
    setEarnedBadges([]);
    // audioReadyForPlayback remains true, as user interaction has already occurred
    playSound('swoosh');
  }, [playSound, stopCurrentVoiceover]);


  return (
    <ModuleContext.Provider value={{
      screens: allScreens,
      currentScreenIndex,
      setCurrentScreenIndex,
      progress,
      earnedBadges,
      addBadge,
      playSound,
      totalScreens,
      isLoading: false,
      nextScreen,
      previousScreen,
      isFirstScreen: currentScreenIndex === 0,
      isLastScreen: currentScreenIndex === totalScreens - 1,
      resetModule,
      isMuted,
      toggleMute,
      markAudioAsReady, // Expose the new function
    }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = (): ModuleContextType => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
};
