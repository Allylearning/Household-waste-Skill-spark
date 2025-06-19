
"use client";
import { useModule } from '@/contexts/ModuleContext';
import type { ScreenConfig } from '@/types/module';
import { cn } from '@/lib/utils';

interface CoreMessageScreenProps {
  screenConfig: ScreenConfig;
}

export const CoreMessageScreen: React.FC<CoreMessageScreenProps> = ({ screenConfig }) => {
  const { playSound } = useModule(); 
  const isVideoOnly = !!screenConfig.videoUrl && !screenConfig.title && !screenConfig.content;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center h-full",
      isVideoOnly ? "w-full" : "text-center p-4 max-w-md" // If video only, take w-full, else regular constraints
    )}>
      {screenConfig.title && (
        <h2 className="text-3xl font-bold font-headline text-primary mb-4">
           {screenConfig.title}
        </h2>
      )}
      
      {screenConfig.videoUrl && (
        <div className={cn(
          "aspect-video my-4 rounded-lg overflow-hidden shadow-xl bg-muted",
          isVideoOnly 
            ? "w-full md:max-w-3xl lg:max-w-4xl" // Wider if videoOnly and parent allows (via isContentFullBleed)
            : "w-full max-w-md" // Default width if other content is present
        )}>
          <iframe
            className="w-full h-full"
            src={screenConfig.videoUrl}
            title={screenConfig.title || "Instructional Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {screenConfig.content && (
        <p className="text-lg text-foreground max-w-md">
          {screenConfig.content}
        </p>
      )}
       <p className="text-sm mt-8 animate-pulse text-primary">
        Swipe up
      </p>
    </div>
  );
};
