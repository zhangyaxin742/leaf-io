import MonthlyGoalStrip from "@/components/dashboard/MonthlyGoalStrip";
import LeafSheepPlaceholder from "@/components/dashboard/LeafSheepPlaceholder";
import BudgetSnapshot from "@/components/dashboard/BudgetSnapshot";
import QuickActions from "@/components/dashboard/QuickActions";
import ImpactGlanceCard from "@/components/dashboard/ImpactGlanceCard";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  const handlePetClick = () => {
    toast({
      title: "Leaf Sheep Interaction",
      description: "Your leaf sheep is happy to see you! (mock functionality)",
    });
  };

  return (
    <div className="min-h-screen grid-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Monthly Goal Strip */}
        <MonthlyGoalStrip />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - LeafSheep and Budget */}
          <div className="space-y-6">
            <LeafSheepPlaceholder 
              mood="Content"
              streakDays={7}
              onPetClick={handlePetClick}
            />
            <QuickActions />
          </div>

          {/* Middle Column - Budget Snapshot */}
          <div>
            <BudgetSnapshot />
          </div>

          {/* Right Column - Impact Glance */}
          <div>
            <ImpactGlanceCard />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;