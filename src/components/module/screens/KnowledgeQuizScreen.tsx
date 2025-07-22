"use client";
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useModule } from '@/contexts/ModuleContext';
import type { ScreenConfig, QuizQuestion } from '@/types/module';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, ChevronRight, RefreshCcw } from 'lucide-react';
import { Confetti } from '@/components/module/Confetti';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface KnowledgeQuizScreenProps {
  screenConfig: ScreenConfig;
}

export const KnowledgeQuizScreen: React.FC<KnowledgeQuizScreenProps> = ({ screenConfig }) => {
  const { playSound, addBadge, nextScreen } = useModule();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const isMobile = useIsMobile();

  const questions = screenConfig.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (feedback) return; 
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) {
      toast({ title: "Oops!", description: "Please select an answer.", variant: "destructive" });
      return;
    }

    const selectedOption = currentQuestion.options.find(opt => opt.id === selectedOptionId);
    if (selectedOption?.isCorrect) {
      setFeedback('correct');
      setShowExplanation(true);
      toast({ title: "Correct!", description: currentQuestion.feedbackCorrect, className: "bg-green-500 text-white" });
    } else {
      setFeedback('incorrect');
      toast({ title: "Not Quite!", description: currentQuestion.feedbackIncorrect, variant: "destructive" });
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedOptionId(null);
    setShowExplanation(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      setShowConfetti(true); 
      toast({ title: "Quiz Finished!", description: "Great job completing the quiz!" });
      if (screenConfig.badgeToAward) {
        addBadge(screenConfig.badgeToAward);
      }
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setFeedback(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setShowConfetti(false);
  };

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <Confetti isActive={showConfetti} />
        <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold font-headline text-primary mb-4">Quiz Complete!</h2>
        <p className="text-lg text-foreground mb-6">You've aced the knowledge quiz!</p>
        <div className="space-y-3 w-full max-w-xs">
            <Button onClick={nextScreen} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                See Your Reward <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={handleRetryQuiz} variant="outline" size="lg" className="w-full">
                <RefreshCcw className="mr-2 h-5 w-5" /> Retry Quiz
            </Button>
        </div>
      </div>
    );
  }
  
  if (!currentQuestion) return <p>Loading quiz...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 w-full">
      <h2 className="text-3xl font-bold font-headline text-primary mt-8 mb-2">
        {screenConfig.title}
      </h2>
      <p className="text-md text-foreground mb-6">Question {currentQuestionIndex + 1} of {questions.length}</p>

      <Card className={cn(
        "w-full max-w-md",
        isMobile ? "shadow-xl" : "shadow-none border-none bg-transparent md:p-0"
      )}>
        <CardHeader className={cn(isMobile ? "" : "md:px-0 md:pt-0")}>
          <CardTitle className="text-lg text-left">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent className={cn("space-y-3", isMobile ? "" : "md:px-0")}>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.isCorrect;
            let buttonVariant: "outline" | "default" | "secondary" | "destructive" = "outline";
            let icon = null;

            if (feedback && isSelected) {
              buttonVariant = isCorrect ? "default" : "destructive";
              icon = isCorrect ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />;
            } else if (feedback && isCorrect) {
                 buttonVariant = "default"; 
                 icon = <CheckCircle className="h-5 w-5 text-green-500" />;
            }


            return (
              <Button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                variant={buttonVariant}
                className={cn(
                  "w-full justify-start text-left h-auto py-3 px-4 whitespace-normal",
                  "bg-background border border-border text-foreground hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
                  isSelected && !feedback && "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] ring-2 ring-primary",
                  feedback && isSelected && isCorrect && "bg-green-500 hover:bg-green-600 text-white",
                  feedback && isSelected && !isCorrect && "bg-red-500 hover:bg-red-600 text-white",
                  feedback && !isSelected && isCorrect && (isMobile ? "bg-green-200 text-green-800 border-green-500" : "bg-green-500/30 border-green-500 text-green-800")
                )}
                disabled={!!feedback}
              >
                <span className="flex-1">{option.text}</span>
                {icon}
              </Button>
            );
          })}
        </CardContent>
        <CardFooter className={cn("flex flex-col items-stretch", isMobile ? "" : "md:px-0 md:pb-0")}>
          {!feedback && (
            <Button onClick={handleSubmitAnswer} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Submit Answer</Button>
          )}
          {feedback && (
            <Button onClick={handleNextQuestion} className="w-full">
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
          {showExplanation && currentQuestion.explanation && (
            <p className="mt-4 text-sm text-muted-foreground p-3 bg-secondary rounded-md">{currentQuestion.explanation}</p>
          )}
        </CardFooter>
      </Card>
      <p className="text-sm mt-auto mb-2 md:mt-6 animate-pulse text-primary">
        Choose wisely! Swipe up when done.
      </p>
    </div>
  );
};
