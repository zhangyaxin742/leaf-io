import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppData } from "@/hooks/useAppData";
import BudgetReallocationModal from "./BudgetReallocationModal";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle
} from "lucide-react";

const BudgetOverview = () => {
  const { currentBudget, data } = useAppData();
  
  if (!currentBudget) {
    return (
      <div className="text-center py-12">
        <DollarSign className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
        <p className="text-text-mid">No budget data available. Create your first budget!</p>
      </div>
    );
  }

  const categories = [
    {
      name: "Needs",
      key: "needs" as const,
      target: currentBudget.targets.needs,
      spent: currentBudget.spent.needs,
      color: "bg-blue-500",
      description: "Essential expenses like food, transport, supplies"
    },
    {
      name: "Wants", 
      key: "wants" as const,
      target: currentBudget.targets.wants,
      spent: currentBudget.spent.wants,
      color: "bg-purple-500",
      description: "Entertainment, dining out, hobbies"
    },
    {
      name: "Save+Impact",
      key: "saveImpact" as const,
      target: currentBudget.targets.saveImpact,
      spent: currentBudget.spent.saveImpact,
      color: "bg-leaf-mint",
      description: "Savings and simulated impact investments"
    }
  ];

  const getProgressPercentage = (spent: number, target: number) => {
    return Math.min((spent / target) * 100, 100);
  };

  const getProgressColor = (spent: number, target: number) => {
    const percentage = (spent / target) * 100;
    if (percentage > 100) return "bg-destructive";
    if (percentage > 90) return "bg-warning";
    return "bg-success";
  };

  const getTrendIcon = (spent: number, target: number) => {
    const percentage = (spent / target) * 100;
    if (percentage > 100) {
      return <TrendingUp className="w-4 h-4 text-destructive" />;
    }
    return <TrendingDown className="w-4 h-4 text-success" />;
  };

  return (
    <div className="space-y-6">
      {/* Budget Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
          Budget Overview
        </h2>
        <p className="text-text-mid">
          Track spending across your categories for {currentBudget.month.replace('-', ' ')}
        </p>
      </div>

      {/* Budget Summary Card */}
      <Card variant="highlight">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-leaf-mint" />
            Monthly Income: ${currentBudget.income}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Total Allocated</p>
              <p className="text-2xl font-bold text-foreground">
                ${currentBudget.targets.needs + currentBudget.targets.wants + currentBudget.targets.saveImpact}
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold text-foreground">
                ${currentBudget.spent.needs + currentBudget.spent.wants + currentBudget.spent.saveImpact}
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-success">
                ${currentBudget.income - (currentBudget.spent.needs + currentBudget.spent.wants + currentBudget.spent.saveImpact)}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <BudgetReallocationModal />
          </div>
        </CardContent>
      </Card>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const progressPercentage = getProgressPercentage(category.spent, category.target);
          const remaining = Math.max(0, category.target - category.spent);
          
          return (
            <Card 
              key={category.key} 
              variant="default"
              className="hover:scale-102 transition-transform duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  {getTrendIcon(category.spent, category.target)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <Badge variant={progressPercentage > 100 ? "destructive" : "secondary"}>
                      {progressPercentage.toFixed(0)}%
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={progressPercentage} 
                    className="h-3"
                  />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Spent</p>
                      <p className="font-semibold text-foreground">${category.spent}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-semibold text-foreground">${category.target}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Remaining</span>
                      <span className={`font-semibold ${remaining > 0 ? 'text-success' : 'text-destructive'}`}>
                        ${remaining}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Quick Stats */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>This Month's Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Spending Patterns</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Top category</span>
                  <span className="font-medium">
                    {categories.reduce((prev, current) => 
                      prev.spent > current.spent ? prev : current
                    ).name}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Recent transactions</span>
                  <span className="font-medium">{data.transactions.length}</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Budget Health</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Categories on track</span>
                  <span className="font-medium text-success">
                    {categories.filter(cat => cat.spent <= cat.target).length} of {categories.length}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active rules</span>
                  <span className="font-medium">{data.rules.filter(r => r.isActive).length}</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverview;