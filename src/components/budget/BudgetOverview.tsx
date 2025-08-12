import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Edit3, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BudgetCategory {
  id: string;
  name: string;
  budgetTarget: number;
  spent: number;
  trend: "up" | "down" | "stable";
  trendValue: number;
}

const BudgetOverview = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: "income",
      name: "Income",
      budgetTarget: 3500,
      spent: 3247,
      trend: "down",
      trendValue: 7.2,
    },
    {
      id: "needs",
      name: "Needs",
      budgetTarget: 1750,
      spent: 1624,
      trend: "up",
      trendValue: 5.1,
    },
    {
      id: "wants",
      name: "Wants",
      budgetTarget: 1050,
      spent: 943,
      trend: "down",
      trendValue: 2.3,
    },
    {
      id: "save-impact",
      name: "Save+Impact",
      budgetTarget: 700,
      spent: 180,
      trend: "up",
      trendValue: 12.4,
    },
  ]);

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const updateCategoryBudget = (id: string, newTarget: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, budgetTarget: newTarget } : cat
      )
    );
    setEditingCategory(null);
    toast({
      title: "Budget Updated",
      description: `${categories.find(c => c.id === id)?.name} budget updated successfully`,
    });
  };

  const suggestions = [
    {
      title: "Move $50 from Wants to Save+Impact",
      description: "You're under budget on Wants this month",
      impact: "+7% closer to impact goal",
    },
    {
      title: "Increase Needs budget by $100",
      description: "You've been consistently over budget",
      impact: "Better tracking accuracy",
    },
    {
      title: "Set up automatic Save+Impact transfer",
      description: "Save $25 weekly for consistent growth",
      impact: "+$100 monthly impact investing",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">Budget Overview</h2>
          <p className="text-text-mid">Manage your spending categories and targets</p>
        </div>
        
        <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
          <DialogTrigger asChild>
            <Button variant="hero" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Suggest Reallocations
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-leaf-mint" />
                Budget Suggestions
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="glass-card border-0 p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                    <p className="text-sm text-text-mid">{suggestion.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.impact}
                    </Badge>
                  </div>
                </Card>
              ))}
              <Button variant="glass" className="w-full" onClick={() => setShowSuggestions(false)}>
                Apply Suggestions (Mock)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const remaining = category.budgetTarget - category.spent;
          const percentage = (category.spent / category.budgetTarget) * 100;
          const isOverBudget = percentage > 100;

          return (
            <Card key={category.id} className="glass-card border-0 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">{category.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingCategory(category.id)}
                  className="w-8 h-8"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>

              {editingCategory === category.id ? (
                <div className="space-y-3">
                  <Label htmlFor={`budget-${category.id}`} className="text-sm text-text-mid">
                    Monthly Target
                  </Label>
                  <Input
                    id={`budget-${category.id}`}
                    type="number"
                    defaultValue={category.budgetTarget}
                    onBlur={(e) => {
                      const newValue = parseFloat(e.target.value);
                      if (!isNaN(newValue)) {
                        updateCategoryBudget(category.id, newValue);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const newValue = parseFloat(e.currentTarget.value);
                        if (!isNaN(newValue)) {
                          updateCategoryBudget(category.id, newValue);
                        }
                      }
                    }}
                    className="text-lg font-semibold"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-mid">Spent</span>
                      <span className="text-xl font-semibold text-foreground">
                        ${category.spent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-mid">Budget</span>
                      <span className="text-sm text-text-mid">
                        ${category.budgetTarget.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-3 mb-3"
                  />

                  <div className="flex justify-between items-center text-sm">
                    <span className={`font-medium ${remaining < 0 ? 'text-error' : 'text-success'}`}>
                      {remaining < 0 ? 'Over' : 'Remaining'}: ${Math.abs(remaining).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1">
                      {category.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error" />
                      )}
                      <span className={`text-xs ${category.trend === "up" ? 'text-success' : 'text-error'}`}>
                        {category.trendValue}%
                      </span>
                    </div>
                  </div>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverview;