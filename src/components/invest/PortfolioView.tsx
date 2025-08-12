import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/custom-button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  BarChart3,
  Zap,
  Waves,
  TreePine,
  Heart,
  ExternalLink,
  Shield
} from "lucide-react";

const PortfolioView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");

  const portfolioStats = {
    balance: 1847.32,
    change: 5.7,
    changeAmount: 102.45,
    riskLevel: "Moderate"
  };

  const holdings = [
    {
      id: "GBOND-A",
      name: "Green Municipal Bond A",
      ticker: "GBOND-A",
      allocation: 25,
      value: 461.83,
      change: 2.3,
      riskLevel: "Low",
      theme: "Green Bonds",
      icon: Shield,
      impactTags: ["Funds school microgrids", "Clean water access"],
      description: "Invests in municipal green bonds funding renewable energy infrastructure in underserved communities."
    },
    {
      id: "SOLAR-1",
      name: "Community Solar Fund",
      ticker: "SOLAR-1",
      allocation: 30,
      value: 554.20,
      change: 8.1,
      riskLevel: "Moderate",
      theme: "Solar & Storage",
      icon: Zap,
      impactTags: ["300+ solar panels", "Reduces grid strain"],
      description: "Supports community-owned solar projects and distributed energy storage systems."
    },
    {
      id: "COAST-B",
      name: "Coastal Resilience ETF",
      ticker: "COAST-B",
      allocation: 20,
      value: 369.46,
      change: -1.2,
      riskLevel: "Moderate",
      theme: "Coastal Resilience",
      icon: Waves,
      impactTags: ["Restores wetlands", "Storm protection"],
      description: "Focuses on coastal adaptation projects including natural barriers and early warning systems."
    },
    {
      id: "COMM-1",
      name: "Community Impact Fund",
      ticker: "COMM-1",
      allocation: 15,
      value: 277.10,
      change: 4.5,
      riskLevel: "Moderate",
      theme: "Community Projects",
      icon: Heart,
      impactTags: ["Local food security", "Education access"],
      description: "Invests in community-led initiatives for food security, education, and healthcare access."
    },
    {
      id: "NATURE-A",
      name: "Natural Capital Preserve",
      ticker: "NATURE-A",
      allocation: 10,
      value: 184.73,
      change: 6.2,
      riskLevel: "High",
      theme: "Natural Capital",
      icon: TreePine,
      impactTags: ["Forest protection", "Carbon sequestration"],
      description: "Supports forest conservation and carbon sequestration projects worldwide."
    }
  ];

  const [selectedHolding, setSelectedHolding] = useState<typeof holdings[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-mid">Simulated Balance</span>
              <DollarSign className="w-4 h-4 text-leaf-mint" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              ${portfolioStats.balance.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-mid">Change ({selectedPeriod})</span>
              {portfolioStats.change > 0 ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-error" />
              )}
            </div>
            <p className={`text-2xl font-bold ${
              portfolioStats.change > 0 ? 'text-success' : 'text-error'
            }`}>
              {portfolioStats.change > 0 ? '+' : ''}{portfolioStats.change}%
            </p>
            <p className="text-sm text-text-mid">
              ${portfolioStats.changeAmount.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-mid">Risk Level</span>
              <Activity className="w-4 h-4 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {portfolioStats.riskLevel}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-mid">Period</span>
              <BarChart3 className="w-4 h-4 text-text-mid" />
            </div>
            <div className="flex gap-1">
              {["1W", "1M", "1Y"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="text-xs px-2 py-1 h-7"
                >
                  {period}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Narrative */}
      <Card className="glass-card border-0 border-l-4 border-l-leaf-mint">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2">Impact Narrative</h3>
          <p className="text-sm text-text-mid">
            Your simulated $1,847 portfolio is supporting renewable energy infrastructure, 
            coastal protection measures, and community resilience projects. This month's 
            allocation helped fund 12 solar panel installations and 0.3 acres of wetland restoration.
          </p>
        </CardContent>
      </Card>

      {/* Holdings Grid */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg font-display">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {holdings.map((holding) => {
              const Icon = holding.icon;
              return (
                <Card
                  key={holding.id}
                  className="border hover:border-border-emphasis transition-colors cursor-pointer"
                  onClick={() => setSelectedHolding(holding)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-leaf-mint/20">
                          <Icon className="w-4 h-4 text-leaf-mint" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            {holding.name}
                          </h4>
                          <p className="text-xs text-text-mid">{holding.ticker}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          ${holding.value.toFixed(2)}
                        </p>
                        <p className={`text-xs ${
                          holding.change > 0 ? 'text-success' : 'text-error'
                        }`}>
                          {holding.change > 0 ? '+' : ''}{holding.change}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-mid">Allocation</span>
                        <span className="text-foreground">{holding.allocation}%</span>
                      </div>
                      <Progress value={holding.allocation} className="h-1" />
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        {holding.theme}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          holding.riskLevel === "Low" 
                            ? "border-success text-success" 
                            : holding.riskLevel === "High"
                            ? "border-warning text-warning"
                            : "border-text-mid text-text-mid"
                        }`}
                      >
                        {holding.riskLevel} Risk
                      </Badge>
                    </div>

                    <div className="mt-3 space-y-1">
                      {holding.impactTags.slice(0, 2).map((tag, index) => (
                        <p key={index} className="text-xs text-text-mid">
                          • {tag}
                        </p>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 text-xs"
                    >
                      Learn More
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioView;