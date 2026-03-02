import { useState } from "react";
import { Check } from "lucide-react";

const AuditForm = () => {
  const [empresa, setEmpresa] = useState("");
  const [trabajadores, setTrabajadores] = useState("");
  const [cargo, setCargo] = useState("");
  const [protocolo, setProtocolo] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!empresa || !trabajadores || !cargo || !protocolo) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-[640px] mx-auto px-4">
        <div className="forms-card overflow-hidden">
          <div className="forms-card-header" />
          <div className="p-8 sm:p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-forms-purple flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-normal text-card-foreground mb-2">
              Respuesta registrada
            </h2>
            <p className="text-sm text-muted-foreground">
              Tu auditoría ha sido enviada correctamente al expediente SC-2026-882.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[640px] mx-auto px-4 space-y-3">
      {/* Title Card */}
      <div className="forms-card overflow-hidden">
        <div className="forms-card-header" />
        <div className="p-6">
          <h1 className="text-3xl font-normal text-card-foreground mb-1 font-roboto">
            Cuestionario de Auditoría
          </h1>
          <p className="text-sm text-muted-foreground">
            Expediente SC-2026-882 · SecureCheck
          </p>
          <div className="border-t mt-4 pt-3">
            <p className="text-sm text-destructive">* Indica que la pregunta es obligatoria</p>
          </div>
        </div>
      </div>

      {/* Question 1: Empresa */}
      <div className="forms-card">
        <div className="p-6">
          <label className="text-base text-card-foreground mb-4 block">
            Nombre de la empresa <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Tu respuesta"
            className="w-full border-b border-muted-foreground/30 focus:border-b-2 focus:border-forms-purple py-2 text-sm bg-transparent outline-none transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Question 2: Trabajadores */}
      <div className="forms-card">
        <div className="p-6">
          <label className="text-base text-card-foreground mb-4 block">
            Número de trabajadores <span className="text-destructive">*</span>
          </label>
          <div className="space-y-3">
            {["1-10", "11-50", "50+"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setTrabajadores(option)}
              >
                <div className={`forms-radio ${trabajadores === option ? "selected" : ""}`} />
                <span className="text-sm text-card-foreground">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Question 3: Cargo */}
      <div className="forms-card">
        <div className="p-6">
          <label className="text-base text-card-foreground mb-4 block">
            Cargo del responsable <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Tu respuesta"
            className="w-full border-b border-muted-foreground/30 focus:border-b-2 focus:border-forms-purple py-2 text-sm bg-transparent outline-none transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Question 4: Protocolo */}
      <div className="forms-card">
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

      {/* Submit */}
      <div className="flex items-center justify-between pt-1 pb-8">
        <button
          onClick={handleSubmit}
          className="forms-btn-submit"
          disabled={!empresa || !trabajadores || !cargo || !protocolo}
        >
          Enviar
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
