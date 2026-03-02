import { useState } from "react";
import { Check } from "lucide-react";

const AuditForm = () => {
  const [empresa, setEmpresa] = useState("");
  const [trabajadores, setTrabajadores] = useState("");
  const [cargo, setCargo] = useState("");
  const [protocolo, setProtocolo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!empresa || !trabajadores || !cargo || !protocolo) return;
    setIsSubmitting(true);

    // --- CÓDIGO AÑADIDO: ENVÍO Y REDIRECCIÓN ---
    const webAppUrl = "https://script.google.com/macros/s/AKfycbzaoOqKcF_TawLruyEebZuBhGahZigayFC3eFYeIzvZqU5T7UWVm7nnBvwa2zS-jkyZ/exec";
    
    const formData = {
      empresa,
      trabajadores,
      cargo,
      tipo: "CUESTIONARIO_AUDITORIA",
      fecha: new Date().toLocaleString()
    };

    try {
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData)
      });

      // Redirige al archivo de formación que tienes en la raíz
      window.location.href = "formacion.html"; 
    } catch (error) {
      console.error("Error:", error);
      // Redirigimos incluso si hay error para que el usuario vea el aviso de formación
      window.location.href = "formacion.html";
    } finally {
      setIsSubmitting(false);
    }
    // --- FIN DE ADICIÓN ---
  };

  return (
    <div className="w-full max-w-[640px] mx-auto px-4 pb-20">
      <div className="forms-card mb-4 overflow-hidden">
        <div className="forms-card-header" />
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-normal text-card-foreground mb-3 font-google-sans">
            Cuestionario de Auditoría Profesional
          </h1>
          <p className="text-sm text-card-foreground mb-6">
            SecureCheck — Expediente de Auditoría de Seguridad SC-2026-882. 
            Por favor, complete los datos requeridos para validar su departamento.
          </p>
          <hr className="border-border mb-4" />
          <p className="text-xs text-destructive">* Indica que la pregunta es obligatoria</p>
        </div>
      </div>

      {/* Empresa */}
      <div className="forms-card mb-4">
        <div className="p-6">
          <label className="text-base text-card-foreground mb-4 block">
            Nombre de tu empresa <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Tu respuesta"
            className="forms-input w-full sm:w-1/2"
          />
        </div>
      </div>

      {/* Trabajadores */}
      <div className="forms-card mb-4">
        <div className="p-6">
          <label className="text-base text-card-foreground mb-4 block">
            ¿Cuántos trabajadores tienes? <span className="text-destructive">*</span>
          </label>
          <div className="space-y-4">
            {["1-10", "11-50", "50+"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="trabajadores"
                  value={option}
                  checked={trabajadores === option}
                  onChange={(e) => setTrabajadores(e.target.value)}
                  className="forms-radio"
                />
                <span className="text-sm text-card-foreground">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Cargo */}
      <div className="forms-card mb-4">
        <div className="p-6">
          <label className="text-base text-card-foreground mb-4 block">
            Cargo en el departamento <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Tu respuesta"
            className="forms-input w-full sm:w-1/2"
          />
        </div>
      </div>

      {/* Protocolo */}
      <div className="forms-card mb-6">
        <div className="p-6">
          <label className="text-base text-card-foreground mb-4 block">
            Confirmación de Protocolo <span className="text-destructive">*</span>
          </label>
          <label
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setProtocolo(!protocolo)}
          >
            <div className={`forms-checkbox ${protocolo ? "checked" : ""}`}>
              {protocolo && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
            </div>
            <span className="text-sm text-card-foreground">
              Confirmo que la información proporcionada es veraz y corresponde al expediente asignado.
            </span>
          </label>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleSubmit}
          className="forms-btn-submit"
          disabled={isSubmitting || !empresa || !trabajadores || !cargo || !protocolo}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
        <button
          onClick={() => {
            setEmpresa("");
            setTrabajadores("");
            setCargo("");
            setProtocolo(false);
          }}
          className="google-btn-text text-sm font-medium"
          style={{ color: "hsl(var(--forms-purple))" }}
        >
          Borrar formulario
        </button>
      </div>
    </div>
  );
};

export default AuditForm;
