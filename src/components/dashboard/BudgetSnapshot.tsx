import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/custom-button";

const BudgetSnapshot = () => {
  const [timeframe, setTimeframe] = useState<"today" | "week" | "month">("month");

  const budgetData = {
    today: [
      { name: "Needs", spent: 42, budget: 50, percentage: 84, color: "success" },
      { name: "Wants", spent: 28, budget: 30, percentage: 93, color: "warning" },
      { name: "Save+Impact", spent: 15, budget: 20, percentage: 75, color: "leaf-mint" },
    ],
    week: [
      { name: "Needs", spent: 168, budget: 200, percentage: 84, color: "success" },
      { name: "Wants", spent: 112, budget: 120, percentage: 93, color: "warning" },
      { name: "Save+Impact", spent: 60, budget: 80, percentage: 75, color: "leaf-mint" },
    ],
    month: [
      { name: "Needs", spent: 750, budget: 900, percentage: 83, color: "success" },
      { name: "Wants", spent: 420, budget: 450, percentage: 93, color: "warning" },
      { name: "Save+Impact", spent: 240, budget: 320, percentage: 75, color: "leaf-mint" },
    ],
  };

  const currentData = budgetData[timeframe];

  return (
    <Card className="glass-card border-0 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">Budget Snapshot</h3>
        
        <div className="flex bg-muted/30 rounded-full p-1">
          {(["today", "week", "month"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-xs rounded-full transition-all capitalize ${
                timeframe === period
                  ? "bg-leaf-mint text-background font-medium"
                  : "text-text-mid hover:text-foreground"
              }`}
            >
              {period === "today" ? "Today" : `This ${period}`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {currentData.map((category, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-foreground">{category.name}</span>
              <div className="text-right">
                <span className="text-foreground font-semibold">${category.spent}</span>
                <span className="text-text-mid">/${category.budget}</span>
              </div>
            </div>
            <Progress 
              value={category.percentage} 
              className="h-3"
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-text-mid">{category.percentage}% used</span>
              <span className="text-xs text-text-mid">
                ${category.budget - category.spent} left
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="glass" className="w-full mt-6">
        View Full Budget
      </Button>
    </Card>
  );
};

export default BudgetSnapshot;