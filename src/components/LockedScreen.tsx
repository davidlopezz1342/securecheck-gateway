import GoogleLogo from "./GoogleLogo";

interface LockedScreenProps {
  onContinue: () => void;
}

const LockedScreen = ({ onContinue }: LockedScreenProps) => {
  return (
    <div className="w-full max-w-[600px] mx-auto px-4">
      <div className="forms-card overflow-hidden">
        <div className="forms-card-header" />
        <div className="p-8 sm:p-12 text-center">
          {/* Shield icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                  fill="hsl(var(--forms-purple))"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-normal text-card-foreground mb-2 font-roboto">
            Auditoría de Seguridad
          </h1>
          <h2 className="text-base font-normal text-primary mb-6 font-roboto">
            SecureCheck — Entorno de Entrenamiento
          </h2>
          
          <div className="bg-muted rounded-lg p-4 mb-8 inline-block">
            <p className="text-sm text-muted-foreground font-medium">
              Validación requerida para el expediente{" "}
              <span className="font-mono font-bold text-card-foreground">SC-2026-882</span>
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Para acceder al cuestionario de auditoría, es necesario verificar tu identidad mediante tu cuenta corporativa.
          </p>

          {/* Google Sign-in Button */}
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-3 px-6 py-3 bg-card border rounded-md shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium text-card-foreground group"
          >
            <GoogleLogo size={20} />
            <span>Continuar con Google</span>
          </button>

          <p className="text-xs text-muted-foreground mt-6 opacity-70">
            Solo se admiten cuentas corporativas autorizadas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockedScreen;
