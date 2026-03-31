import LandingTemplate from "../../components/LandingTemplate";
export default function MundialPage() {
  return (
    <LandingTemplate
      metaTitle="Prode y porra del Mundial 2026 entre amigos | Piquefy — Gratis"
      metaDesc="Crea tu porra o prode del Mundial 2026 en segundos. ¿Quién gana? ¿Cuántos goles? Sin registro, sin dinero real. La herramienta de predicciones del Mundial más fácil para grupos de amigos."
      metaKeywords="porra mundial 2026, prode mundial 2026, quiniela mundial 2026, penca mundial 2026, apuesta mundial amigos, predicciones mundial fútbol, pique mundial whatsapp, mundial USA Canada Mexico"
      canonical="/pique/mundial-2026"
      badge="🏆 Mundial 2026 · USA · Canadá · México"
      heroTitle="Porra del Mundial"
      heroAccent="2026"
      tagline="El evento más grande del fútbol. El pique más grande entre tus amigos."
      subtitle="USA, Canadá y México acogen el Mundial 2026. Crea tu porra, prode o quiniela en un minuto y compite con tus amigos durante todo el torneo. Sin descargas ni registro."
      localName="porra Mundial"
      features={[
        { icon: "🏆", title: "Para todo el torneo", text: "Un pique para el campeón del mundo o uno por partido. Como prefieras." },
        { icon: "🌍", title: "España, Argentina, México...", text: "Funciona para grupos de cualquier país. Porra, prode, quiniela o penca." },
        { icon: "📊", title: "Ranking en directo", text: "Sigue quién va ganando durante todo el Mundial. La emoción dura un mes." },
        { icon: "🏅", title: "Imagen del ganador", text: "El que acierte el campeón recibe su imagen de victoria para compartir." },
      ]}
      faqItems={[
        { q: "¿Cómo hacer un prode del Mundial 2026?", a: "Entra en Piquefy, crea el pique con los países favoritos como opciones, fija el cierre antes del inicio del torneo y comparte el código. Cuando haya campeón, marcas el resultado y Piquefy calcula quién ganó." },
        { q: "¿Cuándo debería crear la porra del Mundial?", a: "Puedes crearla cuando se conozcan los grupos o directamente para el ganador. Lo ideal es antes del primer partido para que haya emoción durante todo el torneo." },
        { q: "¿Funciona para grupos grandes?", a: "Sin límite de participantes. Perfecta para grupos de familia, trabajo o amigos de todas partes." },
      ]}
    />
  );
}
