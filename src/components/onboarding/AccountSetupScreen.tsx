import { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react";
import type { OnboardingData } from "./OnboardingFlow";

interface AccountSetupScreenProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const AccountSetupScreen = ({ data, updateData, onNext }: AccountSetupScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showParentalNotice, setShowParentalNotice] = useState(false);

  const handleAgeChange = (age: number) => {
    updateData({ age });
    setShowParentalNotice(age < 18);
  };

  const isValid = 
    data.email && 
    data.password && 
    data.age > 0 && 
    data.tosAccepted && 
    data.privacyAccepted;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-4">
            Create Your Account
          </h1>
          <p className="text-text-mid">
            Set up your secure account to start your financial journey.
          </p>
        </div>

        <Card className="glass-card border-0 p-8">
          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                className="bg-muted/30 border-border"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={data.password}
                  onChange={(e) => updateData({ password: e.target.value })}
                  className="bg-muted/30 border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-leaf-mint" />
                <div>
                  <div className="font-medium text-foreground">Two-Factor Authentication</div>
                  <div className="text-sm text-text-mid">Extra security for your account</div>
                </div>
              </div>
              <Switch
                checked={data.twoFactorEnabled}
                onCheckedChange={(checked) => updateData({ twoFactorEnabled: checked })}
              />
            </div>

            {/* Optional Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-text-mid font-medium">
                Phone Number (Optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                className="bg-muted/30 border-border"
              />
            </div>

            {/* Age Confirmation */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-foreground font-medium">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="18"
                min="13"
                max="100"
                value={data.age || ""}
                onChange={(e) => handleAgeChange(parseInt(e.target.value) || 0)}
                className="bg-muted/30 border-border"
              />
            </div>

            {/* Parental Consent Notice */}
            {showParentalNotice && (
              <Card className="bg-warning/10 border-warning/30 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground mb-1">
                      Parental Consent Required
                    </div>
                    <div className="text-text-mid">
                      Users under 18 need parental or guardian consent to create an account. 
                      Please have a parent or guardian complete the signup process.
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Terms and Privacy */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="tos"
                  checked={data.tosAccepted}
                  onCheckedChange={(checked) => updateData({ tosAccepted: checked as boolean })}
                />
                <Label htmlFor="tos" className="text-sm text-text-mid leading-relaxed">
                  I agree to the{" "}
                  <button className="text-leaf-mint hover:underline">Terms of Service</button>
                </Label>
              </div>
              
              <div className="flex items-start gap-3">
                <Checkbox
                  id="privacy"
                  checked={data.privacyAccepted}
                  onCheckedChange={(checked) => updateData({ privacyAccepted: checked as boolean })}
                />
                <Label htmlFor="privacy" className="text-sm text-text-mid leading-relaxed">
                  I accept the{" "}
                  <button className="text-leaf-mint hover:underline">Privacy Policy</button>
                </Label>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Button
            variant="hero"
            size="lg"
            onClick={onNext}
            disabled={!isValid}
            className="min-w-[200px]"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};