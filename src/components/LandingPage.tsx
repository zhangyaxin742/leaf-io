import { Button } from "@/components/ui/custom-button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Smartphone, TrendingUp, Leaf, Shield, Target, DollarSign } from "lucide-react";

interface LandingPageProps {
  onStartOnboarding?: () => void;
}

const LandingPage = ({ onStartOnboarding }: LandingPageProps = {}) => {
  return (
    <div className="min-h-screen grid-background overflow-hidden">
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <img src="/assets/favicon.png" alt="leaf.io Logo" className="h-10 w-auto"/>
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-6 text-text-mid">
                <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
                <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
              </nav>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">Sign In</Button>
                <Button variant="hero" size="sm">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              Budget Smart.
              <br />
              <span className="leaf-gradient bg-clip-text text-transparent">
                Invest Impact.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-mid mb-12 max-w-2xl mx-auto leading-relaxed">
              The Gen-Z budgeting app that turns your money into positive change. 
              Track spending, grow wealth, save the planet. 🌱
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button 
                variant="hero" 
                size="xl" 
                className="min-w-[200px]"
                onClick={onStartOnboarding}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="xl" className="min-w-[200px]">
                <Smartphone className="w-5 h-5" />
                Download App
              </Button>
            </div>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-foreground mb-2">50K+</div>
                <div className="text-text-mid">Gen-Z Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-foreground mb-2">$2.5M</div>
                <div className="text-text-mid">Impact Invested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-foreground mb-2">95%</div>
                <div className="text-text-mid">Budget Goals Met</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Money Made Simple
            </h2>
            <p className="text-xl text-text-mid max-w-2xl mx-auto">
              Everything you need to master your finances and make a difference, all in one app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Smart Budgeting"
              description="Set goals, track spending, and get AI-powered insights to stay on track with your financial journey."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Impact Investing"
              description="Grow your wealth while supporting causes you care about. Every dollar makes a difference."
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8" />}
              title="Sustainability Focus"
              description="Track your environmental impact and discover eco-friendly spending alternatives."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Bank-Level Security"
              description="Your financial data is protected with enterprise-grade encryption and security measures."
            />
            <FeatureCard
              icon={<Smartphone className="w-8 h-8" />}
              title="Mobile-First Design"
              description="Designed for your lifestyle. Manage money on-the-go with our intuitive mobile experience."
            />
            <FeatureCard
              icon={<DollarSign className="w-8 h-8" />}
              title="No Hidden Fees"
              description="Transparent pricing with no surprise charges. Build wealth without breaking the bank."
            />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Your Money,
                <br />
                <span className="leaf-gradient bg-clip-text text-transparent">
                  Your Impact
                </span>
              </h2>
              <p className="text-xl text-text-mid mb-8 leading-relaxed">
                Every investment you make through Leaf.io supports sustainable companies, 
                clean energy projects, and social impact initiatives. Watch your portfolio 
                grow while making the world better.
              </p>
              <div className="space-y-4 mb-8">
                <ImpactStat icon="🌱" label="Trees Planted" value="12,500+" />
                <ImpactStat icon="☀️" label="Clean Energy Supported" value="2.3 MW" />
                <ImpactStat icon="🎓" label="Students Educated" value="1,850" />
                <ImpactStat icon="💧" label="Ocean Cleanup" value="500 lbs" />
              </div>
              <Button variant="hero" size="lg">
                See Your Impact
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 leaf-gradient rounded-3xl blur-3xl opacity-20"></div>
              <Card className="glass-card border-0 p-8 relative">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 leaf-gradient rounded-full flex items-center justify-center">
                    <Leaf className="w-10 h-10 text-background" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                    Impact Score: 847
                  </h3>
                  <p className="text-text-mid">Top 15% of users this month</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-mid">Environmental Impact</span>
                    <span className="font-semibold text-success">+23 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-mid">Social Contribution</span>
                    <span className="font-semibold text-success">+15 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-mid">Financial Growth</span>
                    <span className="font-semibold text-success">+12 points</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <Card className="glass-card border-0 p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-text-mid mb-8 max-w-2xl mx-auto">
              Join thousands of Gen-Z users who are already building wealth and changing the world, one dollar at a time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="min-w-[200px]">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="xl" className="min-w-[200px]">
                Watch Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="glass-card border-0 p-8 hover:scale-105 transition-all duration-300 group">
    <div className="text-leaf-mint mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-display font-semibold text-foreground mb-4">{title}</h3>
    <p className="text-text-mid leading-relaxed">{description}</p>
  </Card>
);

const ImpactStat = ({ icon, label, value }: {
  icon: string;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4">
    <span className="text-2xl">{icon}</span>
    <div>
      <div className="font-semibold text-foreground">{value}</div>
      <div className="text-text-mid text-sm">{label}</div>
    </div>
  </div>
);

export default LandingPage;