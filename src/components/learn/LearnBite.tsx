import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight,
  Star,
  Trophy,
  CheckCircle,
  X
} from "lucide-react";

interface LearnBiteContent {
  type: string;
  title: string;
  content: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface LearnBiteData {
  id: string;
  title: string;
  badge: string;
  content: LearnBiteContent[];
  quiz: QuizQuestion[];
}

interface LearnBiteProps {
  bite: LearnBiteData;
  onComplete: () => void;
  onBack: () => void;
  isCompleted: boolean;
}

const LearnBite = ({ bite, onComplete, onBack, isCompleted }: LearnBiteProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const totalSlides = bite.content.length;
  const isLastSlide = currentSlide === totalSlides - 1;

  const handleNext = () => {
    if (isLastSlide) {
      setShowQuiz(true);
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = answerIndex;
    setQuizAnswers(newAnswers);

    if (currentQuizIndex < bite.quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === bite.quiz[index].correct ? 1 : 0);
      }, 0);
      setScore(correctAnswers);
      setQuizCompleted(true);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  const currentContent = bite.content[currentSlide];
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="min-h-screen grid-background pt-20 pb-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Button>
          <Badge variant="secondary" className="text-xs">
            {bite.title}
          </Badge>
        </div>

        {!showQuiz ? (
          /* Content Slides */
          <div className="max-w-md mx-auto">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-text-mid mb-2">
                <span>Slide {currentSlide + 1} of {totalSlides}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>

            {/* Content Card */}
            <Card className="glass-card border-0 min-h-[400px] animate-fade-in">
              <CardContent className="p-8 flex flex-col justify-center text-center space-y-6">
                {currentContent.type === "intro" && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-leaf-mint/20 rounded-full flex items-center justify-center">
                      <Star className="w-8 h-8 text-leaf-mint" />
                    </div>
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                      {currentContent.title}
                    </h2>
                    <p className="text-text-mid leading-relaxed">
                      {currentContent.content}
                    </p>
                  </div>
                )}

                {currentContent.type === "concept" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      {currentContent.title}
                    </h3>
                    <div className="p-6 rounded-xl bg-muted/30 border border-border-subtle">
                      <p className="text-foreground leading-relaxed">
                        {currentContent.content}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handlePrev}
                disabled={currentSlide === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button variant="hero" onClick={handleNext}>
                {isLastSlide ? "Take Quiz" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          /* Quiz Section */
          <div className="max-w-md mx-auto">
            {!quizCompleted ? (
              <div className="animate-fade-in">
                {/* Quiz Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-text-mid mb-2">
                    <span>Question {currentQuizIndex + 1} of {bite.quiz.length}</span>
                    <span>Quiz Time!</span>
                  </div>
                  <Progress value={((currentQuizIndex + 1) / bite.quiz.length) * 100} className="h-1" />
                </div>

                {/* Quiz Card */}
                <Card className="glass-card border-0 min-h-[400px]">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                        {bite.quiz[currentQuizIndex].question}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {bite.quiz[currentQuizIndex].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full p-4 h-auto text-left justify-start hover:border-leaf-mint"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-text-mid mr-3 flex-shrink-0" />
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Quiz Results */
              <div className="animate-fade-in">
                <Card className="glass-card border-0">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto bg-leaf-mint/20 rounded-full flex items-center justify-center">
                      {score === bite.quiz.length ? (
                        <Trophy className="w-10 h-10 text-leaf-mint" />
                      ) : score >= bite.quiz.length / 2 ? (
                        <CheckCircle className="w-10 h-10 text-success" />
                      ) : (
                        <X className="w-10 h-10 text-warning" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                        {score === bite.quiz.length ? "Perfect Score!" :
                         score >= bite.quiz.length / 2 ? "Well Done!" : "Keep Learning!"}
                      </h3>
                      <p className="text-text-mid">
                        You scored {score} out of {bite.quiz.length} questions correctly
                      </p>
                    </div>

                    {score >= bite.quiz.length / 2 && (
                      <div className="p-4 rounded-xl bg-leaf-mint/10 border border-leaf-mint/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-leaf-mint" />
                          <span className="font-semibold text-foreground">Badge Earned!</span>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {bite.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Button variant="hero" onClick={handleComplete} className="w-full">
                        {isCompleted ? "Continue Learning" : "Complete Lesson"}
                      </Button>
                      
                      {score < bite.quiz.length / 2 && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowQuiz(false);
                            setQuizCompleted(false);
                            setCurrentQuizIndex(0);
                            setQuizAnswers([]);
                            setCurrentSlide(0);
                          }}
                          className="w-full"
                        >
                          Review Lesson
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnBite;