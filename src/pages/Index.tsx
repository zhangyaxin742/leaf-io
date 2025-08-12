import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";
import { BudgetView, InvestView, LearnView, ActivityView, SettingsView } from "@/components/PlaceholderViews";

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("landing");

  // Check URL parameters and onboarding status
  useEffect(() => {
    const viewParam = searchParams.get('view');
    const hasCompletedOnboarding = localStorage.getItem('leafio-onboarding-completed');
    const hasSkippedOnboarding = localStorage.getItem('leafio-onboarding-skipped');
    
    if (viewParam && (hasCompletedOnboarding || hasSkippedOnboarding)) {
      setCurrentView(viewParam);
    } else if (viewParam && !hasCompletedOnboarding && !hasSkippedOnboarding) {
      // Redirect to onboarding if trying to access app without completing it
      navigate('/onboarding');
    }
  }, [searchParams, navigate]);

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onStartOnboarding={handleStartOnboarding} />;
      case "dashboard":
        return <Dashboard />;
      case "budget":
        return <BudgetView />;
      case "invest":
        return <InvestView />;
      case "learn":
        return <LearnView />;
      case "activity":
        return <ActivityView />;
      case "settings":
        return <SettingsView />;
      default:
        return <LandingPage onStartOnboarding={handleStartOnboarding} />;
    }
  };

  // Show landing page without navigation initially
  if (currentView === "landing") {
    return (
      <div className="min-h-screen">
        <LandingPage onStartOnboarding={handleStartOnboarding} />
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
