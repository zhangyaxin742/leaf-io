import { Card } from "@/components/ui/card";
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

export const BudgetView = () => (
  <div className="min-h-screen grid-background pt-20 md:pt-24 pb-20 md:pb-8">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
        Budget Planner
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-0 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">Monthly Budget</h2>
              <Button variant="hero" size="sm">
                <PieChart className="w-4 h-4" />
                View Chart
              </Button>
            </div>
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
              <p className="text-text-mid">Detailed budget tracking coming soon!</p>
            </div>
          </Card>
          
          <Card className="glass-card border-0 p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">Spending Analysis</h2>
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
              <p className="text-text-mid">AI-powered spending insights coming soon!</p>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="glass-card border-0 p-6">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="glass" className="w-full justify-start">
                Add Expense
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="glass" className="w-full justify-start">
                Set Budget Goal
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="glass" className="w-full justify-start">
                View Reports
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export const InvestView = () => (
  <div className="min-h-screen grid-background pt-20 md:pt-24 pb-20 md:pb-8">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
        Impact Investing
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card border-0 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-foreground">Portfolio</h2>
            <Button variant="hero" size="sm">
              <TrendingUp className="w-4 h-4" />
              Invest More
            </Button>
          </div>
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
            <p className="text-text-mid">Build your impact portfolio with sustainable investments!</p>
          </div>
        </Card>
        
        <Card className="glass-card border-0 p-6">
          <h2 className="text-xl font-display font-semibold text-foreground mb-6">Impact Funds</h2>
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
            <p className="text-text-mid">Discover funds that match your values!</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

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

export const SettingsView = () => (
  <div className="min-h-screen grid-background pt-20 md:pt-24 pb-20 md:pb-8">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
        Settings
      </h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="glass-card border-0 p-6">
          <h2 className="text-xl font-display font-semibold text-foreground mb-6">Account Settings</h2>
          <div className="space-y-3">
            <Button variant="glass" className="w-full justify-start">
              Notifications
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="glass" className="w-full justify-start">
              Privacy & Security
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="glass" className="w-full justify-start">
              Connected Accounts
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </Card>
        
        <Card className="glass-card border-0 p-6">
          <h2 className="text-xl font-display font-semibold text-foreground mb-6">Preferences</h2>
          <div className="space-y-3">
            <Button variant="glass" className="w-full justify-start">
              Impact Categories
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="glass" className="w-full justify-start">
              Budget Alerts
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="glass" className="w-full justify-start">
              Investment Risk
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </Card>
        
        <Card className="glass-card border-0 p-6">
          <div className="text-center py-8">
            <Settings className="w-16 h-16 mx-auto text-leaf-mint mb-4" />
            <p className="text-text-mid">More settings features coming soon!</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);