"use client";
import type React from 'react';
import type { ScreenConfig, Tip } from '@/types/module';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useModule } from '@/contexts/ModuleContext';
import { cn } from '@/lib/utils';

interface InteractiveTipsScreenProps {
  screenConfig: ScreenConfig;
}

export const InteractiveTipsScreen: React.FC<InteractiveTipsScreenProps> = ({ screenConfig }) => {
  const { playSound } = useModule();

  if (!screenConfig.tips) return <div>No tips available.</div>;

  return (
    <div className="flex flex-col items-center justify-start h-full text-center p-4 w-full">
      <h2 className="text-3xl font-bold font-headline text-primary mt-8 mb-6">
        {screenConfig.title}
      </h2>
      <div className="overflow-y-auto flex-1 w-full max-w-md px-2">
        <Accordion type="single" collapsible className="w-full space-y-3 pb-8">
          {screenConfig.tips.map((tip: Tip) => {
            return (
              <AccordionItem 
                value={tip.id} 
                key={tip.id} 
                className={cn(
                  "border rounded-lg shadow-lg overflow-hidden bg-card" // Added 'border'
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "w-full flex justify-between items-center text-left p-4 hover:no-underline [&[data-state=open]>svg]:text-primary",
                  )}
                  aria-controls={`tip-content-${tip.id}`}
                >
                  <div className="flex items-center">
                    {tip.icon && <tip.icon className="h-6 w-6 mr-3 text-primary" />}
                    <span className="text-lg font-headline text-card-foreground">{tip.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent id={`tip-content-${tip.id}`} className="p-4 pt-0 text-foreground/80 bg-card">
                  <p>{tip.content}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <p className="text-sm mt-auto mb-2 animate-pulse text-primary">
        Tap cards to reveal tips! Swipe up when done.
      </p>
    </div>
  );
};
