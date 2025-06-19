
"use client";
import { cn } from "@/lib/utils";
import type React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  backgroundImageUrl?: string;
  backgroundAiHint?: string;
  isContentFullBleed?: boolean; // New prop
}

export const Screen: React.FC<ScreenProps> = ({ children, className, id, backgroundImageUrl, backgroundAiHint, isContentFullBleed = false }) => {
  const isMobile = useIsMobile();
  const styleProps: React.CSSProperties = {};
  if (backgroundImageUrl) {
    styleProps.backgroundImage = `url(${backgroundImageUrl})`;
  }

  const isFullBleedDesktop = isContentFullBleed && !isMobile;

  return (
    <div
      id={id}
      className={cn(
        "h-full w-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden p-6 md:p-8 flex flex-col items-center justify-center relative",
        backgroundImageUrl ? "bg-cover bg-bottom bg-no-repeat" : "bg-background",
        className
      )}
      style={styleProps}
      data-ai-hint={backgroundImageUrl ? backgroundAiHint : undefined}
    >
      <div className={cn(
        "w-full flex flex-col items-center justify-center relative z-10",
        isFullBleedDesktop 
          ? "h-full" // For full-bleed content on desktop, take full height, no card styles
          : "max-w-md text-center", // Default: constrained width and centered text
        !isMobile && !isFullBleedDesktop && "bg-card p-6 rounded-lg shadow-xl" // Default card style for non-full-bleed desktop
        // Mobile view implicitly doesn't use these card styles from here; background handled by outer div.
        )}
      >
         {children}
      </div>
    </div>
  );
};

