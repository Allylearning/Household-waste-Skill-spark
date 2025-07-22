"use client";

import { useEffect, useRef, useCallback } from 'react';
import type { Player } from 'tone';
import * as Tone from 'tone';

// Removed empty soundFiles object and SoundName type alias
// Removed getSoundEffectPlayers function

export async function ensureAudioContextStarted(): Promise<void> {
  if (typeof window === 'undefined') return;

  if (Tone.context.state !== 'running') {
    try {
      await Tone.start();
      // console.log("AudioContext started successfully via ensureAudioContextStarted.");
    } catch (e) {
      console.error("Error starting AudioContext via ensureAudioContextStarted:", e);
      // Depending on requirements, you might want to throw e or return a boolean
    }
  }
  // If already running, do nothing.
}


export function useSound() {
  const voiceoverPlayerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !voiceoverPlayerRef.current) {
      try {
        voiceoverPlayerRef.current = new Tone.Player().toDestination();
        voiceoverPlayerRef.current.onstop = () => {
          // console.log("Voiceover stopped or finished.");
        };
      } catch (error) {
        console.error("Failed to initialize voiceover player:", error);
      }
    }
  }, []);

  const playVoiceover = useCallback(async (url: string | undefined, isGlobalMuted: boolean) => {
    if (typeof url !== 'string' || !url.trim()) {
      // console.warn("playVoiceover called with invalid or empty URL:", url);
      return;
    }

    if (isGlobalMuted || !voiceoverPlayerRef.current || typeof window === 'undefined') {
      return;
    }
    if (Tone.context.state !== 'running') {
      console.warn(`Voiceover (${url}): AudioContext not running. State: ${Tone.context.state}`);
      return;
    }

    const player = voiceoverPlayerRef.current;
    if (player.state === 'started') {
      player.stop();
    }
    try {
      await player.load(url);
      player.start();
    } catch (error) {
      console.error(`Error loading/playing voiceover for ${url}:`, error);
    }
  }, []);

  const stopCurrentVoiceover = useCallback(() => {
    if (voiceoverPlayerRef.current?.state === 'started') {
      voiceoverPlayerRef.current.stop();
    }
  }, []);

  return { playVoiceover, stopCurrentVoiceover };
}
