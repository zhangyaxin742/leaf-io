import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, DollarSign, Leaf, Target, Star } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen grid-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Welcome back, Alex! 🌱
            </h1>
            <p className="text-text-mid mt-2">Track your money, grow your impact</p>
          </div>
          <Button variant="hero" size="lg" className="md:w-auto">
            <TrendingUp className="w-5 h-5" />
            Invest for Impact
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Wallet className="w-6 h-6" />}
            title="Total Balance"
            value="$3,247"
            change="+12.4%"
            positive
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Investments"
            value="$1,850"
            change="+8.7%"
            positive
          />
          <StatCard
            icon={<Leaf className="w-6 h-6" />}
            title="Impact Score"
            value="847"
            change="+23"
            positive
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Monthly Goal"
            value="73%"
            change="$180 left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget Overview */}
          <div className="lg:col-span-2">
            <BudgetOverview />
          </div>

          {/* Impact Portfolio */}
          <div>
            <ImpactPortfolio />
          </div>
        </div>

        {/* Recent Transactions */}
        <Card className="glass-card border-0 p-6">
          <h3 className="text-xl font-display font-semibold mb-6 text-foreground">Recent Activity</h3>
          <div className="space-y-4">
            {mockTransactions.map((transaction, index) => (
              <TransactionItem key={index} {...transaction} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, positive }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive?: boolean;
}) => (
  <Card className="glass-card border-0 p-6 hover:scale-105 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="text-leaf-mint">{icon}</div>
      <span className={`text-sm font-medium ${positive ? 'text-success' : 'text-text-mid'}`}>
        {change}
      </span>
    </div>
    <div className="mt-4">
      <h3 className="text-2xl font-display font-semibold text-foreground">{value}</h3>
      <p className="text-text-mid text-sm mt-1">{title}</p>
    </div>
  </Card>
);

const BudgetOverview = () => (
  <Card className="glass-card border-0 p-6">
    <h3 className="text-xl font-display font-semibold mb-6 text-foreground">Budget Tracker</h3>
    <div className="space-y-6">
      {mockBudgetCategories.map((category, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-foreground">{category.name}</span>
            <span className="text-text-mid">${category.spent}/${category.budget}</span>
          </div>
          <Progress 
            value={category.percentage} 
            className="h-3"
          />
        </div>
      ))}
    </div>
    <Button variant="glass" className="w-full mt-6">
      View Detailed Budget
    </Button>
  </Card>
);

const ImpactPortfolio = () => (
  <Card className="glass-card border-0 p-6">
    <h3 className="text-xl font-display font-semibold mb-6 text-foreground">Impact Portfolio</h3>
    <div className="space-y-4">
      {mockImpactInvestments.map((investment, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full leaf-gradient flex items-center justify-center">
              <Leaf className="w-5 h-5 text-background" />
            </div>
            <div>
              <p className="font-medium text-foreground">{investment.name}</p>
              <p className="text-sm text-text-mid">{investment.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">${investment.value}</p>
            <p className="text-sm text-success">+{investment.growth}%</p>
          </div>
        </div>
      ))}
    </div>
    <Button variant="hero" className="w-full mt-6">
      <Star className="w-4 h-4" />
      Explore More Funds
    </Button>
  </Card>
);

const TransactionItem = ({ name, category, amount, date, type }: {
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'expense' | 'income' | 'investment';
}) => {
  const isPositive = type === 'income' || type === 'investment';
  
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === 'investment' ? 'leaf-gradient' : 
          type === 'income' ? 'bg-success/20' : 'bg-muted'
        }`}>
          {type === 'investment' ? (
            <TrendingUp className="w-5 h-5 text-background" />
          ) : type === 'income' ? (
            <DollarSign className="w-5 h-5 text-success" />
          ) : (
            <Wallet className="w-5 h-5 text-text-mid" />
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-text-mid">{category} • {date}</p>
        </div>
      </div>
      <span className={`font-semibold ${isPositive ? 'text-success' : 'text-foreground'}`}>
        {isPositive ? '+' : '-'}${Math.abs(amount)}
      </span>
    </div>
  );
};

// Mock data
const mockBudgetCategories = [
  { name: "Food & Dining", spent: 420, budget: 500, percentage: 84 },
  { name: "Transportation", spent: 180, budget: 250, percentage: 72 },
  { name: "Entertainment", spent: 95, budget: 150, percentage: 63 },
  { name: "Shopping", spent: 340, budget: 300, percentage: 113 },
];

const mockImpactInvestments = [
  { name: "Clean Energy ETF", category: "Renewable Energy", value: "847", growth: 12.4 },
  { name: "Ocean Cleanup", category: "Environmental", value: "523", growth: 8.7 },
  { name: "Education Fund", category: "Social Impact", value: "480", growth: 15.2 },
];

const mockTransactions = [
  { name: "Starbucks", category: "Food & Dining", amount: 5.45, date: "Today", type: "expense" as const },
  { name: "Freelance Work", category: "Income", amount: 450, date: "Yesterday", type: "income" as const },
  { name: "Clean Energy ETF", category: "Investment", amount: 100, date: "2 days ago", type: "investment" as const },
  { name: "Uber", category: "Transportation", amount: 12.30, date: "3 days ago", type: "expense" as const },
];

export default Dashboard;