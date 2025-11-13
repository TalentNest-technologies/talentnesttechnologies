import { useNavigate } from "react-router-dom";
import { MFAEnrollment } from "@/components/hotel-ai/MFAEnrollment";
import { FloatingBackground } from "@/components/FloatingBackground";

export default function MFASetup() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/hotel-ai/onboarding");
  };

  const handleSkip = () => {
    navigate("/hotel-ai/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <FloatingBackground variant="hotel" />
      
      <div className="w-full max-w-lg relative z-10">
        <MFAEnrollment onComplete={handleComplete} onSkip={handleSkip} />
      </div>
    </div>
  );
}
