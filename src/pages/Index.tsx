import { useState } from "react";
import LockedScreen from "../components/LockedScreen";
import GoogleLoginCard from "../components/GoogleLoginCard";
import AuditForm from "../components/AuditForm";

type AppStep = "locked" | "login" | "form";

const Index = () => {
  const [step, setStep] = useState<AppStep>("locked");

  return (
    <div className="min-h-screen bg-background font-roboto">
      <div className="flex items-center justify-center min-h-screen py-8 px-4">
        {step === "locked" && (
          <div className="animate-fade-in w-full">
            <LockedScreen onContinue={() => setStep("login")} />
          </div>
        )}

        {step === "login" && (
          <div className="animate-fade-in w-full">
            <GoogleLoginCard onLoginComplete={() => setStep("form")} />
          </div>
        )}

        {step === "form" && (
          <div className="animate-fade-in w-full py-4">
            <AuditForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
