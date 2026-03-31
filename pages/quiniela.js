import LandingTemplate from "../components/LandingTemplate";
export default function QuinielaPage() {
  return (
    <LandingTemplate
      metaTitle="Quiniela online gratis entre amigos | Piquefy — Sin registro"
      metaDesc="Organiza tu quiniela de fútbol entre amigos en segundos. Sin registro, sin dinero real. Comparte por WhatsApp, sigue el ranking en vivo y calcula quién ganó. La quiniela online más fácil de México y Colombia."
      metaKeywords="quiniela online, quiniela de fútbol amigos, organizar quiniela online, quiniela gratis, quiniela whatsapp, quiniela liga mx, quiniela mundial, app quiniela amigos México Colombia"
      canonical="/quiniela"
      badge="🇲🇽 🇨🇴 La quiniela online de México y Colombia"
      heroTitle="Organiza tu quiniela"
      heroAccent="con los cuates"
      tagline="Piquefy: la app para armar la quiniela de la Liga MX, el Mundial o lo que quieras."
      subtitle="Sin descargas, sin registro, sin complicaciones. Comparte el código por WhatsApp, cada quien elige su opción y el ranking se actualiza solo. Al final, Piquefy calcula quién le debe a quién."
      localName="quiniela"
      features={[
        { icon: "⚡", title: "Quiniela lista en 60 segundos", text: "Defines las opciones, fijas cuándo cierra y compartes el enlace." },
        { icon: "📊", title: "Ranking en tiempo real", text: "Ves en vivo quién apostó qué y cuánto hay acumulado en el bote." },
        { icon: "🏆", title: "Calcula el resultado", text: "Marcas al ganador y Piquefy calcula automáticamente quién le debe a quién." },
        { icon: "⚽", title: "Para la Liga MX y el Mundial", text: "Perfecta para la quiniela del Mundial 2026, la Liga MX o la Champions." },
      ]}
      faqItems={[
        { q: "¿Cómo organizar una quiniela online con amigos?", a: "Entras a Piquefy, clic en 'Crear quiniela', defines las opciones y la fecha de cierre. Compartes el código por WhatsApp. Cada quien entra, pone su nombre y apuesta. Al terminar marcas el resultado y Piquefy calcula todo." },
        { q: "¿La quiniela usa dinero real?", a: "No. Piquefy usa importes ficticios. La app calcula los resultados pero el dinero real lo arreglan entre ustedes como prefieran." },
        { q: "¿Sirve para la quiniela del Mundial 2026?", a: "Perfecto. Puedes hacer una quiniela por partido, por fase o del torneo completo. Sin límite de participantes." },
        { q: "¿Necesito instalar algo?", a: "Nada. Funciona desde el navegador del celular. Sin App Store, sin registro." },
      ]}
    />
  );
}
