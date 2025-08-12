import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Leaf, ArrowRight, TrendingUp } from "lucide-react";

const ImpactGlanceCard = () => {
  return (
    <Card className="glass-card border-0 p-6 hover:scale-102 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full leaf-gradient flex items-center justify-center">
            <Leaf className="w-6 h-6 text-background" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-foreground">Impact This Month</h3>
            <p className="text-text-mid text-sm">Your simulated impact investing</p>
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-success" />
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-text-mid">Total Simulated</span>
          <span className="text-xl font-semibold text-foreground">$240</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-text-mid">Primary Theme</span>
          <span className="text-leaf-mint font-medium">Clean Energy</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-mid">Estimated Impact</span>
          <span className="text-success font-medium">+12.4% growth</span>
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-4 mb-4">
        <p className="text-sm text-foreground">
          This month you simulated <span className="font-semibold text-leaf-mint">$240</span> into{" "}
          <span className="font-medium">Clean Energy & Solar</span> projects.
        </p>
      </div>

      <Button variant="glass" className="w-full group">
        See Full Impact Details
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
};

export default ImpactGlanceCard;