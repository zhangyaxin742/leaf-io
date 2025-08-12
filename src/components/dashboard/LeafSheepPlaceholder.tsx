import { Card } from "@/components/ui/card";

interface LeafSheepPlaceholderProps {
  mood?: string;
  streakDays?: number;
  onPetClick?: () => void;
}

const LeafSheepPlaceholder = ({ mood, streakDays, onPetClick }: LeafSheepPlaceholderProps) => {
  return (
    <Card 
      className="glass-card border-0 p-6 h-80 cursor-pointer hover:scale-102 transition-all duration-300 leaf-gradient-border"
      onClick={onPetClick}
    >
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="w-32 h-32 rounded-full bg-muted/30 flex items-center justify-center">
          <div className="text-4xl">🐑</div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold text-foreground">
            Your Leaf Sheep
          </h3>
          <p className="text-text-mid text-sm max-w-xs">
            Your leaf sheep will respond to your progress. Placeholder component here.
          </p>
        </div>

        {streakDays && (
          <div className="flex items-center gap-2 text-xs text-leaf-mint">
            <span>🔥</span>
            <span>{streakDays} day streak</span>
          </div>
        )}

        <div className="text-xs text-text-mid opacity-60">
          Mood: {mood || "Content"} • Tap to interact
        </div>
      </div>
    </Card>
  );
};

export default LeafSheepPlaceholder;