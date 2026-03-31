import LandingTemplate from "../../components/LandingTemplate";
export default function ChampionsPage() {
  return (
    <LandingTemplate
      metaTitle="Porra Champions League entre amigos | Piquefy — Gratis y sin registro"
      metaDesc="Crea tu porra de la Champions League en segundos. ¿Quién gana el partido? ¿Quién pasa la eliminatoria? Sin registro, sin dinero real. Comparte por WhatsApp y que gane el más listo."
      metaKeywords="porra champions league amigos, porra champions gratis, apuesta champions whatsapp, quiniela champions league online, prode champions league, pique champions"
      canonical="/pique/champions-league"
      badge="⚽ Champions League"
      heroTitle="Porra de la Champions"
      heroAccent="League"
      tagline="¿Quién gana? Demuéstralo."
      subtitle="Crea tu pique de la Champions League en un minuto. ¿Quién pasa la eliminatoria? ¿Cuántos goles mete el delantero? Comparte por WhatsApp y sigue el ranking en directo."
      localName="porra Champions"
      features={[
        { icon: "⚽", title: "Para cada eliminatoria", text: "Crea un pique por partido, por ronda o para el ganador final. Sin límite." },
        { icon: "📊", title: "Ranking en directo", text: "Sigue en tiempo real quién va ganando mientras veis el partido." },
        { icon: "🏆", title: "Calcula el resultado", text: "Al final del partido, marca el ganador y Piquefy liquida las cuentas." },
        { icon: "📱", title: "Sin instalar nada", text: "Funciona desde el móvil al instante. Solo con el enlace de WhatsApp." },
      ]}
      faqItems={[
        { q: "¿Cómo hacer una porra de la Champions entre amigos?", a: "Entra en Piquefy, crea el pique con las opciones (ej: 'Real Madrid gana', 'Empate', 'Barcelona gana'), fija el cierre antes del partido y comparte el código. Cuando acabe, marca el resultado." },
        { q: "¿Puedo hacer una porra para toda la Champions?", a: "Sí. Puedes hacer un pique por partido o uno general para el ganador del torneo. Lo que prefieras." },
        { q: "¿Funciona para la fase de grupos y los octavos?", a: "Perfectamente. Crea un pique diferente para cada eliminatoria. Cada uno tiene su propio código y ranking." },
      ]}
    />
  );
}
