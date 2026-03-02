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

  const handlePasswordNext = () => {
    if (!password.trim()) return;
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
            {/* Google Logo */}
            <div className="flex justify-center mb-4">
              <GoogleLogo size={75} />
            </div>

            <h1 className="text-2xl font-normal text-center text-card-foreground mb-1">
              Iniciar sesión
            </h1>
            <p className="text-base text-center text-muted-foreground mb-8">
              Usa tu cuenta de Google
            </p>

            {/* Email Input */}
            <div className="mb-1">
              <input
                type="text"
                className="google-input"
                placeholder="Correo electrónico o teléfono"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                onKeyDown={(e) => handleKeyDown(e, handleEmailNext)}
                autoFocus
              />
              {emailError && (
                <p className="text-destructive text-xs mt-2 flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                  </svg>
                  {emailError}
                </p>
              )}
            </div>

            <a href="#" className="google-btn-text text-sm inline-block mt-1 mb-8">
              ¿Has olvidado el correo electrónico?
            </a>

            <p className="text-xs text-muted-foreground mb-8 leading-5">
              ¿No es tu ordenador? Usa el modo de invitado para iniciar sesión en privado.{" "}
              <a href="#" className="google-btn-text text-xs p-0">Más información</a>
            </p>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <a href="#" className="google-btn-text text-sm font-medium">
                Crear cuenta
              </a>
              <button
                onClick={handleEmailNext}
                className="google-btn-blue"
              >
                Siguiente
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Google Logo */}
            <div className="flex justify-center mb-4">
              <GoogleLogo size={75} />
            </div>

            <h1 className="text-2xl font-normal text-center text-card-foreground mb-2">
              Te damos la bienvenida
            </h1>

            {/* Email chip */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setStep("email")}
                className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
                </svg>
                {email}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            {/* Password Input */}
            <div className="mb-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="google-input pr-12"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handlePasswordNext)}
                autoFocus
              />
            </div>

            {/* Show password checkbox */}
            <label className="flex items-center gap-3 mt-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-[18px] h-[18px] accent-[hsl(var(--google-blue))] cursor-pointer"
              />
              <span className="text-sm text-card-foreground">Mostrar contraseña</span>
            </label>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <a href="#" className="google-btn-text text-sm font-medium">
                ¿Has olvidado la contraseña?
              </a>
              <button
                onClick={handlePasswordNext}
                className="google-btn-blue"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
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
