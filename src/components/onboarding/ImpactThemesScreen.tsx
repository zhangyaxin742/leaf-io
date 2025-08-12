import { Button } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Waves, 
  DollarSign, 
  Users, 
  Recycle, 
  Building, 
  ArrowRight,
  Check 
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingData } from "./OnboardingFlow";

interface ImpactThemesScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const impactThemes = [
  {
    id: "solar-storage",
    title: "Solar & Storage",
    description: "Clean energy infrastructure and battery storage solutions",
    icon: Zap,
    color: "text-yellow-400",
    bgGradient: "from-yellow-400/20 to-orange-400/20",
    examples: ["Solar farms", "Battery storage", "Grid modernization"],
  },
  {
    id: "coastal-resilience",
    title: "Coastal Resilience",
    description: "Protecting coastlines and communities from climate change",
    icon: Waves,
    color: "text-blue-400",
    bgGradient: "from-blue-400/20 to-cyan-400/20",
    examples: ["Sea walls", "Wetland restoration", "Flood protection"],
  },
  {
    id: "green-bonds",
    title: "Green Bonds",
    description: "Government and corporate bonds funding environmental projects",
    icon: DollarSign,
    color: "text-green-400",
    bgGradient: "from-green-400/20 to-emerald-400/20",
    examples: ["Municipal bonds", "Corporate green debt", "Climate bonds"],
  },
  {
    id: "community-projects",
    title: "Community Projects",
    description: "Local initiatives that create social and environmental impact",
    icon: Users,
    color: "text-purple-400",
    bgGradient: "from-purple-400/20 to-pink-400/20",
    examples: ["Community gardens", "Local cooperatives", "Education programs"],
  },
  {
    id: "circular-economy",
    title: "Circular Economy",
    description: "Companies reducing waste and maximizing resource efficiency",
    icon: Recycle,
    color: "text-emerald-400",
    bgGradient: "from-emerald-400/20 to-teal-400/20",
    examples: ["Waste reduction", "Recycling tech", "Sustainable materials"],
  },
  {
    id: "sustainable-infrastructure",
    title: "Sustainable Infrastructure",
    description: "Green buildings, smart cities, and efficient transportation",
    icon: Building,
    color: "text-indigo-400",
    bgGradient: "from-indigo-400/20 to-blue-400/20",
    examples: ["Green buildings", "Smart grids", "Public transport"],
  },
];

export const ImpactThemesScreen = ({ data, updateData, onNext }: ImpactThemesScreenProps) => {
  const toggleTheme = (themeId: string) => {
    const themes = data.impactThemes.includes(themeId)
      ? data.impactThemes.filter(t => t !== themeId)
      : data.impactThemes.length < 3
      ? [...data.impactThemes, themeId]
      : data.impactThemes; // Don't add if already at limit
    
    updateData({ impactThemes: themes });
  };

  const selectedThemes = data.impactThemes.map(id => 
    impactThemes.find(theme => theme.id === id)
  ).filter(Boolean);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-4">
            Choose Your Impact Focus
          </h1>
          <p className="text-text-mid max-w-2xl mx-auto">
            Select 1-3 themes that resonate with you. These will guide your investment 
            recommendations and help you track your real-world impact.
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-leaf-mint">
              {data.impactThemes.length} of 3 selected
            </Badge>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {impactThemes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = data.impactThemes.includes(theme.id);
            const canSelect = !isSelected && data.impactThemes.length < 3;
            const isDisabled = !isSelected && data.impactThemes.length >= 3;
            
            return (
              <button
                key={theme.id}
                onClick={() => toggleTheme(theme.id)}
                disabled={isDisabled}
                className={cn(
                  "relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:scale-105",
                  isSelected
                    ? "border-leaf-mint bg-gradient-to-br leaf-gradient-hover"
                    : canSelect
                    ? "border-border bg-muted/20 hover:border-leaf-mint/50"
                    : "border-border/50 bg-muted/10 opacity-50 cursor-not-allowed"
                )}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-leaf-mint rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-background" />
                  </div>
                )}

                {/* Theme Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br",
                  theme.bgGradient
                )}>
                  <Icon className={cn("w-6 h-6", theme.color)} />
                </div>

                {/* Theme Content */}
                <h3 className={cn(
                  "text-lg font-display font-semibold mb-2 transition-colors",
                  isSelected ? "text-foreground" : "text-text-mid group-hover:text-foreground"
                )}>
                  {theme.title}
                </h3>
                
                <p className="text-text-mid text-sm mb-4 leading-relaxed">
                  {theme.description}
                </p>

                {/* Examples */}
                <div className="space-y-1">
                  {theme.examples.map((example, index) => (
                    <div key={index} className="text-xs text-text-mid flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-current opacity-50" />
                      {example}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Themes Summary */}
        {selectedThemes.length > 0 && (
          <Card className="glass-card border-0 p-6 mb-8">
            <h3 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
              Your Impact Portfolio Preview
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedThemes.map((theme) => {
                if (!theme) return null;
                const Icon = theme.icon;
                
                return (
                  <div key={theme.id} className="text-center">
                    <div className={cn(
                      "w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br",
                      theme.bgGradient
                    )}>
                      <Icon className={cn("w-8 h-8", theme.color)} />
                    </div>
                    <h4 className="font-display font-semibold text-foreground mb-2">
                      {theme.title}
                    </h4>
                    <p className="text-sm text-text-mid">
                      {theme.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-text-mid">
                You'll see investment opportunities and impact metrics related to these themes
              </div>
            </div>
          </Card>
        )}

        {/* Completion Summary */}
        <Card className="glass-card border-0 p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              You're All Set!
            </h2>
            <p className="text-text-mid mb-6 leading-relaxed">
              We've created your personalized Leaf.io experience based on your preferences. 
              You can always update these settings later in your profile.
            </p>
            
            {/* Quick Setup Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
              <div className="bg-muted/20 rounded-xl p-3">
                <div className="font-semibold text-foreground">{data.values.length}</div>
                <div className="text-text-mid">Values Selected</div>
              </div>
              <div className="bg-muted/20 rounded-xl p-3">
                <div className="font-semibold text-foreground">{data.riskLevel || "Not set"}</div>
                <div className="text-text-mid">Risk Level</div>
              </div>
              <div className="bg-muted/20 rounded-xl p-3">
                <div className="font-semibold text-foreground">
                  ${data.monthlyIncome?.toLocaleString() || "0"}
                </div>
                <div className="text-text-mid">Monthly Income</div>
              </div>
              <div className="bg-muted/20 rounded-xl p-3">
                <div className="font-semibold text-foreground">{data.impactThemes.length}</div>
                <div className="text-text-mid">Impact Themes</div>
              </div>
            </div>

            <Button
              variant="hero"
              size="xl"
              onClick={onNext}
              className="min-w-[250px]"
            >
              Enter Leaf
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};