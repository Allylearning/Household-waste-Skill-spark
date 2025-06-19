
"use client";
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useModule } from '@/contexts/ModuleContext';
import type { ScreenConfig, MythOrFactStatement } from '@/types/module';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, ChevronRight, HelpCircle, RefreshCcw } from 'lucide-react'; // Removed Lightbulb, Added RefreshCcw
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface MythOrFactScreenProps {
  screenConfig: ScreenConfig;
}

export const MythOrFactScreen: React.FC<MythOrFactScreenProps> = ({ screenConfig }) => {
  const { playSound, nextScreen } = useModule();
  const { toast } = useToast();
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'myth' | 'fact' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sectionCompleted, setSectionCompleted] = useState(false);
  const isMobile = useIsMobile();

  const statements = screenConfig.mythOrFactStatements || [];
  const currentStatement = statements[currentStatementIndex];

  const handleAnswer = (chosenAnswer: 'myth' | 'fact') => {
    if (showFeedback) return;

    setUserAnswer(chosenAnswer);
    setShowFeedback(true);
    const statementIsFact = currentStatement.isFact;
    const isCorrect = (chosenAnswer === 'fact' && statementIsFact) || (chosenAnswer === 'myth' && !statementIsFact);

    if (isCorrect) {
      playSound('correct');
      toast({ title: "Correct!", description: "You got it right!", className: "bg-green-500 text-white" });
    } else {
      playSound('incorrect');
      toast({ title: "Not Quite!", description: "That's not the right answer.", variant: "destructive" });
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setUserAnswer(null);
    playSound('swoosh');

    if (currentStatementIndex < statements.length - 1) {
      setCurrentStatementIndex(prev => prev + 1);
    } else {
      setSectionCompleted(true);
      toast({ title: "Section Complete!", description: "You've learned about plastic myths and facts!" });
    }
  };

  const handleRetrySection = () => {
    setCurrentStatementIndex(0);
    setUserAnswer(null);
    setShowFeedback(false);
    setSectionCompleted(false);
    playSound('swoosh');
  };

  if (sectionCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        {/* Lightbulb icon removed */}
        <h2 className="text-3xl font-bold font-headline text-primary my-6">Well Done!</h2> {/* Added margin top/bottom */}
        <p className="text-lg text-foreground mb-6">
          You've explored common myths and facts about single-use plastics!
        </p>
        <div className="space-y-3 w-full max-w-xs">
            <Button onClick={nextScreen} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Continue Learning <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={handleRetrySection} variant="outline" size="lg" className="w-full">
                <RefreshCcw className="mr-2 h-5 w-5" /> Retry Section
            </Button>
        </div>
      </div>
    );
  }

  if (!currentStatement) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <p className="text-lg text-muted-foreground">Loading statements...</p>
      </div>
    );
  }

  const statementIsFact = currentStatement.isFact;
  const isCorrect = userAnswer ? (userAnswer === 'fact' && statementIsFact) || (userAnswer === 'myth' && !statementIsFact) : null;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 w-full">
      <h2 className="text-3xl font-bold font-headline text-primary mt-8 mb-2">
        {screenConfig.title}
      </h2>
      <p className="text-md text-foreground mb-6">Statement {currentStatementIndex + 1} of {statements.length}</p>

      <Card className={cn(
        "w-full max-w-md",
        isMobile ? "shadow-xl" : "shadow-none border-none bg-transparent md:p-0"
      )}>
        <CardHeader className={cn(isMobile ? "" : "md:px-0 md:pt-0")}>
          <CardTitle className="text-lg text-left flex items-start">
            <HelpCircle className="h-6 w-6 mr-3 text-primary flex-shrink-0 mt-1" />
            <span>{currentStatement.statementText}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("space-y-3 md:space-y-0 md:flex md:gap-3", isMobile ? "" : "md:px-0")}>
          <Button
            onClick={() => handleAnswer('myth')}
            disabled={showFeedback}
            className={cn(
              "w-full md:flex-1",
              showFeedback && userAnswer === 'myth' && !isCorrect && "bg-red-500 hover:bg-red-600 text-white ring-2 ring-red-700",
              showFeedback && userAnswer === 'myth' && isCorrect && "bg-green-500 hover:bg-green-600 text-white ring-2 ring-green-700",
              showFeedback && userAnswer !== 'myth' && !statementIsFact && "bg-green-200 text-green-800 border-green-500 opacity-70",
              !isMobile && "bg-card hover:bg-muted border-border text-card-foreground"
            )}
          >
            Myth
            {showFeedback && userAnswer === 'myth' && (isCorrect ? <CheckCircle className="ml-2 h-5 w-5" /> : <XCircle className="ml-2 h-5 w-5" />)}
          </Button>
          <Button
            onClick={() => handleAnswer('fact')}
            disabled={showFeedback}
            className={cn(
              "w-full md:flex-1",
              showFeedback && userAnswer === 'fact' && !isCorrect && "bg-red-500 hover:bg-red-600 text-white ring-2 ring-red-700",
              showFeedback && userAnswer === 'fact' && isCorrect && "bg-green-500 hover:bg-green-600 text-white ring-2 ring-green-700",
              showFeedback && userAnswer !== 'fact' && statementIsFact && "bg-green-200 text-green-800 border-green-500 opacity-70",
              !isMobile && "bg-card hover:bg-muted border-border text-card-foreground"
            )}
          >
            Fact
            {showFeedback && userAnswer === 'fact' && (isCorrect ? <CheckCircle className="ml-2 h-5 w-5" /> : <XCircle className="ml-2 h-5 w-5" />)}
          </Button>
        </CardContent>
        {showFeedback && (
          <CardFooter className={cn("flex flex-col items-stretch mt-4", isMobile ? "" : "md:px-0 md:pb-0")}>
            <CardDescription className="text-left p-3 bg-secondary rounded-md mb-3">
              <p className="font-semibold mb-1">
                {isCorrect ? "That's Correct!" : "Not Quite..."}
                {userAnswer === 'fact' ? " This statement is indeed a " : " This statement is actually a "}
                <span className="font-bold">{currentStatement.isFact ? "Fact." : "Myth."}</span>
              </p>
              {currentStatement.explanation}
            </CardDescription>
            <Button onClick={handleNext} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {currentStatementIndex < statements.length - 1 ? 'Next Statement' : 'Finish Section'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        )}
      </Card>
      {!showFeedback && (
        <p className="text-sm mt-auto mb-2 md:mt-6 animate-pulse text-primary">
          Is this a myth or a fact?
        </p>
      )}
    </div>
  );
};
