import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";
import { BudgetView, InvestView, GoalsView, ProfileView, SettingsView } from "@/components/PlaceholderViews";

const Index = () => {
  const [currentView, setCurrentView] = useState("landing");

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage />;
      case "dashboard":
        return <Dashboard />;
      case "budget":
        return <BudgetView />;
      case "invest":
        return <InvestView />;
      case "goals":
        return <GoalsView />;
      case "profile":
        return <ProfileView />;
      case "settings":
        return <SettingsView />;
      default:
        return <LandingPage />;
    }
  };

  // Show landing page without navigation initially
  if (currentView === "landing") {
    return (
      <div className="min-h-screen">
        <LandingPage />
        {/* Demo button to enter app */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Try Demo →
          </button>
        </div>
      </div>
    );
  }

  // Show app views with navigation
  return (
    <div className="min-h-screen">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="min-h-screen">
        {renderView()}
      </main>
    </div>
  );
};

export default Index;
