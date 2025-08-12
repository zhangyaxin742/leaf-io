import { Button } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Leaf, Heart, Droplets, Zap, Recycle, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingData } from "./OnboardingFlow";

interface ValuesAvoidsScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const valueOptions = [
  { id: "renewables", label: "Renewable Energy", icon: Zap, color: "text-yellow-400" },
  { id: "water", label: "Water Conservation", icon: Droplets, color: "text-blue-400" },
  { id: "resilience", label: "Climate Resilience", icon: Leaf, color: "text-green-400" },
  { id: "natural-capital", label: "Natural Capital", icon: Leaf, color: "text-emerald-400" },
  { id: "food-systems", label: "Sustainable Food", icon: Heart, color: "text-orange-400" },
  { id: "circularity", label: "Circular Economy", icon: Recycle, color: "text-purple-400" },
  { id: "community-health", label: "Community Health", icon: Heart, color: "text-pink-400" },
  { id: "affordable-housing", label: "Affordable Housing", icon: Home, color: "text-indigo-400" },
];

const avoidOptions = [
  { id: "fossil-fuels", label: "Fossil Fuels" },
  { id: "weapons", label: "Weapons Manufacturing" },
  { id: "tobacco", label: "Tobacco" },
  { id: "predatory-lending", label: "Predatory Lending" },
  { id: "private-prisons", label: "Private Prisons" },
  { id: "gambling", label: "Gambling" },
];

export const ValuesAvoidsScreen = ({ data, updateData, onNext }: ValuesAvoidsScreenProps) => {
  const toggleValue = (valueId: string) => {
    const values = data.values.includes(valueId)
      ? data.values.filter(v => v !== valueId)
      : [...data.values, valueId];
    updateData({ values });
  };

  const toggleAvoid = (avoidId: string) => {
    const avoids = data.avoids.includes(avoidId)
      ? data.avoids.filter(a => a !== avoidId)
      : [...data.avoids, avoidId];
    updateData({ avoids });
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-4">
            What Matters to You?
          </h1>
          <p className="text-text-mid max-w-2xl mx-auto">
            Help us find investments that align with your values. 
            Select the causes you care about and what you'd prefer to avoid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Values Section */}
          <Card className="glass-card border-0 p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-leaf-mint" />
              I Support
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {valueOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = data.values.includes(option.id);
                
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleValue(option.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105",
                      isSelected
                        ? "border-leaf-mint bg-leaf-mint/10 leaf-gradient-hover"
                        : "border-border bg-muted/20 hover:border-leaf-mint/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-5 h-5", option.color)} />
                      <span className={cn(
                        "font-medium transition-colors",
                        isSelected ? "text-foreground" : "text-text-mid group-hover:text-foreground"
                      )}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-sm text-text-mid">
              Selected: {data.values.length} / {valueOptions.length}
            </div>
          </Card>

          {/* Avoids Section */}
          <Card className="glass-card border-0 p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-error/20 text-error text-sm">×</span>
              I Avoid
            </h2>
            
            <div className="space-y-3">
              {avoidOptions.map((option) => {
                const isAvoided = data.avoids.includes(option.id);
                
                return (
                  <div
                    key={option.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-medium text-foreground">
                      {option.label}
                    </span>
                    <Switch
                      checked={isAvoided}
                      onCheckedChange={() => toggleAvoid(option.id)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-sm text-text-mid">
              Avoiding: {data.avoids.length} categories
            </div>
          </Card>
        </div>

        {/* Selected Values Preview */}
        {data.values.length > 0 && (
          <Card className="glass-card border-0 p-6 mt-8">
            <h3 className="font-display font-semibold text-foreground mb-4">Your Impact Focus</h3>
            <div className="flex flex-wrap gap-2">
              {data.values.map((valueId) => {
                const option = valueOptions.find(o => o.id === valueId);
                return option ? (
                  <Badge key={valueId} variant="secondary" className="leaf-gradient text-background">
                    {option.label}
                  </Badge>
                ) : null;
              })}
            </div>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Button
            variant="hero"
            size="lg"
            onClick={onNext}
            className="min-w-[200px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};