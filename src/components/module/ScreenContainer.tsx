
"use client";

import type React from 'react';
import { useEffect, useRef } from 'react';
import { useModule } from '@/contexts/ModuleContext';
import { cn } from '@/lib/utils';

interface ScreenContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentScreenIndex, setCurrentScreenIndex, totalScreens } = useModule();
  const isProgrammaticScroll = useRef(false); // Flag to prevent observer conflicts
  const currentScreenIndexRef = useRef(currentScreenIndex);

  // Keep the ref updated with the latest currentScreenIndex
  useEffect(() => {
    currentScreenIndexRef.current = currentScreenIndex;
  }, [currentScreenIndex]);

  // Effect for IntersectionObserver to update screen index on manual scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return; // Ignore observer if scroll was programmatic

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const screenId = entry.target.id;
            const screenIndex = parseInt(screenId.split('-')[1], 10);
            // Use the ref for the most up-to-date currentScreenIndex
            if (!isNaN(screenIndex) && screenIndex !== currentScreenIndexRef.current) { 
              setCurrentScreenIndex(screenIndex);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.5, // Consider adjusting if issues persist (e.g., 0.4 or 0.6)
      }
    );

    const screens = container.querySelectorAll('[id^="screen-"]');
    screens.forEach((screen) => observer.observe(screen));

    return () => {
      screens.forEach((screen) => observer.unobserve(screen));
    };
  }, [setCurrentScreenIndex, totalScreens]); // currentScreenIndex is not needed here due to the ref

  // Effect for programmatically scrolling to the current screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targetScreenId = `screen-${currentScreenIndex}`;
    const targetScreenElement = container.querySelector(`#${targetScreenId}`) as HTMLElement;

    if (targetScreenElement) {
      isProgrammaticScroll.current = true; // Set flag before scrolling
      targetScreenElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      const timer = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [currentScreenIndex]);


  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full w-full overflow-y-scroll snap-y snap-mandatory overscroll-y-contain",
        className
      )}
    >
      {children}
    </div>
  );
};

