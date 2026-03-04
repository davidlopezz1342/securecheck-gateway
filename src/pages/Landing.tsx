import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Lock, Eye, ChevronDown, ArrowRight, Phone, Mail, MapPin, Check, Star, ShieldCheck, Users, Award, Clock, CreditCard, TrendingUp, Code, Bug, Search, Server, Fingerprint, Wifi, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Ventajas", href: "#ventajas" },
  { label: "Planes", href: "#formacion" },
  { label: "Proceso", href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-landing-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left hover:bg-landing-card-hover transition-colors">
        <span className="font-semibold text-landing-foreground pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-landing-gold shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 pb-6">
          <p className="text-landing-muted leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-landing-navy font-sans text-landing-foreground">
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-landing-navy/95 backdrop-blur-md border-b border-landing-border shadow-lg" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#inicio" className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-landing-gold" />
              <span className="text-xl font-bold text-landing-foreground">Secure<span className="text-landing-gold">Check</span></span>
            </a>
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-sm text-landing-muted hover:text-landing-gold transition-colors">{l.label}</a>
              ))}
            </div>
            <a href="#contacto" className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-lg bg-landing-gold text-landing-navy text-sm font-semibold hover:bg-landing-gold-hover transition-colors">Contactar</a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-landing-foreground">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-landing-navy/98 backdrop-blur-md border-b border-landing-border">
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-landing-muted hover:text-landing-gold rounded-lg hover:bg-landing-card transition-colors">{l.label}</a>
              ))}
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-semibold text-landing-navy bg-landing-gold rounded-lg text-center mt-2">Contactar</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-landing-navy via-landing-navy-light to-landing-navy" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-landing-gold/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-landing-gold/3 rounded-full blur-[100px]" />
          <div className="absolute top-[20%] left-[10%] animate-bounce opacity-20" style={{ animationDuration: "6s" }}>
            <Shield className="h-16 w-16 text-landing-gold" />
          </div>
          <div className="absolute top-[30%] right-[15%] animate-bounce opacity-15" style={{ animationDuration: "8s" }}>
            <Lock className="h-12 w-12 text-landing-gold" />
          </div>
          <div className="absolute bottom-[25%] left-[20%] animate-bounce opacity-10" style={{ animationDuration: "7s", animationDelay: "2s" }}>
            <Eye className="h-10 w-10 text-landing-gold" />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Protege tu empresa{" "}
              <span className="text-landing-gold font-serif italic">desde dentro</span>
            </h1>
            <p className="text-lg sm:text-xl text-landing-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Formación especializada en ciberseguridad para tus equipos. Capacita a tus trabajadores en hacking ético, protección digital y respuesta ante amenazas reales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#formacion" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-landing-gold text-landing-navy font-semibold text-base hover:bg-landing-gold-hover transition-all shadow-lg shadow-landing-gold/20">
                Ver Planes <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#nosotros" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-landing-border text-landing-foreground font-semibold text-base hover:bg-landing-card transition-colors">
                Conócenos
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-landing-muted">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-landing-border bg-landing-navy-light/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { target: 98, suffix: "%", label: "Satisfacción empresarial" },
            { target: 5000, suffix: "+", label: "Empleados formados" },
            { target: 15, suffix: "+", label: "Años de experiencia" },
            { target: 200, suffix: "+", label: "Empresas confían en nosotros" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-landing-gold mb-2">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </div>
              <p className="text-sm text-landing-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="nosotros" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-landing-gold text-sm font-semibold tracking-widest uppercase">Sobre Nosotros</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">Excelencia en Ciberseguridad Corporativa</h2>
            <p className="text-landing-muted mt-4 max-w-2xl mx-auto leading-relaxed">
              Desde 2009, SecureCheck forma a equipos de trabajo en ciberseguridad. Ayudamos a empresas a blindar su infraestructura capacitando a su activo más valioso: sus personas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Misión", desc: "Capacitar a los equipos de tu empresa en ciberseguridad, con programas actualizados que cubren las amenazas más recientes del panorama digital." },
              { icon: Eye, title: "Visión", desc: "Ser el partner de referencia en formación corporativa de ciberseguridad, reconocidos por transformar la cultura de seguridad de las organizaciones." },
              { icon: Users, title: "Equipo Experto", desc: "Formadores con amplia experiencia en pentesting, respuesta a incidentes y seguridad ofensiva. Profesionales en activo que conocen las amenazas reales." },
              { icon: Award, title: "Certificaciones", desc: "Formaciones alineadas con CEH, OSCP, CompTIA Security+ y CISSP. Tus empleados obtendrán credenciales reconocidas internacionalmente." },
            ].map(item => (
              <motion.div key={item.title} whileHover={{ y: -5 }} className="bg-landing-card border border-landing-border rounded-2xl p-8 hover:border-landing-gold/30 transition-all">
                <item.icon className="h-10 w-10 text-landing-gold mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-landing-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="ventajas" className="py-24 bg-landing-navy-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-landing-gold text-sm font-semibold tracking-widest uppercase">Por qué elegirnos</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">La diferencia SecureCheck</h2>
            <p className="text-landing-muted mt-4 max-w-2xl mx-auto">La mejor inversión para proteger tu empresa es formar a tu equipo. Te explicamos por qué somos la opción ideal.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Formación Práctica", desc: "Laboratorios con entornos simulados de ataque y defensa. Tus empleados aprenderán con escenarios realistas adaptados a tu sector." },
              { icon: Users, title: "Docentes Profesionales", desc: "Pentesters, analistas SOC y CISOs en activo con décadas de experiencia real impartiendo formación corporativa." },
              { icon: TrendingUp, title: "ROI Garantizado", desc: "Reduce el riesgo de brechas de seguridad hasta un 70%. La formación de tu equipo es la mejor inversión en ciberdefensa." },
              { icon: Clock, title: "Horarios Flexibles", desc: "Formación adaptada a la jornada laboral de tu empresa. Turnos de mañana y tarde para minimizar el impacto en la productividad." },
              { icon: CreditCard, title: "Financiación a Medida", desc: "Pagos fraccionados sin intereses. Descuentos por volumen para empresas con múltiples empleados a formar." },
              { icon: Award, title: "Resultados Probados", desc: "98% de satisfacción empresarial. Más de 200 empresas ya han confiado en nosotros para formar a sus equipos." },
            ].map(item => (
              <motion.div key={item.title} whileHover={{ y: -5 }} className="bg-landing-card border border-landing-border rounded-2xl p-8 hover:border-landing-gold/30 transition-all">
                <item.icon className="h-10 w-10 text-landing-gold mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-landing-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING / PLANES */}
      <section id="formacion" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-landing-gold text-sm font-semibold tracking-widest uppercase">Planes</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">Nuestros Programas</h2>
            <p className="text-landing-muted mt-4 max-w-2xl mx-auto">Planes formativos diseñados para capacitar a los equipos de tu empresa con la mayor garantía de éxito.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* BÁSICO */}
            <motion.div whileHover={{ y: -8 }} className="relative bg-landing-card border border-landing-border rounded-3xl p-8 flex flex-col">
              <span className="text-sm text-landing-muted font-medium">Plan Básico</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Fundamentos Cyber</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-bold text-landing-gold">1.000</span>
                <span className="text-landing-gold text-xl">€</span>
              </div>
              <p className="text-sm text-landing-muted mb-1">/ 60 horas</p>
              <p className="text-sm text-landing-muted mt-4 mb-8 leading-relaxed">
                Introduce a tus empleados en la ciberseguridad. Ideal para equipos técnicos que necesitan una base sólida en protección digital.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Fundamentos de redes y sistemas",
                  "Introducción al hacking ético",
                  "Seguridad en entornos web",
                  "Herramientas básicas (Nmap, Wireshark)",
                  "Material didáctico incluido",
                  "Informe de progreso por empleado",
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-landing-gold shrink-0 mt-0.5" />
                    <span className="text-landing-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="block text-center px-6 py-3 rounded-xl border border-landing-gold text-landing-gold font-semibold hover:bg-landing-gold hover:text-landing-navy transition-all">
                Solicitar Información
              </a>
            </motion.div>

            {/* ESTÁNDAR */}
            <motion.div whileHover={{ y: -8 }} className="relative bg-landing-card border border-landing-border rounded-3xl p-8 flex flex-col">
              <span className="text-sm text-landing-muted font-medium">Plan Estándar</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Analista de Ciberseguridad</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-bold text-landing-gold">4.500</span>
                <span className="text-landing-gold text-xl">€</span>
              </div>
              <p className="text-sm text-landing-muted mb-1">/ 180 horas</p>
              <p className="text-sm text-landing-muted mt-4 mb-8 leading-relaxed">
                Formación completa para que tu equipo domine el análisis de vulnerabilidades, la respuesta a incidentes y la auditoría de seguridad de tu organización.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Preparación certificación CompTIA Security+",
                  "Material didáctico incluido",
                  "Laboratorios prácticos de pentesting",
                  "Análisis de vulnerabilidades",
                  "Respuesta a incidentes de seguridad",
                  "Panel de seguimiento para la empresa",
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-landing-gold shrink-0 mt-0.5" />
                    <span className="text-landing-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="block text-center px-6 py-3 rounded-xl border border-landing-gold text-landing-gold font-semibold hover:bg-landing-gold hover:text-landing-navy transition-all">
                Solicitar Información
              </a>
            </motion.div>

            {/* PREMIUM */}
            <motion.div whileHover={{ y: -8 }} className="relative bg-gradient-to-b from-landing-gold/10 to-landing-card border-2 border-landing-gold/40 rounded-3xl p-8 flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-landing-gold text-landing-navy text-xs font-bold rounded-full">Más Popular</div>
              <span className="text-sm text-landing-muted font-medium mt-2">Plan Premium</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Pentester & Red Team</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-bold text-landing-gold">10.000</span>
                <span className="text-landing-gold text-xl">€</span>
              </div>
              <p className="text-sm text-landing-muted mb-1">/ 280 horas</p>
              <p className="text-sm text-landing-muted mt-4 mb-8 leading-relaxed">
                La formación más completa del mercado para tu empresa. Incluye doble certificación, mentorización personalizada y simulacros de ataque adaptados a tu infraestructura.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Todo lo incluido en el plan estándar",
                  "Soporte post-formación 12 meses",
                  "Certificación doble: CEH + OSCP",
                  "Mentorización personalizada 1 a 1",
                  "Red Team y técnicas avanzadas",
                  "Análisis forense digital",
                  "Simulacros de ataque a tu empresa",
                  "Informe ejecutivo de resultados",
                  "Consultoría de seguridad incluida",
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-landing-gold shrink-0 mt-0.5" />
                    <span className="text-landing-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="block text-center px-6 py-3 rounded-xl bg-landing-gold text-landing-navy font-semibold hover:bg-landing-gold-hover transition-all shadow-lg shadow-landing-gold/20">
                Solicitar Información
              </a>
              <p className="text-center text-xs text-landing-muted mt-4">Elegido por el 85% de nuestras empresas cliente</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="py-24 bg-landing-navy-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-landing-gold text-sm font-semibold tracking-widest uppercase">Proceso</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">Así capacitamos a tu equipo</h2>
            <p className="text-landing-muted mt-4 max-w-2xl mx-auto">En solo 4 pasos tus empleados estarán preparados para proteger tu empresa frente a ciberamenazas.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Solicita Información", desc: "Contacta con nosotros y recibe asesoramiento gratuito. Analizamos las necesidades de ciberseguridad de tu empresa y te recomendamos el plan ideal." },
              { step: "02", title: "Plan Personalizado", desc: "Diseñamos un programa adaptado al tamaño de tu empresa, sector y nivel técnico de tus empleados. Horarios a tu medida." },
              { step: "03", title: "Formación del Equipo", desc: "Tus empleados acceden a formación con profesionales en activo, laboratorios de hacking y material didáctico actualizado." },
              { step: "04", title: "Certificación y Resultados", desc: "Tu equipo obtiene certificaciones reconocidas y tu empresa recibe un informe completo de capacidades adquiridas y recomendaciones." },
            ].map(item => (
              <motion.div key={item.step} whileHover={{ y: -5 }} className="relative bg-landing-card border border-landing-border rounded-2xl p-8 hover:border-landing-gold/30 transition-all">
                <span className="text-5xl font-bold text-landing-gold/20">{item.step}</span>
                <h3 className="text-xl font-bold mt-4 mb-3">{item.title}</h3>
                <p className="text-landing-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonios" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-landing-gold text-sm font-semibold tracking-widest uppercase">Testimonios</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">Lo que dicen nuestros clientes</h2>
            <p className="text-landing-muted mt-4">Más de 200 empresas ya han confiado en nosotros para formar a sus equipos.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { text: "SecureCheck formó a todo nuestro departamento IT en ciberseguridad. Desde entonces, hemos reducido los incidentes de seguridad un 80%. Una inversión que se paga sola.", name: "Carlos Martínez", role: "CTO — TechSolutions S.L." },
              { text: "Buscábamos una formación práctica y adaptada a nuestro sector industrial. SecureCheck diseñó un programa a medida que superó todas nuestras expectativas.", name: "María López", role: "Directora de IT — Logística Ibérica" },
              { text: "El equipo docente es excepcional. Nuestros empleados no solo obtuvieron certificaciones, sino que ahora detectan y responden a amenazas de forma proactiva.", name: "Javier Ruiz", role: "CEO — DataGuard Consulting" },
              { text: "La doble certificación del plan Premium nos ha posicionado como empresa referente en seguridad dentro de nuestro sector. Totalmente recomendable.", name: "Ana Fernández", role: "CISO — Grupo Financiero Norte" },
            ].map((t, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-landing-card border border-landing-border rounded-2xl p-8 hover:border-landing-gold/30 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-landing-gold text-landing-gold" />)}
                </div>
                <p className="text-landing-muted leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-landing-gold/20 flex items-center justify-center text-landing-gold font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-landing-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-landing-gold/10 via-landing-navy to-landing-gold/10 border-y border-landing-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-landing-gold text-sm font-semibold tracking-widest uppercase mb-4">Plazas limitadas — Próxima convocatoria abierta</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Protege tu empresa<br />formando a tu equipo</h2>
          <p className="text-landing-muted mb-10 max-w-xl mx-auto">No dejes pasar esta oportunidad. Únete a las más de 200 empresas que ya han reforzado su ciberseguridad con nosotros.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contacto" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-landing-gold text-landing-navy font-semibold hover:bg-landing-gold-hover transition-all shadow-lg shadow-landing-gold/20">
              Solicitar presupuesto <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#formacion" className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-landing-border text-landing-foreground font-semibold hover:bg-landing-card transition-colors">
              Ver planes
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-landing-muted">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-landing-gold" /> Certificaciones internacionales</span>
            <span className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-landing-gold" /> Financiación sin intereses</span>
            <span className="flex items-center gap-2"><Award className="h-4 w-4 text-landing-gold" /> 98% satisfacción empresarial</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-landing-gold text-sm font-semibold tracking-widest uppercase">FAQ</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">Preguntas frecuentes</h2>
            <p className="text-landing-muted mt-4">Resolvemos tus dudas más habituales sobre nuestra formación corporativa.</p>
          </div>
          <div className="space-y-4">
            <FAQItem question="¿La formación se adapta a mi empresa?" answer="Sí, diseñamos programas personalizados según el tamaño de tu empresa, sector y nivel técnico de tus empleados. Podemos impartir la formación en vuestras instalaciones o en las nuestras." />
            <FAQItem question="¿Cuánto dura la formación?" answer="Depende del plan elegido: el Plan Básico son 60 horas, el Estándar 180 horas y el Premium 280 horas. Los horarios se adaptan a la jornada laboral de tu empresa." />
            <FAQItem question="¿Ofrecéis descuentos por volumen?" answer="Sí, ofrecemos descuentos para empresas que formen a múltiples empleados, así como financiación a medida sin intereses con pagos fraccionados." />
            <FAQItem question="¿Qué resultados puedo esperar?" answer="Nuestras empresas cliente reportan una reducción media del 70% en incidentes de seguridad. Además, recibirás informes detallados del progreso de cada empleado." />
            <FAQItem question="¿Mis empleados obtendrán certificaciones oficiales?" answer="Sí, dependiendo del plan, tus empleados podrán obtener certificaciones como CompTIA Security+, CEH u OSCP, reconocidas internacionalmente." />
            <FAQItem question="¿Las clases son presenciales u online?" answer="Ofrecemos modalidad presencial, semipresencial y también in-company (en vuestras oficinas). Los laboratorios prácticos se realizan con entornos de simulación avanzados." />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="py-24 bg-landing-navy-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-landing-gold text-sm font-semibold tracking-widest uppercase">Contacto</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">¿Tienes preguntas?</h2>
            <p className="text-landing-muted mt-4">Estamos aquí para ayudarte. Contáctanos y te enviaremos un presupuesto personalizado.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Teléfono", value: "+34 654 987 278", href: "tel:+34654987278" },
                { icon: Mail, label: "Email", value: "davidlopezz1342@gmail.com", href: "mailto:davidlopezz1342@gmail.com" },
                { icon: MapPin, label: "Dirección", value: "Calle Julio Burel 43, Linares, Jaén", href: "https://maps.google.com/?q=Calle+Julio+Burel+43+Linares+Jaen" },
              ].map(c => (
                <a key={c.label} href={c.href} className="flex items-start gap-4 p-4 rounded-xl bg-landing-card border border-landing-border hover:border-landing-gold/30 transition-all group">
                  <c.icon className="h-6 w-6 text-landing-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{c.label}</p>
                    <p className="text-sm text-landing-muted group-hover:text-landing-gold transition-colors">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Nombre de la empresa *" className="w-full px-4 py-3 rounded-xl bg-landing-card border border-landing-border text-landing-foreground placeholder:text-landing-muted/50 focus:border-landing-gold focus:outline-none transition-colors" />
              <input type="text" placeholder="Persona de contacto *" className="w-full px-4 py-3 rounded-xl bg-landing-card border border-landing-border text-landing-foreground placeholder:text-landing-muted/50 focus:border-landing-gold focus:outline-none transition-colors" />
              <input type="tel" placeholder="Teléfono *" className="w-full px-4 py-3 rounded-xl bg-landing-card border border-landing-border text-landing-foreground placeholder:text-landing-muted/50 focus:border-landing-gold focus:outline-none transition-colors" />
              <input type="email" placeholder="Email corporativo *" className="w-full px-4 py-3 rounded-xl bg-landing-card border border-landing-border text-landing-foreground placeholder:text-landing-muted/50 focus:border-landing-gold focus:outline-none transition-colors" />
              <select className="w-full px-4 py-3 rounded-xl bg-landing-card border border-landing-border text-landing-muted focus:border-landing-gold focus:outline-none transition-colors">
                <option>Seleccionar plan...</option>
                <option>Fundamentos Cyber (Básico — 1.000€)</option>
                <option>Analista de Ciberseguridad (Estándar — 4.500€)</option>
                <option>Pentester & Red Team (Premium — 10.000€)</option>
              </select>
              <textarea placeholder="Nº de empleados a formar y comentarios" rows={4} className="w-full px-4 py-3 rounded-xl bg-landing-card border border-landing-border text-landing-foreground placeholder:text-landing-muted/50 focus:border-landing-gold focus:outline-none transition-colors resize-none" />
              <button type="submit" className="w-full py-4 rounded-xl bg-landing-gold text-landing-navy font-semibold hover:bg-landing-gold-hover transition-all shadow-lg shadow-landing-gold/20">
                Solicitar presupuesto
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-landing-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-landing-gold" />
              <span className="text-lg font-bold">Secure<span className="text-landing-gold">Check</span></span>
            </div>
            <p className="text-sm text-landing-muted">© 2025 SecureCheck. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-sm text-landing-muted">
              <a href="#" className="hover:text-landing-gold transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-landing-gold transition-colors">Aviso Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
