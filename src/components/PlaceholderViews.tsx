import { useState } from "react";
import { Card } from "@/components/ui/card";
import BudgetOverview from "@/components/budget/BudgetOverview";
import TransactionsView from "@/components/budget/TransactionsView";
import BudgetRules from "@/components/budget/BudgetRules";
import InvestSimulator from "@/components/invest/InvestSimulator";
import LearnView from "@/components/learn/LearnView";
import ActivityView from "@/components/activity/ActivityView";
import SettingsView from "@/components/settings/SettingsView";
import { Button } from "@/components/ui/custom-button";
import { 
  PieChart, 
  TrendingUp, 
  Target, 
  User, 
  Settings,
  ArrowRight,
  BarChart3,
  Leaf,
  Star
} from "lucide-react";

export { LearnView };

export { ActivityView };

export const BudgetView = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen grid-background pt-20 pb-24 md:pt-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex bg-muted/30 rounded-full p-1 w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "transactions", label: "Transactions" },
            { id: "rules", label: "Rules" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-leaf-mint text-background font-medium"
                  : "text-text-mid hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <BudgetOverview />}
        {activeTab === "transactions" && <TransactionsView />}
        {activeTab === "rules" && <BudgetRules />}
      </div>
    </div>
  );
};

export const InvestView = () => <InvestSimulator />;

export const GoalsView = () => (
  <div className="min-h-screen grid-background pt-20 md:pt-24 pb-20 md:pb-8">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
        Financial Goals
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-0 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-foreground">Active Goals</h2>
            <Button variant="hero" size="sm">
              <Target className="w-4 h-4" />
              Add Goal
            </Button>
          </div>
          <div className="text-center py-12">
            <Target className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
            <p className="text-text-mid">Set and track your financial milestones!</p>
          </div>
        </Card>
        
        <Card className="glass-card border-0 p-6">
          <h2 className="text-xl font-display font-semibold text-foreground mb-6">Progress</h2>
          <div className="text-center py-12">
            <Star className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
            <p className="text-text-mid">Celebrate your achievements!</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export const ProfileView = () => (
  <div className="min-h-screen grid-background pt-20 md:pt-24 pb-20 md:pb-8">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
        Profile
      </h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card border-0 p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 leaf-gradient rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-background" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-foreground">Alex Johnson</h2>
            <p className="text-text-mid">Member since October 2024</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-xl bg-muted/30">
              <span className="text-foreground">Impact Score</span>
              <span className="font-semibold text-leaf-mint">847 points</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-muted/30">
              <span className="text-foreground">Total Invested</span>
              <span className="font-semibold text-success">$1,850</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-muted/30">
              <span className="text-foreground">Goals Achieved</span>
              <span className="font-semibold text-success">3 of 5</span>
            </div>
          </div>
          
          <Button variant="hero" className="w-full mt-8">
            Edit Profile
          </Button>
        </Card>
      </div>
    </div>
  </div>
);

export { SettingsView };