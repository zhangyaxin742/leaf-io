import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Plus, Repeat, BookOpen, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const { toast } = useToast();

  const handleAddTransaction = () => {
    toast({
      title: "Add Transaction",
      description: "Transaction modal would open here (mock functionality)",
    });
  };

  const handleRedirectSpareChange = () => {
    toast({
      title: "Spare Change Redirect",
      description: "Invest Quick Redirect would open here (mock functionality)",
    });
  };

  const handleStartLearnBite = () => {
    toast({
      title: "Learn Bite",
      description: "Redirecting to Learn section (mock functionality)",
    });
  };

  return (
    <Card className="glass-card border-0 p-6">
      <h3 className="text-xl font-display font-semibold mb-6 text-foreground">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button 
          variant="glass" 
          className="flex flex-col gap-2 h-auto py-4 hover:scale-105 transition-all"
          onClick={handleAddTransaction}
        >
          <Plus className="w-6 h-6 text-leaf-mint" />
          <span className="text-sm font-medium">Add Transaction</span>
        </Button>

        <Button 
          variant="hero" 
          className="flex flex-col gap-2 h-auto py-4 hover:scale-105 transition-all"
          onClick={handleRedirectSpareChange}
        >
          <Repeat className="w-6 h-6" />
          <span className="text-sm font-medium">Redirect Spare Change</span>
        </Button>

        <Button 
          variant="glass" 
          className="flex flex-col gap-2 h-auto py-4 hover:scale-105 transition-all"
          onClick={handleStartLearnBite}
        >
          <BookOpen className="w-6 h-6 text-leaf-mint" />
          <span className="text-sm font-medium">Start Learn Bite</span>
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;