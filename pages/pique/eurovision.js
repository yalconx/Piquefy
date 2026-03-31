import LandingTemplate from "../../components/LandingTemplate";
export default function EurovisionPage() {
  return (
    <LandingTemplate
      metaTitle="Porra Eurovisión 2026 entre amigos | Piquefy — Gratis"
      metaDesc="Crea tu porra de Eurovisión 2026 en segundos. ¿Quién gana el festival? Sin registro, sin dinero real. Comparte por WhatsApp, vota en directo y que gane el que más sabe de Eurovisión."
      metaKeywords="porra eurovisión 2026, quiniela eurovisión amigos, apuesta eurovisión online, pique eurovisión whatsapp, predicciones eurovisión, porra festival eurovisión gratis"
      canonical="/pique/eurovisión"
      badge="🎤 Eurovisión 2026"
      heroTitle="Porra de Eurovisión"
      heroAccent="2026"
      tagline="¿Quién gana el festival? Que cada uno defienda su favorito."
      subtitle="La fiesta de Eurovisión mola más con pique entre amigos. Crea tu porra en un minuto, comparte el código y seguid los resultados en directo desde el sofá."
      localName="porra Eurovisión"
      features={[
        { icon: "🎤", title: "Un pique por país", text: "Cada uno elige su favorito para ganar. El ranking cambia con cada votación." },
        { icon: "📊", title: "Resultados en directo", text: "Seguís la gala y el ranking de la porra a la vez, desde el móvil." },
        { icon: "🏆", title: "El ganador se lleva el bote", text: "Cuando se anuncia el ganador, Piquefy calcula el resultado al instante." },
        { icon: "📸", title: "Imagen para compartir", text: "El ganador de la porra recibe su imagen de victoria para Stories." },
      ]}
      faqItems={[
        { q: "¿Cómo hacer una porra de Eurovisión entre amigos?", a: "Crea el pique en Piquefy con los países participantes como opciones. Fija el cierre para antes de que empiece la gala. Comparte el código y cada amigo elige su favorito para ganar." },
        { q: "¿Cuándo debería crear la porra de Eurovisión?", a: "Lo ideal es crearla en los días previos a la final, cuando ya se conocen todos los países finalistas. Así tienes tiempo de que se apunte todo el mundo." },
        { q: "¿Puedo hacer una porra también para las semifinales?", a: "Sí. Puedes crear un pique diferente para cada semifinal. Cada uno tiene su propio código." },
      ]}
    />
  );
}
