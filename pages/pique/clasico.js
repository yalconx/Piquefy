import LandingTemplate from "../../components/LandingTemplate";
export default function ClasicoPage() {
  return (
    <LandingTemplate
      metaTitle="Porra El Clásico Real Madrid vs Barcelona | Piquefy — Gratis"
      metaDesc="Crea tu porra del Clásico Real Madrid vs Barcelona en segundos. Sin registro, sin dinero real. Comparte por WhatsApp y que gane el más listo antes del partido."
      metaKeywords="porra el clasico real madrid barcelona, pique clasico amigos, apuesta real madrid barcelona whatsapp, quiniela clasico online gratis, porra derbi amigos"
      canonical="/pique/clasico"
      badge="🔥 El Clásico — Real Madrid vs Barça"
      heroTitle="Porra del"
      heroAccent="Clásico"
      tagline="El partido más grande. El pique más grande entre tus amigos."
      subtitle="Real Madrid vs Barcelona. El Clásico que para el mundo. Crea tu porra en un minuto, comparte el código y que cada uno defienda los colores de su equipo."
      localName="porra Clásico"
      features={[
        { icon: "⚽", title: "¿Quién gana el Clásico?", text: "Real Madrid, empate o Barça. El clásico de los piques entre madridistas y culés." },
        { icon: "🎯", title: "Opciones a medida", text: "Añade opciones como 'gana por más de 2 goles' o 'quién marca primero'." },
        { icon: "📊", title: "Tensión en directo", text: "El ranking cambia con cada gol. La emoción del partido y la porra a la vez." },
        { icon: "🏆", title: "El ganador lo celebra", text: "Imagen de victoria para presumir en Stories cuando tu equipo gane." },
      ]}
      faqItems={[
        { q: "¿Cómo hacer una porra del Clásico entre amigos?", a: "Entra en Piquefy, crea el pique con las opciones (Real Madrid gana, Empate, Barcelona gana), fija el cierre antes del pitido inicial y comparte el código por WhatsApp." },
        { q: "¿Puedo añadir opciones de goles o marcadores?", a: "Sí. Puedes añadir todas las opciones que quieras: quién marca primero, resultado exacto, número de goles... Lo que se te ocurra." },
        { q: "¿Funciona para otros derbis y partidos?", a: "Perfectamente. Úsalo para el derbi, la Champions, LaLiga o cualquier partido. Siempre el mismo motor." },
      ]}
    />
  );
}
