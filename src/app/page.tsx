
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { ModuleProvider, useModule } from '@/contexts/ModuleContext';
import { ScreenContainer } from '@/components/module/ScreenContainer';
import { Screen } from '@/components/module/Screen';
import { ProgressTracker } from '@/components/module/ProgressTracker';
import { StartOverlay } from '@/components/core/StartOverlay'; // New import

import { IntroScreen } from '@/components/module/screens/IntroScreen';
import { CoreMessageScreen } from '@/components/module/screens/CoreMessageScreen';
import { InteractiveTipsScreen } from '@/components/module/screens/InteractiveTipsScreen';
import { SortingGameScreen } from '@/components/module/screens/SortingGameScreen';
import { KnowledgeQuizScreen } from '@/components/module/screens/KnowledgeQuizScreen';
import { RewardScreen } from '@/components/module/screens/RewardScreen';
import { MythOrFactScreen } from '@/components/module/screens/MythOrFactScreen';
import type { ScreenConfig } from '@/types/module';
// ensureAudioContextStarted is now called by StartOverlay's button
// import { ensureAudioContextStarted } from '@/hooks/useSound';
// import * as Tone from 'tone'; // Tone is used indirectly via ensureAudioContextStarted

const screenComponentMap: Record<ScreenConfig['type'], React.FC<{ screenConfig: ScreenConfig }>> = {
  intro: IntroScreen,
  coreMessage: CoreMessageScreen,
  interactiveTips: InteractiveTipsScreen,
  sortingGame: SortingGameScreen,
  knowledgeQuiz: KnowledgeQuizScreen,
  reward: RewardScreen,
  mythOrFact: MythOrFactScreen,
};

const ModuleContentInternal: React.FC = () => {
  const { screens } = useModule(); 

  return (
    <>
      <ScreenContainer>
        {screens.map((screenConfig, index) => {
          const ScreenComponent = screenComponentMap[screenConfig.type];
          const isVideoOnlyCoreMessage = screenConfig.type === 'coreMessage' && screenConfig.videoUrl && !screenConfig.title && !screenConfig.content;
          return (
            <Screen
              key={screenConfig.id}
              id={`screen-${index}`}
              backgroundImageUrl={screenConfig.backgroundImageUrl}
              backgroundAiHint={screenConfig.backgroundAiHint}
              isContentFullBleed={isVideoOnlyCoreMessage}
            >
              {ScreenComponent ? <ScreenComponent screenConfig={screenConfig} /> : <div>Unsupported screen type: {screenConfig.type}</div>}
            </Screen>
          );
        })}
      </ScreenContainer>
      <ProgressTracker />
    </>
  );
};

export default function Home() {
  const [appHeight, setAppHeight] = useState('100vh'); 
  const [moduleStarted, setModuleStarted] = useState(false); // New state for overlay

  useEffect(() => {
    const updateHeight = () => {
      setAppHeight(window.innerHeight + 'px');
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Removed useEffect for global interaction listeners for audio context start
  // This is now handled by StartOverlay's button click.

  const handleStartModule = () => {
    // ensureAudioContextStarted() is called within StartOverlay's button click handler
    setModuleStarted(true);
  };

  return (
    <ModuleProvider>
      <main 
        className="relative w-screen overflow-hidden" 
        style={{ height: appHeight }}
      >
        {!moduleStarted ? (
          <StartOverlay onStart={handleStartModule} />
        ) : (
          <ModuleContentInternal />
        )}
      </main>
    </ModuleProvider>
  );
}
