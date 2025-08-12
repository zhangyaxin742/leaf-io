import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Heart, 
  TrendingUp, 
  Droplets,
  Zap,
  TreePine,
  Shield,
  Building
} from "lucide-react";

const CompareView = () => {
  const performanceData = {
    "1W": { value: 2.3, benchmark: 1.8 },
    "1M": { value: 5.7, benchmark: 4.2 },
    "1Y": { value: 12.4, benchmark: 8.9 }
  };

  const impactMetrics = [
    {
      icon: Zap,
      title: "Solar Panels Funded",
      value: "47.3",
      unit: "panels",
      description: "Equivalent panels supported through your simulated investments",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Coastal Protection",
      value: "12.7",
      unit: "meters",
      description: "Meters of dune restoration your portfolio supports",
      color: "text-blue-500"
    },
    {
      icon: Droplets,
      title: "Clean Water Access",
      value: "850",
      unit: "liters/day",
      description: "Daily clean water capacity funded (illustrative)",
      color: "text-cyan-500"
    },
    {
      icon: TreePine,
      title: "Carbon Sequestration",
      value: "0.3",
      unit: "tons CO₂/year",
      description: "Annual carbon sequestration potential",
      color: "text-green-500"
    },
    {
      icon: Building,
      title: "Community Projects",
      value: "3",
      unit: "initiatives",
      description: "Local community initiatives partially funded",
      color: "text-purple-500"
    },
    {
      icon: Heart,
      title: "Beneficiaries Reached",
      value: "127",
      unit: "people",
      description: "Estimated individuals positively impacted",
      color: "text-pink-500"
    }
  ];

  return (
    <Tabs defaultValue="performance" className="space-y-6">
      <TabsList>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="impact">Impact</TabsTrigger>
      </TabsList>

      <TabsContent value="performance" className="space-y-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-leaf-mint" />
              Simulated Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(performanceData).map(([period, data]) => (
                <div key={period} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{period} Performance</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-success">
                        +{data.value}%
                      </p>
                      <p className="text-xs text-text-mid">
                        vs {data.benchmark}% benchmark
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-mid">Your Portfolio</span>
                      <span className="text-foreground">{data.value}%</span>
                    </div>
                    <Progress value={(data.value / 15) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-text-mid">Market Benchmark</span>
                      <span className="text-foreground">{data.benchmark}%</span>
                    </div>
                    <Progress 
                      value={(data.benchmark / 15) * 100} 
                      className="h-2 opacity-60" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/30">
              <p className="text-xs text-text-mid">
                <strong>Note:</strong> Performance data is simulated for educational purposes only. 
                Past performance does not guarantee future results. These are illustrative 
                calculations based on market proxies.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="impact" className="space-y-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-leaf-mint" />
              Impact Dashboard
            </CardTitle>
            <p className="text-sm text-text-mid mt-1">
              Your simulated $25/month contributions would support these impact metrics
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {impactMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="border hover:border-border-emphasis transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted/30">
                          <Icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm mb-1">
                            {metric.title}
                          </h4>
                          <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-xl font-bold text-foreground">
                              {metric.value}
                            </span>
                            <span className="text-sm text-text-mid">
                              {metric.unit}
                            </span>
                          </div>
                          <p className="text-xs text-text-mid">
                            {metric.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-lg bg-leaf-mint/10 border border-leaf-mint/20">
                <h4 className="font-semibold text-foreground mb-2">Monthly Impact Summary</h4>
                <p className="text-sm text-text-mid">
                  Your simulated $25/month allocation across Solar & Storage, Coastal Resilience, 
                  and Community Projects is estimated to support renewable energy infrastructure, 
                  natural disaster preparedness, and local community initiatives. 
                </p>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-xs mr-2">Illustrative Only</Badge>
                  <Badge variant="outline" className="text-xs">Conservative Estimates</Badge>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-text-mid">
                  <strong>Impact Methodology:</strong> These metrics are illustrative projections 
                  based on industry averages and third-party impact measurement frameworks. 
                  Actual impact varies by project, location, and market conditions. 
                  All figures are conservative estimates for educational purposes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CompareView;