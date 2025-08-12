import { useNavigate } from "react-router-dom";
import OnboardingFlow, { OnboardingData } from "@/components/onboarding/OnboardingFlow";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleComplete = (data: OnboardingData) => {
    // Store onboarding data in localStorage for demo purposes
    localStorage.setItem('leafio-onboarding-data', JSON.stringify(data));
    localStorage.setItem('leafio-onboarding-completed', 'true');
    
    // Navigate to dashboard
    navigate('/?view=dashboard');
  };

  const handleSkip = () => {
    // Mark as skipped and go to landing
    localStorage.setItem('leafio-onboarding-skipped', 'true');
    navigate('/');
  };

  return (
    <OnboardingFlow 
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  );
};

export default Onboarding;