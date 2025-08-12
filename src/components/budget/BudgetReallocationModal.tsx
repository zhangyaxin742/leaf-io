import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppData } from "@/hooks/useAppData";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Lightbulb,
  Target,
  AlertCircle
} from "lucide-react";

const BudgetReallocationModal = () => {
  const { currentBudget, updateBudget } = useAppData();
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!currentBudget) return null;

  const suggestions = [
    {
      id: 1,
      title: "Boost Your Impact Allocation",
      description: "Move $15 from Wants to Save+Impact to reach your 25% goal faster",
      changes: {
        wants: -15,
        saveImpact: 15,
        needs: 0
      },
      reason: "You're doing great with needs but could increase impact investing",
      impact: "This could fund an additional 0.3 solar panels through simulation"
    },
    {
      id: 2,
      title: "Optimize Spending Balance",
      description: "Move $8 from Wants to Needs for better essential coverage",
      changes: {
        wants: -8,
        saveImpact: 0,
        needs: 8
      },
      reason: "Your needs spending is slightly under target",
      impact: "Ensures you have adequate coverage for essential expenses"
    },
    {
      id: 3,
      title: "Conservative Rebalance",
      description: "Move $5 from Wants to Save+Impact for steady growth",
      changes: {
        wants: -5,
        saveImpact: 5,
        needs: 0
      },
      reason: "Small step toward your impact investing goals",
      impact: "Adds $5 monthly to your simulated portfolio growth"
    }
  ];

  const handleApplySuggestion = (suggestion: typeof suggestions[0]) => {
    const newTargets = {
      needs: currentBudget.targets.needs + suggestion.changes.needs,
      wants: currentBudget.targets.wants + suggestion.changes.wants,
      saveImpact: currentBudget.targets.saveImpact + suggestion.changes.saveImpact
    };

    updateBudget(currentBudget.month, { targets: newTargets });
    setIsOpen(false);
    setSelectedSuggestion(null);
  };

  const getProgressColor = (spent: number, target: number) => {
    const percentage = (spent / target) * 100;
    if (percentage > 100) return "bg-destructive";
    if (percentage > 80) return "bg-warning";
    return "bg-success";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Lightbulb className="w-4 h-4 mr-2" />
          Suggest Reallocations
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-leaf-mint" />
            Budget Reallocation Suggestions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Budget Overview */}
          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-lg">Current Budget Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Needs</span>
                    <span className="text-sm text-muted-foreground">
                      ${currentBudget.spent.needs}/${currentBudget.targets.needs}
                    </span>
                  </div>
                  <Progress 
                    value={(currentBudget.spent.needs / currentBudget.targets.needs) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Wants</span>
                    <span className="text-sm text-muted-foreground">
                      ${currentBudget.spent.wants}/${currentBudget.targets.wants}
                    </span>
                  </div>
                  <Progress 
                    value={(currentBudget.spent.wants / currentBudget.targets.wants) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Save+Impact</span>
                    <span className="text-sm text-muted-foreground">
                      ${currentBudget.spent.saveImpact}/${currentBudget.targets.saveImpact}
                    </span>
                  </div>
                  <Progress 
                    value={(currentBudget.spent.saveImpact / currentBudget.targets.saveImpact) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recommended Adjustments</h3>
            
            {suggestions.map((suggestion) => (
              <Card 
                key={suggestion.id} 
                variant={selectedSuggestion === suggestion.id ? "highlight" : "default"}
                className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedSuggestion(suggestion.id)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        <p className="text-xs text-muted-foreground italic">{suggestion.reason}</p>
                      </div>
                      
                      <Badge variant="outline" className="ml-4">
                        {Object.values(suggestion.changes).some(v => v > 0) ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        Optimize
                      </Badge>
                    </div>

                    {/* Visual Change Preview */}
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(suggestion.changes).map(([category, change]) => {
                        const categoryNames = {
                          needs: 'Needs',
                          wants: 'Wants', 
                          saveImpact: 'Save+Impact'
                        };
                        
                        if (change === 0) return null;
                        
                        return (
                          <div key={category} className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">
                              {categoryNames[category as keyof typeof categoryNames]}:
                            </span>
                            <span className={change > 0 ? "text-success" : "text-warning"}>
                              {change > 0 ? '+' : ''}${change}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Impact Description */}
                    <div className="p-3 rounded-lg bg-leaf-mint/10 border border-leaf-mint/20">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-leaf-mint mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{suggestion.impact}</p>
                      </div>
                    </div>

                    {selectedSuggestion === suggestion.id && (
                      <div className="flex gap-3 pt-2 animate-fade-in">
                        <Button 
                          variant="default" 
                          onClick={() => handleApplySuggestion(suggestion)}
                          className="flex-1"
                        >
                          Apply This Change
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedSuggestion(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/30">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              These are suggestions only. You can always adjust your budget manually or return to previous settings.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetReallocationModal;