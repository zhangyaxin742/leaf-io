import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/custom-button";
import { PieChart, Zap, Building, Waves, TreePine, Recycle, Heart, Factory } from "lucide-react";

interface ThemeBuilderProps {
  onRedirectClick: () => void;
}

const ThemeBuilder = ({ onRedirectClick }: ThemeBuilderProps) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([
    "solar-storage", "resilience", "community"
  ]);

  const themes = [
    {
      id: "solar-storage",
      title: "Solar & Storage",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
      subTags: ["Grid Storage", "Rooftop Solar", "Microgrids", "Battery Tech"]
    },
    {
      id: "resilience",
      title: "Coastal Resilience",
      icon: Waves,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
      subTags: ["Coastal Barriers", "Early Warning", "Heat Adaptation", "Storm Protection"]
    },
    {
      id: "green-bonds",
      title: "Green Bonds",
      icon: Building,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
      subTags: ["Municipal Bonds", "Corporate Green", "Infrastructure", "Clean Transport"]
    },
    {
      id: "community",
      title: "Community Projects",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
      subTags: ["Local Energy", "Food Security", "Education", "Healthcare Access"]
    },
    {
      id: "circular",
      title: "Circular Economy",
      icon: Recycle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/20",
      subTags: ["Waste Reduction", "Materials Recovery", "Sustainable Design", "Reuse Systems"]
    },
    {
      id: "natural-capital",
      title: "Natural Capital",
      icon: TreePine,
      color: "text-lime-500",
      bgColor: "bg-lime-500/20",
      subTags: ["Forest Protection", "Carbon Sequestration", "Biodiversity", "Soil Health"]
    }
  ];

  const toggleTheme = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId) 
        ? prev.filter(id => id !== themeId)
        : prev.length < 3 ? [...prev, themeId] : prev
    );
  };

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-display">Impact Theme Builder</CardTitle>
            <p className="text-sm text-text-mid mt-1">
              Select up to 3 themes for your simulated portfolio
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {selectedThemes.length}/3 selected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => {
            const isSelected = selectedThemes.includes(theme.id);
            const Icon = theme.icon;
            
            return (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-102 ${
                  isSelected 
                    ? 'border-leaf-mint bg-leaf-mint/10' 
                    : 'border-border hover:border-border-emphasis'
                }`}
                onClick={() => toggleTheme(theme.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${theme.bgColor}`}>
                      <Icon className={`w-5 h-5 ${theme.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">
                        {theme.title}
                      </h3>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-leaf-mint" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {theme.subTags.slice(0, 2).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {theme.subTags.length > 2 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{theme.subTags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="hero" 
            className="flex-1"
            disabled={selectedThemes.length === 0}
          >
            <PieChart className="w-4 h-4" />
            Build Portfolio
          </Button>
          <Button 
            variant="outline" 
            onClick={onRedirectClick}
            disabled={selectedThemes.length === 0}
          >
            <Zap className="w-4 h-4" />
            Redirect Spare Change
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeBuilder;