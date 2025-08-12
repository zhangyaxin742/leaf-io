import { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import { Progress } from "@/components/ui/progress";
import { LeafLogo } from "@/components/LeafLogo";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Import individual screen components
import { WelcomeScreen } from "./WelcomeScreen";
import { AccountSetupScreen } from "./AccountSetupScreen";
import { ValuesAvoidsScreen } from "./ValuesAvoidsScreen";
import { RiskTimeHorizonScreen } from "./RiskTimeHorizonScreen";
import { BudgetSkeletonScreen } from "./BudgetSkeletonScreen";
import { ImpactThemesScreen } from "./ImpactThemesScreen";

export interface OnboardingData {
  email: string;
  password: string;
  phone: string;
  age: number;
  twoFactorEnabled: boolean;
  tosAccepted: boolean;
  privacyAccepted: boolean;
  values: string[];
  avoids: string[];
  riskLevel: string;
  timeHorizon: string;
  monthlyIncome: number;
  budgetSplit: {
    needs: number;
    wants: number;
    saveImpact: number;
  };
  impactThemes: string[];
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const OnboardingFlow = ({ onComplete, onSkip }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    email: "",
    password: "",
    phone: "",
    age: 0,
    twoFactorEnabled: false,
    tosAccepted: false,
    privacyAccepted: false,
    values: [],
    avoids: [],
    riskLevel: "",
    timeHorizon: "",
    monthlyIncome: 0,
    budgetSplit: { needs: 50, wants: 30, saveImpact: 20 },
    impactThemes: [],
  });

  const steps = [
    { id: "welcome", title: "Welcome", component: WelcomeScreen },
    { id: "account", title: "Account", component: AccountSetupScreen },
    { id: "values", title: "Values", component: ValuesAvoidsScreen },
    { id: "risk", title: "Risk", component: RiskTimeHorizonScreen },
    { id: "budget", title: "Budget", component: BudgetSkeletonScreen },
    { id: "impact", title: "Impact", component: ImpactThemesScreen },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(data);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === 0) {
      onSkip();
    } else {
      setShowSkipConfirm(true);
    }
  };

  const confirmSkip = () => {
    onSkip();
  };

  const CurrentStepComponent = steps[currentStep].component;

  if (showSkipConfirm) {
    return (
      <div className="min-h-screen grid-background flex items-center justify-center">
        <div className="max-w-md mx-auto p-8">
          <div className="glass-card border-0 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-warning/20 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-warning" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              Skip setup?
            </h2>
            <p className="text-text-mid mb-8 leading-relaxed">
              You're almost done! Completing setup helps us personalize your experience and show you the most relevant impact opportunities.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="glass" 
                className="flex-1"
                onClick={() => setShowSkipConfirm(false)}
              >
                Continue Setup
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={confirmSkip}
              >
                Skip for Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <LeafLogo variant="side" size="sm" />
            <div className="flex items-center gap-4">
              {/* Progress Indicator */}
              <div className="hidden md:flex items-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index <= currentStep 
                        ? "leaf-gradient" 
                        : "bg-border"
                    )}
                  />
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Skip
              </Button>
            </div>
          </div>
          
          {/* Mobile Progress Bar */}
          <div className="md:hidden mt-4">
            <div className="flex justify-between text-sm text-text-mid mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <CurrentStepComponent
          data={data}
          updateData={updateData}
          onNext={nextStep}
          onPrev={prevStep}
          isFirst={currentStep === 0}
          isLast={currentStep === steps.length - 1}
        />
      </main>

      {/* Navigation Footer */}
      <footer className="border-t border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <div className="hidden md:block text-center">
              <div className="text-sm text-text-mid">
                Step {currentStep + 1} of {steps.length} • {steps[currentStep].title}
              </div>
            </div>

            <Button
              variant="hero"
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? "Enter Leaf" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingFlow;