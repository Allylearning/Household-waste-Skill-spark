"use client";
import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useModule } from '@/contexts/ModuleContext';
import type { ScreenConfig, WasteItem, Bin } from '@/types/module';
import { cn } from '@/lib/utils';
import { Dices, CheckCircle, XCircle, RefreshCcw, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';


interface SortingGameScreenProps {
  screenConfig: ScreenConfig;
}

export const SortingGameScreen: React.FC<SortingGameScreenProps> = ({ screenConfig }) => {
  const { addBadge, nextScreen } = useModule();
  const { toast } = useToast();
  const [itemsToDrag, setItemsToDrag] = useState<WasteItem[]>(screenConfig.gameItems || []);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [droppedInBin, setDroppedInBin] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const isMobile = useIsMobile();

  const currentItem = !isGameOver && itemsToDrag.length > 0 ? itemsToDrag[currentItemIndex] : null;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: WasteItem) => {
    e.dataTransfer.setData('itemId', item.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processItemPlacement = (item: WasteItem, bin: Bin) => {
    if (!item) return; 
    
    setDroppedInBin(bin.id);
    const isCorrect = item.type === bin.accepts;

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      const newScore = score + (isCorrect ? 1 : 0);
      if (currentItemIndex < itemsToDrag.length - 1) {
        setCurrentItemIndex(i => i + 1);
      } else {
        // Game finished
        setIsGameOver(true);
        toast({ title: "Game Over!", description: `You scored ${newScore} out of ${itemsToDrag.length}!` });
        if (newScore >= itemsToDrag.length / 2 && screenConfig.badgeToAward) { 
          addBadge(screenConfig.badgeToAward);
        }
      }
      setDroppedInBin(null);
      setFeedback(null);
    }, 1500);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, bin: Bin) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    
    if (currentItem && currentItem.id === itemId) {
      processItemPlacement(currentItem, bin);
    }
  };

  const handleBinTap = (bin: Bin) => {
    if (currentItem && !feedback) { 
      processItemPlacement(currentItem, bin);
    }
  };

  const handleRestartGame = () => {
    setCurrentItemIndex(0);
    setScore(0);
    setDroppedInBin(null);
    setFeedback(null);
    setIsGameOver(false);
  };
  
  if (itemsToDrag.length === 0) {
    return <p>No game items configured.</p>;
  }

  if (isGameOver) {
     return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4">Game Over!</h2>
            <p className="text-lg mb-6">You scored {score} out of {itemsToDrag.length}.</p>
            <div className="space-y-3 w-full max-w-xs">
              <Button onClick={handleRestartGame} variant="outline" size="lg" className="w-full">
                <RefreshCcw className="mr-2 h-5 w-5" /> Restart Game
              </Button>
              <Button onClick={nextScreen} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Continue <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
        </div>
     );
  }
 
  if (!currentItem && !isGameOver) { 
    return <p>Loading game...</p>;
  }


  return (
    <div className="flex flex-col items-center justify-between h-full text-center p-4">
      <h2 className="text-3xl font-bold font-headline text-primary mt-8 mb-2">
        {screenConfig.title}
      </h2>
      <p className="text-md text-foreground mb-4">
        Item {currentItemIndex + 1} of {itemsToDrag.length}. Score: {score} <br/>
        {isMobile ? "Tap the correct bin for the item!" : "Drag the item to the correct bin!"}
      </p>
      
      <Card className={cn(
        "p-4 min-h-[150px] w-full max-w-xs flex flex-col items-center justify-center my-6",
        isMobile ? "border border-white bg-white/70" : "bg-background/70 shadow-xl md:mb-8"
        )}>
        {feedback === 'correct' && (
          <div className="flex flex-col items-center text-green-500">
            <CheckCircle className="h-16 w-16 mb-2" />
            <p className="font-semibold">That's right!</p>
          </div>
        )}
        {feedback === 'incorrect' && (
           <div className="flex flex-col items-center text-red-500">
            <XCircle className="h-16 w-16 mb-2" />
            <p className="font-semibold">Not quite right!</p>
          </div>
        )}
        {!feedback && currentItem && (
          isMobile ? (
            <div 
              className="flex flex-col items-center p-2 rounded-lg"
              aria-label={`Current item: ${currentItem.name}`}
            >
              <currentItem.icon className="h-20 w-20 text-foreground mb-2" />
              <p className="text-lg font-semibold">{currentItem.name}</p>
            </div>
          ) : (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, currentItem)}
              className="flex flex-col items-center cursor-grab p-2 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 active:shadow-inner"
              aria-label={`Drag ${currentItem.name}`}
            >
              <currentItem.icon className="h-20 w-20 text-foreground mb-2" />
              <p className="text-lg font-semibold">{currentItem.name}</p>
            </div>
          )
        )}
         {!feedback && !currentItem && !isGameOver && (
            <p className="text-lg text-muted-foreground">Loading next item...</p>
        )}
      </Card>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mt-auto w-full max-w-md">
        {screenConfig.bins?.map((bin) => (
          isMobile ? (
            <div
              key={bin.id}
              onClick={() => handleBinTap(bin)}
              className={cn(
                "p-3 md:p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-150 cursor-pointer", // Base layout
                {
                  'border-2 border-white bg-white/70': true, // Default mobile appearance
                  'hover:border-primary hover:bg-primary/10 active:bg-primary/20': !feedback, // Mobile interaction if no feedback
                  '!border-green-500 !bg-green-500/20': droppedInBin === bin.id && feedback === 'correct', // Correct drop
                  '!border-red-500 !bg-red-500/20': droppedInBin === bin.id && feedback === 'incorrect', // Incorrect drop
                  'opacity-50 pointer-events-none': feedback, // General feedback state (dim all)
                }
              )}
              aria-label={`Tap to place item in ${bin.name} bin`}
            >
              <bin.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-1" />
              <p className="text-xs md:text-sm font-medium text-foreground">{bin.name}</p>
            </div>
          ) : (
            <div
              key={bin.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, bin)}
              className={cn(
                "p-3 md:p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-150",
                droppedInBin === bin.id && feedback === 'correct' ? 'border-green-500 bg-green-500/20' : '',
                droppedInBin === bin.id && feedback === 'incorrect' ? 'border-red-500 bg-red-500/20' : 'border-muted hover:border-primary hover:bg-primary/10',
                feedback && "opacity-50 pointer-events-none"
              )}
              aria-label={`Drop area for ${bin.name} bin`}
            >
              <bin.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-1" />
              <p className="text-xs md:text-sm font-medium text-foreground">{bin.name}</p>
            </div>
          )
        ))}
      </div>
       <p className="text-sm mt-4 animate-pulse text-primary">
        {!isMobile && currentItem ? "Good luck!" : isMobile && currentItem ? "Tap wisely!" : ""}
        {!currentItem && !isGameOver ? "" : " Swipe up if you need to continue."}
      </p>
    </div>
  );
};
