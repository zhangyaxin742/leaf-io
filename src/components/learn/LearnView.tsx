import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock, 
  Trophy, 
  Clock,
  ArrowRight,
  Star
} from "lucide-react";
import LearnBite from "./LearnBite";

const LearnView = () => {
  const [selectedBite, setSelectedBite] = useState<string | null>(null);
  const [completedBites, setCompletedBites] = useState<string[]>(() => {
    const saved = localStorage.getItem('leaf-completed-bites');
    return saved ? JSON.parse(saved) : [];
  });

  const learnBites = [
    {
      id: "budgeting-basics",
      title: "Budgeting Basics",
      description: "Master the 50/30/20 rule and envelope method",
      duration: "2 min",
      difficulty: "Beginner",
      unlocked: true,
      badge: "Budget Master",
      topics: ["50/30/20 Rule", "Zero-Based Budgeting", "Envelope Method"],
      content: [
        {
          type: "intro",
          title: "Budgeting Basics",
          content: "Learn the fundamental rules that make budgeting simple and effective."
        },
        {
          type: "concept",
          title: "The 50/30/20 Rule",
          content: "50% for needs (rent, groceries), 30% for wants (entertainment), 20% for savings and debt."
        },
        {
          type: "concept", 
          title: "Zero-Based Budgeting",
          content: "Every dollar gets assigned a purpose. Income minus expenses should equal zero."
        },
        {
          type: "concept",
          title: "Envelope Method",
          content: "Set aside cash for each category. When the envelope is empty, you're done spending."
        }
      ],
      quiz: [
        {
          question: "In the 50/30/20 rule, what percentage goes to needs?",
          options: ["30%", "50%", "20%"],
          correct: 1
        },
        {
          question: "What should your income minus expenses equal in zero-based budgeting?",
          options: ["Zero", "Positive number", "Negative number"],
          correct: 0
        },
        {
          question: "The envelope method helps with what?",
          options: ["Saving money", "Spending control", "Earning interest"],
          correct: 1
        }
      ]
    },
    {
      id: "green-bonds",
      title: "What are Green Bonds?",
      description: "Understanding sustainable fixed-income investments",
      duration: "3 min",
      difficulty: "Beginner",
      unlocked: true,
      badge: "Green Investor",
      topics: ["Green Bonds", "Impact Measurement", "Bond Basics"],
      content: [
        {
          type: "intro",
          title: "Green Bonds Explained",
          content: "Green bonds fund environmental projects while paying you regular interest."
        },
        {
          type: "concept",
          title: "How They Work",
          content: "You lend money to organizations funding renewable energy, clean water, or conservation projects."
        },
        {
          type: "concept",
          title: "Impact Tracking",
          content: "Green bonds report exactly how your money creates environmental benefits."
        },
        {
          type: "concept",
          title: "Risk & Returns",
          content: "Generally lower risk than stocks, with stable returns plus measurable environmental impact."
        }
      ],
      quiz: [
        {
          question: "Green bonds primarily fund what type of projects?",
          options: ["Technology startups", "Environmental projects", "Real estate"],
          correct: 1
        },
        {
          question: "Compared to stocks, green bonds typically have what risk level?",
          options: ["Higher risk", "Lower risk", "Same risk"],
          correct: 1
        },
        {
          question: "What makes green bonds special compared to regular bonds?",
          options: ["Higher returns", "Impact reporting", "Shorter terms"],
          correct: 1
        }
      ]
    },
    {
      id: "blended-finance",
      title: "Blended Finance Explained",
      description: "How public and private funding create impact",
      duration: "3 min",
      difficulty: "Intermediate",
      unlocked: completedBites.includes("green-bonds"),
      badge: "Finance Strategist",
      topics: ["Public-Private Partnership", "Risk Sharing", "Impact Scaling"],
      content: [
        {
          type: "intro",
          title: "Blended Finance",
          content: "Combining public and private money to fund projects that are both profitable and impactful."
        },
        {
          type: "concept",
          title: "How It Works",
          content: "Governments or foundations take on higher risk, making projects safer for private investors."
        },
        {
          type: "concept",
          title: "Risk Sharing",
          content: "Public money absorbs first losses, private money gets stable returns, projects get funded."
        },
        {
          type: "concept",
          title: "Real Impact",
          content: "This structure funds renewable energy in developing countries and infrastructure projects."
        }
      ],
      quiz: [
        {
          question: "Blended finance combines which two types of funding?",
          options: ["Debt and equity", "Public and private", "Stocks and bonds"],
          correct: 1
        },
        {
          question: "Who typically takes on higher risk in blended finance?",
          options: ["Private investors", "Public funders", "Both equally"],
          correct: 1
        },
        {
          question: "Blended finance helps fund projects that are:",
          options: ["Only profitable", "Profitable and impactful", "Only impactful"],
          correct: 1
        }
      ]
    },
    {
      id: "avoid-greenwash",
      title: "Avoiding Greenwashing",
      description: "How to spot real impact vs. marketing",
      duration: "2 min", 
      difficulty: "Intermediate",
      unlocked: completedBites.includes("budgeting-basics"),
      badge: "Truth Seeker",
      topics: ["Impact Verification", "Transparency", "Red Flags"],
      content: [
        {
          type: "intro",
          title: "Spotting Greenwashing",
          content: "Learn to tell the difference between real environmental impact and clever marketing."
        },
        {
          type: "concept",
          title: "Look for Data",
          content: "Real impact investments show specific metrics: tons of CO₂ reduced, watts of clean energy, etc."
        },
        {
          type: "concept",
          title: "Third-Party Verification",
          content: "Trusted organizations like the Climate Bonds Initiative verify legitimate green investments."
        },
        {
          type: "concept",
          title: "Red Flags",
          content: "Vague language, no specific targets, or companies with poor environmental records overall."
        }
      ],
      quiz: [
        {
          question: "Real impact investments should show:",
          options: ["Vague promises", "Specific metrics", "Marketing slogans"],
          correct: 1
        },
        {
          question: "Who can verify legitimate green investments?",
          options: ["The companies themselves", "Third-party organizations", "Social media"],
          correct: 1
        },
        {
          question: "A red flag for greenwashing is:",
          options: ["Specific data", "Vague language", "Third-party verification"],
          correct: 1
        }
      ]
    },
    {
      id: "sim-vs-real",
      title: "Simulation vs. Real Advice",
      description: "Understanding the ethics and safety of financial education",
      duration: "2 min",
      difficulty: "Important",
      unlocked: completedBites.length >= 2,
      badge: "Ethical Investor",
      topics: ["Investment Ethics", "Educational Purpose", "Safety First"],
      content: [
        {
          type: "intro",
          title: "Education vs. Advice",
          content: "Understanding why our simulators are educational tools, not investment recommendations."
        },
        {
          type: "concept",
          title: "Learning Safely",
          content: "Simulators let you explore concepts risk-free before making real financial decisions."
        },
        {
          type: "concept",
          title: "Always Research",
          content: "Real investing requires research, understanding your goals, and often professional guidance."
        },
        {
          type: "concept",
          title: "Start Small",
          content: "When you're ready to invest for real, start with small amounts and regulated platforms."
        }
      ],
      quiz: [
        {
          question: "Our investment simulator is designed for:",
          options: ["Making real trades", "Educational learning", "Professional advice"],
          correct: 1
        },
        {
          question: "Before real investing, you should:",
          options: ["Follow simulator results", "Do your own research", "Copy others"],
          correct: 1
        },
        {
          question: "When starting real investing, it's best to:",
          options: ["Invest everything", "Start small", "Avoid research"],
          correct: 1
        }
      ]
    }
  ];

  useEffect(() => {
    localStorage.setItem('leaf-completed-bites', JSON.stringify(completedBites));
  }, [completedBites]);

  const handleCompleteBite = (biteId: string) => {
    if (!completedBites.includes(biteId)) {
      setCompletedBites(prev => [...prev, biteId]);
    }
    setSelectedBite(null);
  };

  const totalBites = learnBites.length;
  const completed = completedBites.length;
  const progressPercent = (completed / totalBites) * 100;

  if (selectedBite) {
    const bite = learnBites.find(b => b.id === selectedBite);
    if (bite) {
      return (
        <LearnBite 
          bite={bite}
          onComplete={() => handleCompleteBite(selectedBite)}
          onBack={() => setSelectedBite(null)}
          isCompleted={completedBites.includes(selectedBite)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen grid-background pt-20 pb-24 md:pt-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Learn Center
          </h1>
          <p className="text-text-mid max-w-2xl mx-auto">
            Master financial literacy with bite-sized lessons designed for Gen Z
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-foreground">Your Progress</h3>
                <p className="text-sm text-text-mid">
                  {completed} of {totalBites} lessons completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-leaf-mint">{Math.round(progressPercent)}%</div>
                <p className="text-xs text-text-mid">Complete</p>
              </div>
            </div>
            <Progress value={progressPercent} className="h-2" />
            
            {completed > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Trophy className="w-4 h-4 text-warning" />
                <span className="text-sm text-foreground">
                  {completed} badge{completed !== 1 ? 's' : ''} earned
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learnBites.map((bite) => {
            const isCompleted = completedBites.includes(bite.id);
            const isLocked = !bite.unlocked;
            
            return (
              <Card 
                key={bite.id}
                className={`glass-card border-0 hover:scale-102 transition-all duration-200 ${
                  isLocked ? 'opacity-60' : 'cursor-pointer'
                } ${isCompleted ? 'border-l-4 border-l-success' : ''}`}
                onClick={() => !isLocked && setSelectedBite(bite.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-text-mid" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-leaf-mint" />
                        )}
                        <CardTitle className="text-lg font-display">{bite.title}</CardTitle>
                      </div>
                      <p className="text-sm text-text-mid">{bite.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-text-mid">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {bite.duration}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {bite.difficulty}
                    </Badge>
                    {isCompleted && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {bite.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {bite.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant={isCompleted ? "outline" : "hero"}
                      size="sm" 
                      className="w-full"
                      disabled={isLocked}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      ) : isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Learning
                        </>
                      )}
                      {!isLocked && !isCompleted && (
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Encouragement */}
        {completed > 0 && completed < totalBites && (
          <Card className="glass-card border-0 border-l-4 border-l-leaf-mint">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-leaf-mint/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-leaf-mint" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Great progress!</h4>
                  <p className="text-sm text-text-mid">
                    You're on a learning streak. Keep going to unlock all badges!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LearnView;