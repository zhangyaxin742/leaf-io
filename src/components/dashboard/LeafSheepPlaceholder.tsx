import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart,
  Frown,
  Zap,
  Target,
  TrendingUp,
  AlertTriangle,
  Trophy,
  Sparkles
} from "lucide-react";

interface LeafSheepPlaceholderProps {
  mood: 'neutral' | 'happy' | 'sad' | 'sleepy' | 'celebrate';
  streakDays?: number;
  onPetClick?: () => void;
}

const LeafSheepPlaceholder = ({ 
  mood = 'neutral', 
  streakDays = 0, 
  onPetClick 
}: LeafSheepPlaceholderProps) => {
  
  const getMoodInfo = () => {
    switch (mood) {
      case 'happy':
        return {
          gradient: 'from-green-400 via-emerald-500 to-teal-600',
          icon: Heart,
          text: 'Happy leaf sheep will live here! 🌱',
          description: 'Budget is on track'
        };
      case 'sad':
        return {
          gradient: 'from-orange-400 via-red-500 to-pink-600',
          icon: Frown,
          text: 'Sad leaf sheep will live here... 😔',
          description: 'Overspending detected'
        };
      case 'sleepy':
        return {
          gradient: 'from-indigo-400 via-purple-500 to-pink-600',
          icon: Zap,
          text: 'Sleepy leaf sheep will live here... 😴',
          description: 'Low activity period'
        };
      case 'celebrate':
        return {
          gradient: 'from-yellow-400 via-orange-500 to-red-600',
          icon: Trophy,
          text: 'Celebrating leaf sheep will live here! 🎉',
          description: 'Streak + redirect combo!'
        };
      default:
        return {
          gradient: 'from-leaf-mint via-leaf-sage to-leaf-forest',
          icon: Sparkles,
          text: 'Leaf sheep will live here.',
          description: 'Neutral state'
        };
    }
  };

  const moodInfo = getMoodInfo();
  const Icon = moodInfo.icon;

  return (
    <Card className="glass-card border-0 max-w-sm">
      <CardContent className="p-6 space-y-4">
        {/* Mascot Placeholder */}
        <div 
          className={`relative h-32 rounded-xl bg-gradient-to-br ${moodInfo.gradient} cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center justify-center`}
          onClick={onPetClick}
        >
          <div className="absolute inset-0 bg-white/20 rounded-xl backdrop-blur-sm" />
          <div className="relative z-10 text-center space-y-2">
            <Icon className="w-8 h-8 text-white mx-auto" />
            <p className="text-sm font-medium text-white px-4">
              {moodInfo.text}
            </p>
          </div>
          
          {streakDays > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 right-2 bg-white/90 text-foreground"
            >
              {streakDays} day streak
            </Badge>
          )}
        </div>

        {/* Mood Legend */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            Mood System Preview
          </h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
              <span className="text-text-mid">Happy: Budget on track</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500" />
              <span className="text-text-mid">Sad: Overspending detected</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500" />
              <span className="text-text-mid">Sleepy: Low activity</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
              <span className="text-text-mid">Celebrate: Streak + redirect combo</span>
            </div>
          </div>

          {/* Current State */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-leaf-mint" />
              <span className="text-sm text-foreground">Current:</span>
              <span className="text-sm text-text-mid">{moodInfo.description}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeafSheepPlaceholder;