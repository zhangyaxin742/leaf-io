import React from "react";
import { Card } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { LeafLogo } from "@/components/LeafLogo";
import { Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareCardProps {
  amount: number;
  period: string;
  theme?: string;
  className?: string;
  variant?: "impact" | "achievement" | "milestone";
}

const ShareCard = ({ 
  amount, 
  period, 
  theme = "Solar & Storage", 
  className,
  variant = "impact"
}: ShareCardProps) => {
  const handleExportPNG = () => {
    console.log("Exporting PNG share card...");
  };

  const handleShare = () => {
    console.log("Sharing to social media...");
  };

  const getContent = () => {
    switch (variant) {
      case "achievement":
        return {
          title: "Achievement Unlocked! 🏆",
          subtitle: `Completed ${amount} learning modules`,
          description: `Building financial knowledge in ${period}`
        };
      case "milestone":
        return {
          title: "Milestone Reached! 🎯",
          subtitle: `${amount} day learning streak`,
          description: `Consistent progress in ${period}`
        };
      default:
        return {
          title: "Practice Impact Report",
          subtitle: `$${amount} simulated for impact`,
          description: `Allocated to ${theme} in ${period}`
        };
    }
  };

  const content = getContent();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Share Card Preview */}
      <Card variant="highlight" className="max-w-sm mx-auto overflow-hidden">
        <div className="relative p-8 text-center">
          {/* Background Gradient */}
          <div className="absolute inset-0 leaf-gradient opacity-90" />
          
          {/* Content */}
          <div className="relative z-10 space-y-4">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
              <span className="font-display font-semibold text-white text-lg">
                leaf.io
              </span>
            </div>

            {/* Main Content */}
            <div className="text-white space-y-3">
              <h3 className="text-sm font-medium opacity-90">
                {content.title}
              </h3>
              <div className="text-3xl font-bold">
                {content.subtitle}
              </div>
              <p className="text-sm opacity-90">
                {content.description}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-white/70 mt-6">
              Simulation only — no real trades
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleExportPNG}
          className="flex-1 max-w-32"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PNG
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          onClick={handleShare}
          className="flex-1 max-w-32"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Preview of your shareable card • No personal data included
      </p>
    </div>
  );
};

export default ShareCard;