import { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Wallet, ShoppingBag, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingData } from "./OnboardingFlow";

interface BudgetSkeletonScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const BudgetSkeletonScreen = ({ data, updateData, onNext }: BudgetSkeletonScreenProps) => {
  const [tempIncome, setTempIncome] = useState(data.monthlyIncome?.toString() || "");

  const handleIncomeChange = (value: string) => {
    setTempIncome(value);
    const numValue = parseFloat(value) || 0;
    updateData({ monthlyIncome: numValue });
  };

  const updateBudgetSplit = (category: keyof typeof data.budgetSplit, value: number) => {
    const newSplit = { ...data.budgetSplit };
    const oldValue = newSplit[category];
    const difference = value - oldValue;
    
    // Adjust other categories proportionally
    const otherCategories = Object.keys(newSplit).filter(k => k !== category) as Array<keyof typeof newSplit>;
    const totalOthers = otherCategories.reduce((sum, cat) => sum + newSplit[cat], 0);
    
    if (totalOthers > 0) {
      otherCategories.forEach(cat => {
        const proportion = newSplit[cat] / totalOthers;
        newSplit[cat] = Math.max(0, newSplit[cat] - (difference * proportion));
      });
    }
    
    newSplit[category] = value;
    
    // Ensure total is 100%
    const total = Object.values(newSplit).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const factor = 100 / total;
      Object.keys(newSplit).forEach(key => {
        newSplit[key as keyof typeof newSplit] *= factor;
      });
    }
    
    updateData({ budgetSplit: newSplit });
  };

  const budgetCategories = [
    {
      key: "needs" as const,
      label: "Needs",
      description: "Rent, groceries, utilities, transportation",
      icon: Wallet,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      key: "wants" as const,
      label: "Wants", 
      description: "Entertainment, dining out, hobbies",
      icon: ShoppingBag,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      key: "saveImpact" as const,
      label: "Save + Impact",
      description: "Emergency fund, investments, impact funds",
      icon: TrendingUp,
      color: "text-leaf-mint",
      bgColor: "bg-leaf-mint/10",
    },
  ];

  const isValid = data.monthlyIncome > 0;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-4">
            Budget Foundation
          </h1>
          <p className="text-text-mid max-w-2xl mx-auto">
            Let's set up your budget framework. We'll start with the 50/30/20 rule 
            and you can adjust the splits to match your goals.
          </p>
        </div>

        <div className="space-y-8">
          {/* Monthly Income */}
          <Card className="glass-card border-0 p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-leaf-mint" />
              Monthly Income
            </h2>
            
            <div className="max-w-md">
              <Label htmlFor="income" className="text-foreground font-medium mb-2 block">
                After-tax monthly income
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-mid">$</span>
                <Input
                  id="income"
                  type="number"
                  placeholder="3000"
                  value={tempIncome}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  className="bg-muted/30 border-border pl-8 text-lg"
                />
              </div>
              <div className="text-sm text-text-mid mt-2">
                Include salary, freelance work, side hustles, etc.
              </div>
            </div>
          </Card>

          {/* Budget Split */}
          {data.monthlyIncome > 0 && (
            <Card className="glass-card border-0 p-6">
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                Budget Allocation
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {budgetCategories.map((category) => {
                  const Icon = category.icon;
                  const percentage = Math.round(data.budgetSplit[category.key]);
                  const amount = Math.round((data.monthlyIncome * percentage) / 100);
                  
                  return (
                    <div key={category.key} className="space-y-4">
                      <div className={cn("p-4 rounded-xl", category.bgColor)}>
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={cn("w-5 h-5", category.color)} />
                          <span className="font-display font-semibold text-foreground">
                            {category.label}
                          </span>
                        </div>
                        <div className="text-sm text-text-mid mb-3">
                          {category.description}
                        </div>
                        
                        {/* Percentage Display */}
                        <div className="text-center mb-4">
                          <div className="text-2xl font-display font-bold text-foreground">
                            {percentage}%
                          </div>
                          <div className="text-sm text-text-mid">
                            ${amount.toLocaleString()}/month
                          </div>
                        </div>
                        
                        {/* Slider */}
                        <div className="space-y-2">
                          <Slider
                            value={[data.budgetSplit[category.key]]}
                            onValueChange={([value]) => updateBudgetSplit(category.key, value)}
                            max={80}
                            min={10}
                            step={5}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-text-mid">
                            <span>10%</span>
                            <span>80%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Total Verification */}
              <div className="mt-6 p-4 rounded-xl bg-muted/20 text-center">
                <div className="text-sm text-text-mid mb-1">Total Allocation</div>
                <div className={cn(
                  "text-lg font-display font-semibold",
                  Math.round(Object.values(data.budgetSplit).reduce((sum, val) => sum + val, 0)) === 100
                    ? "text-success" 
                    : "text-warning"
                )}>
                  {Math.round(Object.values(data.budgetSplit).reduce((sum, val) => sum + val, 0))}%
                </div>
              </div>
            </Card>
          )}

          {/* Quick Tips */}
          <Card className="glass-card border-0 p-6 bg-muted/10">
            <h3 className="font-display font-semibold text-foreground mb-4">Budget Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-mid">
              <div>• Start with 50/30/20 as a foundation</div>
              <div>• Prioritize building an emergency fund first</div>
              <div>• Adjust percentages based on your life stage</div>
              <div>• Review and update your budget monthly</div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="hero"
            size="lg"
            onClick={onNext}
            disabled={!isValid}
            className="min-w-[200px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};