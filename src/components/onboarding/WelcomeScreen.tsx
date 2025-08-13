import { Button } from "@/components/ui/custom-button";
import { ArrowRight, LogIn } from "lucide-react";
import type { OnboardingData } from "./OnboardingFlow";

interface WelcomeScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Large Logo */}
        <div className="mb-12">
              <img src="/assets/stacked-logo.png" alt="leaf.io Logo" className="h-10 w-auto mb-8"/>
          {/* Mascot Placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 glass-card border-2 border-dashed border-leaf-mint/30 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-2">🐑</div>
              <div className="text-xs text-text-mid font-medium">
                Leaf sheep<br />will live here
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Welcome to Leaf.io
          </h1>
          <p className="text-xl md:text-2xl text-text-mid leading-relaxed max-w-xl mx-auto">
            Budget, save, and build real-world impact—one habit at a time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onNext}
            className="min-w-[200px]"
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            variant="glass" 
            size="xl"
            className="min-w-[200px]"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-display font-semibold text-foreground">50K+</div>
            <div className="text-text-mid text-sm">Trusted Users</div>
          </div>
          <div>
            <div className="text-2xl font-display font-semibold text-foreground">Bank-Level</div>
            <div className="text-text-mid text-sm">Security</div>
          </div>
          <div>
            <div className="text-2xl font-display font-semibold text-foreground">$2.5M+</div>
            <div className="text-text-mid text-sm">Impact Invested</div>
          </div>
        </div>
      </div>
    </div>
  );
};