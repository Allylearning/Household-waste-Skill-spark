"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useModule } from '@/contexts/ModuleContext';
import type { ScreenConfig, Badge as BadgeType } from '@/types/module';
import { Share2, RefreshCw, ExternalLink } from 'lucide-react';
import { badges as allBadges } from '@/config/moduleConfig';
import { useToast } from '@/hooks/use-toast';

interface RewardScreenProps {
  screenConfig: ScreenConfig;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({ screenConfig }) => {
  const { earnedBadges, addBadge, resetModule } = useModule();
  const { toast } = useToast();

  useEffect(() => {
    if (screenConfig.badgeToAward) {
      addBadge(screenConfig.badgeToAward);
    }
  }, [screenConfig.badgeToAward, addBadge]);

  const finalBadge = allBadges.find(b => b.id === screenConfig.badgeToAward);
  
  const uniqueDisplayedBadges: BadgeType[] = [];
  const seenBadgeIds = new Set<string>();

  if (finalBadge) {
    uniqueDisplayedBadges.push(finalBadge);
    seenBadgeIds.add(finalBadge.id);
  }
  earnedBadges.forEach(badge => {
    if (!seenBadgeIds.has(badge.id)) {
      uniqueDisplayedBadges.push(badge);
      seenBadgeIds.add(badge.id);
    }
  });


  const handleShare = async () => {
    const shareText = `I just earned the ${finalBadge?.name || 'Waste Expert'} badge with Newtown Sort-It! Learn how to sort waste correctly too! #NewtownSortIt`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Newtown Sort-It Achievement!',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({ title: "Share failed", description: "Could not open share dialog.", variant: "destructive" });
      }
    } else {
        toast({ title: "Share not supported", description: "Your browser doesn't support direct sharing. You can copy this text: " + shareText });
    }
  };

  const handleReplay = () => {
    resetModule(); 
  };

  const handleVisitWebsite = () => {
    window.open('https://www.newtownboro.com/information/trash-recycling/', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {/* Confetti component removed from here */}
      <h2 className="text-4xl font-bold font-headline text-primary mb-2">
        {screenConfig.title}
      </h2>
      <p className="text-lg text-foreground mb-6">{screenConfig.content}</p>

      {uniqueDisplayedBadges.length > 0 && (
        <div className="mb-8 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-3">Your Badges:</h3>
          <div className="flex justify-center items-center gap-4 overflow-x-auto pb-2">
            {uniqueDisplayedBadges.map((badge: BadgeType) => (
              <div key={badge.id} className="flex-shrink-0 flex flex-col items-center p-3 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow w-32 md:w-36">
                <badge.icon className="h-16 w-16 md:h-20 md:h-20 mb-2" />
                <p className="font-semibold text-card-foreground text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground text-center">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 w-full max-w-xs">
        <Button onClick={handleShare} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Share2 className="mr-2 h-5 w-5" /> Share Your Badges!
        </Button>
        <Button onClick={handleReplay} variant="outline" size="lg" className="w-full">
          <RefreshCw className="mr-2 h-5 w-5" /> Replay Module
        </Button>
        <Button onClick={handleVisitWebsite} variant="outline" size="lg" className="w-full">
          <ExternalLink className="mr-2 h-5 w-5" /> Visit Newtown Borough Site
        </Button>
      </div>
    </div>
  );
};
