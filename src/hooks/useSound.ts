
"use client";

import { useEffect, useRef, useCallback } from 'react';
import type { Player } from 'tone';
import * as Tone from 'tone';

const soundFiles = {
  pop: '/sounds/pop.mp3',
  swoosh: '/sounds/swoosh.mp3',
  sparkle: '/sounds/sparkle.mp3',
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  confetti: '/sounds/confetti.mp3',
} as const;

export type SoundName = keyof typeof soundFiles;

// Removed toneStarted and setToneSuccessfullyStarted global flags

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


function getSoundEffectPlayers(): Map<SoundName, Player> {
  if (typeof window === 'undefined') {
    return new Map();
  }
  // This function might be called multiple times if useSound is used in multiple components,
  // but globalPlayers ensures players are initialized only once.
  let globalPlayersCache = (window as any)._globalAppSoundPlayers as Map<SoundName, Player> | undefined;
  if (!globalPlayersCache) {
    globalPlayersCache = new Map();
    (Object.keys(soundFiles) as SoundName[]).forEach(name => {
      try {
        const player = new Tone.Player(soundFiles[name]).toDestination();
        globalPlayersCache!.set(name, player);
        // Pre-load sounds. Errors are caught individually.
        player.load().catch(e => console.error(`Failed to pre-load sound ${name}:`, e));
      } catch (error) {
        console.error(`Failed to initialize player for sound ${name}:`, error);
      }
    });
    (window as any)._globalAppSoundPlayers = globalPlayersCache;
  }
  return globalPlayersCache;
}

export function useSound() {
  const soundEffectPlayersRef = useRef<Map<SoundName, Player>>(getSoundEffectPlayers());
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

  const playSoundEffect = useCallback(async (name: SoundName, isGlobalMuted: boolean) => {
    if (true) return; // Sound effects remain disabled as per previous state

    // Original logic below, guarded by Tone.context.state
    // if (isGlobalMuted || typeof window === 'undefined') return;
    // if (Tone.context.state !== 'running') {
    //   console.warn(`Sound effect (${name}): AudioContext not running. State: ${Tone.context.state}`);
    //   return;
    // }
    // const player = soundEffectPlayersRef.current.get(name);
    // if (player) {
    //   try {
    //     if (player.loaded) {
    //       player.start();
    //     } else {
    //       // Ensure the path is correct if pre-loading failed or wasn't attempted for some reason
    //       await player.load(soundFiles[name]);
    //       player.start();
    //     }
    //   } catch (e) {
    //      console.error(`Could not load/play sound effect ${name}`, e);
    //   }
    // } else {
    //   console.error(`Sound effect player for ${name} not found.`);
    // }
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

  return { playSoundEffect, playVoiceover, stopCurrentVoiceover };
}
