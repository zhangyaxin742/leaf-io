import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Target, TrendingUp } from "lucide-react";

const MonthlyGoalStrip = () => {
  return (
    <Card className="glass-card border-0 p-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Monthly Goal Ring */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-muted opacity-30"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                stroke="url(#goalGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="60"
                strokeDashoffset="18"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--leaf-green-1))" />
                  <stop offset="100%" stopColor="hsl(var(--leaf-teal-1))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="w-6 h-6 text-leaf-mint" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">73%</h3>
            <p className="text-sm text-text-mid">Save+Impact Goal</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-1 gap-4 justify-around md:justify-end">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-success">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">$427</span>
            </div>
            <p className="text-xs text-text-mid">Available</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-foreground">
              <span className="font-semibold">$1,246</span>
            </div>
            <p className="text-xs text-text-mid">Spent</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-leaf-mint">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">$180</span>
            </div>
            <p className="text-xs text-text-mid">To Impact</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyGoalStrip;