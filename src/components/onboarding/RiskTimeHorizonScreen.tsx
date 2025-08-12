import { Button } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import { Shield, TrendingUp, Target, Zap, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingData } from "./OnboardingFlow";

interface RiskTimeHorizonScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const riskLevels = [
  {
    id: "cautious",
    label: "Cautious",
    icon: Shield,
    description: "Steady growth with minimal risk",
    color: "text-blue-400",
  },
  {
    id: "tentative",
    label: "Tentative",
    icon: Target,
    description: "Balanced approach to growth",
    color: "text-green-400",
  },
  {
    id: "confident",
    label: "Confident",
    icon: TrendingUp,
    description: "Moderate risk for better returns",
    color: "text-yellow-400",
  },
  {
    id: "ambitious",
    label: "Ambitious",
    icon: Zap,
    description: "Higher risk, higher reward potential",
    color: "text-orange-400",
  },
  {
    id: "adventurous",
    label: "Adventurous",
    icon: Rocket,
    description: "Maximum growth opportunities",
    color: "text-red-400",
  },
];

const timeHorizons = [
  {
    id: "short",
    label: "Short-term",
    duration: "1-3 years",
    description: "Quick access to funds",
  },
  {
    id: "medium",
    label: "Medium-term",
    duration: "3-7 years",
    description: "Balanced growth timeline",
  },
  {
    id: "long",
    label: "Long-term",
    duration: "7+ years",
    description: "Maximum compound growth",
  },
];

export const RiskTimeHorizonScreen = ({ data, updateData, onNext }: RiskTimeHorizonScreenProps) => {
  const isValid = data.riskLevel && data.timeHorizon;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-4">
            Investment Approach
          </h1>
          <p className="text-text-mid max-w-2xl mx-auto">
            Let's understand your comfort level with investment risk and timeline. 
            This helps us suggest the right mix of investments for you.
          </p>
        </div>

        <div className="space-y-8">
          {/* Risk Level */}
          <Card className="glass-card border-0 p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">
              How would you describe your investment style?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {riskLevels.map((level) => {
                const Icon = level.icon;
                const isSelected = data.riskLevel === level.id;
                
                return (
                  <button
                    key={level.id}
                    onClick={() => updateData({ riskLevel: level.id })}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 text-center group hover:scale-105",
                      isSelected
                        ? "border-leaf-mint bg-leaf-mint/10 leaf-gradient-hover"
                        : "border-border bg-muted/20 hover:border-leaf-mint/50"
                    )}
                  >
                    <Icon className={cn("w-8 h-8 mx-auto mb-3", level.color)} />
                    <div className={cn(
                      "font-medium mb-2 transition-colors",
                      isSelected ? "text-foreground" : "text-text-mid group-hover:text-foreground"
                    )}>
                      {level.label}
                    </div>
                    <div className="text-sm text-text-mid">
                      {level.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Time Horizon */}
          <Card className="glass-card border-0 p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">
              When do you plan to access your investments?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timeHorizons.map((horizon) => {
                const isSelected = data.timeHorizon === horizon.id;
                
                return (
                  <button
                    key={horizon.id}
                    onClick={() => updateData({ timeHorizon: horizon.id })}
                    className={cn(
                      "p-6 rounded-xl border-2 transition-all duration-300 text-center group hover:scale-105",
                      isSelected
                        ? "border-leaf-mint bg-leaf-mint/10 leaf-gradient-hover"
                        : "border-border bg-muted/20 hover:border-leaf-mint/50"
                    )}
                  >
                    <div className={cn(
                      "text-lg font-display font-semibold mb-2 transition-colors",
                      isSelected ? "text-foreground" : "text-text-mid group-hover:text-foreground"
                    )}>
                      {horizon.label}
                    </div>
                    <div className="text-leaf-mint font-medium mb-2">
                      {horizon.duration}
                    </div>
                    <div className="text-sm text-text-mid">
                      {horizon.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Educational Note */}
          <Card className="glass-card border-0 p-6 bg-muted/10">
            <div className="text-center">
              <div className="text-sm text-text-mid leading-relaxed">
                <strong className="text-foreground">Remember:</strong> This is for educational purposes only. 
                All investments carry risk, and past performance doesn't guarantee future results. 
                Consider consulting with a financial advisor for personalized advice.
              </div>
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