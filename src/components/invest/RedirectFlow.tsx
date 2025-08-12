import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  Zap, 
  Waves, 
  TreePine, 
  Heart, 
  Share2, 
  Check,
  ArrowLeft,
  Sparkles
} from "lucide-react";

interface RedirectFlowProps {
  open: boolean;
  onClose: () => void;
}

const RedirectFlow = ({ open, onClose }: RedirectFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const themes = [
    {
      id: "solar",
      title: "Solar & Storage",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/20"
    },
    {
      id: "coastal",
      title: "Coastal Resilience", 
      icon: Waves,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20"
    },
    {
      id: "community",
      title: "Community Projects",
      icon: Heart,
      color: "text-pink-500", 
      bgColor: "bg-pink-500/20"
    },
    {
      id: "nature",
      title: "Natural Capital",
      icon: TreePine,
      color: "text-lime-500",
      bgColor: "bg-lime-500/20"
    }
  ];

  const impactStories = {
    1: "Your $1 spare change helps fund 0.02 solar panels for community centers",
    5: "Your $5 spare change supports 1.2 meters of coastal wetland restoration",
    custom: `Your $${customAmount} spare change contributes to renewable energy infrastructure`
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleThemeToggle = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : prev.length < 3 ? [...prev, themeId] : prev
    );
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedAmount(null);
    setCustomAmount("");
    setSelectedThemes([]);
    onClose();
  };

  const getSelectedAmountValue = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Redirect Spare Change</DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-text-mid">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-1" />
        </div>

        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Choose Amount</h3>
              <p className="text-sm text-text-mid">How much spare change would you like to redirect?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[1, 5].map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handleAmountSelect(amount)}
                  className="h-16 flex-col"
                >
                  <DollarSign className="w-5 h-5 mb-1" />
                  ${amount}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Custom Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-mid" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="pl-9"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <Button 
              onClick={handleNext} 
              className="w-full"
              disabled={!selectedAmount && !customAmount}
            >
              Next: Choose Themes
            </Button>
          </div>
        )}

        {/* Step 2: Theme Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Choose Impact Themes</h3>
              <p className="text-sm text-text-mid">
                Select up to 3 themes for your ${getSelectedAmountValue()} allocation
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => {
                const isSelected = selectedThemes.includes(theme.id);
                const Icon = theme.icon;
                
                return (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-leaf-mint bg-leaf-mint/10' 
                        : 'border-border hover:border-border-emphasis'
                    }`}
                    onClick={() => handleThemeToggle(theme.id)}
                  >
                    <CardContent className="flex items-center gap-3 p-3">
                      <div className={`p-2 rounded-lg ${theme.bgColor}`}>
                        <Icon className={`w-4 h-4 ${theme.color}`} />
                      </div>
                      <span className="flex-1 font-medium text-foreground text-sm">
                        {theme.title}
                      </span>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-leaf-mint" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="flex-1"
                disabled={selectedThemes.length === 0}
              >
                Confirm Redirect
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-leaf-mint/20 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-leaf-mint" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Redirect Confirmed!</h3>
              <p className="text-sm text-text-mid">
                Your spare change has been simulated for impact investing
              </p>
            </div>

            <Card className="glass-card border-0">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-mid">Amount Redirected</span>
                    <span className="font-semibold text-foreground">
                      ${getSelectedAmountValue().toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm text-text-mid">Impact Themes</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedThemes.map((themeId) => {
                        const theme = themes.find(t => t.id === themeId);
                        return (
                          <Badge key={themeId} variant="secondary" className="text-xs">
                            {theme?.title}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-text-mid">
                      {getSelectedAmountValue() <= 5 
                        ? impactStories[getSelectedAmountValue() as 1 | 5]
                        : impactStories.custom
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Done
              </Button>
              <Button variant="ghost" className="flex-1">
                <Share2 className="w-4 h-4" />
                Share Impact
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RedirectFlow;