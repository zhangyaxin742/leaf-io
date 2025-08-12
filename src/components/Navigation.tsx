import { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import { LeafLogo } from "@/components/LeafLogo";
import { 
  Home, 
  PieChart, 
  TrendingUp, 
  Target, 
  Settings, 
  User,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "budget", label: "Budget", icon: PieChart },
    { id: "invest", label: "Invest", icon: TrendingUp },
    { id: "goals", label: "Goals", icon: Target },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LeafLogo variant="side" size="md" />
            
            <div className="flex items-center gap-2">
              {navItems.slice(0, 4).map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "hero" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {navItems.slice(4).map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "hero" : "ghost"}
                  size="icon"
                  onClick={() => onViewChange(item.id)}
                >
                  <item.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="flex items-center justify-between px-4 py-4">
          <LeafLogo variant="side" size="sm" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50">
            <div className="grid grid-cols-2 gap-2 p-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "hero" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-start"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 backdrop-blur-sm bg-background/90">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "hero" : "ghost"}
              size="sm"
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-1",
                currentView === item.id ? "text-background" : "text-text-mid"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;