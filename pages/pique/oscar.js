import LandingTemplate from "../../components/LandingTemplate";
export default function OscarPage() {
  return (
    <LandingTemplate
      metaTitle="Porra de los Oscar entre amigos | Piquefy — Gratis y sin registro"
      metaDesc="Crea tu porra de los Premios Oscar en segundos. ¿Mejor película? ¿Mejor director? Sin registro, sin dinero real. Comparte por WhatsApp y seguid la gala con pique."
      metaKeywords="porra oscar amigos, predicciones oscar online, quiniela premios oscar, pique oscar 2026, apuesta oscar gratis, porra premios cine amigos"
      canonical="/pique/oscar"
      badge="🎬 Premios Oscar"
      heroTitle="Porra de los"
      heroAccent="Premios Oscar"
      tagline="¿Quién gana el Oscar? Que cada uno defienda su favorito."
      subtitle="La gala de los Oscar mola más con pique. Crea una porra para cada categoría, comparte el código y seguid los resultados en directo desde el sofá."
      localName="porra Oscar"
      features={[
        { icon: "🎬", title: "Una porra por categoría", text: "Mejor película, mejor director, mejor actriz... Un pique diferente para cada uno." },
        { icon: "📊", title: "Resultados en vivo", text: "Seguid la gala y el ranking de la porra a la vez." },
        { icon: "🏆", title: "El cinéfilo gana", text: "Piquefy calcula automáticamente quién acertó más cuando acaba la gala." },
        { icon: "📱", title: "Sin instalar nada", text: "Funciona desde el móvil. Solo con el enlace de WhatsApp." },
      ]}
      faqItems={[
        { q: "¿Cómo hacer una porra de los Oscar entre amigos?", a: "Crea el pique en Piquefy con las películas o directores nominados como opciones. Fija el cierre antes de que empiece la gala. Comparte el código y cada amigo elige su favorito." },
        { q: "¿Puedo hacer una porra para varias categorías?", a: "Sí. Crea un pique diferente para cada categoría. Cada uno tiene su propio código." },
        { q: "¿Funciona para otros premios de cine?", a: "Perfectamente. Úsalo para los BAFTA, los Goya, los Globos de Oro o cualquier entrega de premios." },
      ]}
    />
  );
}
