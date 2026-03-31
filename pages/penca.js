import LandingTemplate from "../components/LandingTemplate";
export default function PencaPage() {
  return (
    <LandingTemplate
      metaTitle="Penca online gratis entre amigos | Piquefy — Sin registro"
      metaDesc="Armá tu penca online con los amigos en segundos. Sin registro, sin plata real. Compartí por WhatsApp y seguí el ranking en vivo. La mejor penca online de Uruguay y Paraguay."
      metaKeywords="penca online, penca fútbol amigos, armar penca online, penca gratis, penca whatsapp, penca mundial Uruguay Paraguay, app penca amigos"
      canonical="/penca"
      badge="🇺🇾 🇵🇾 La penca online de Uruguay y Paraguay"
      heroTitle="Armá tu penca online"
      heroAccent="sin complicaciones"
      tagline="Piquefy: la app para armar la penca del mundial, la Champions o lo que se te ocurra."
      subtitle="Sin descargas, sin registro. Compartí el código por WhatsApp, cada uno elige y el ranking se actualiza solo. Al final Piquefy calcula quién le debe a quién."
      localName="penca"
      features={[
        { icon: "⚡", title: "Penca lista en 60 segundos", text: "Definís las opciones, fijás cuándo cierra y compartís el código." },
        { icon: "📊", title: "Ranking en tiempo real", text: "Ves en vivo quién apostó qué y cuánto hay en el bote." },
        { icon: "🏆", title: "Calcula el resultado", text: "Marcás el ganador y Piquefy calcula quién le debe a quién." },
        { icon: "⚽", title: "Para el Mundial 2026", text: "Perfecta para la penca del Mundial, la Copa América o la Champions." },
      ]}
      faqItems={[
        { q: "¿Cómo armar una penca online con amigos?", a: "Entrás a Piquefy, hacés clic en 'Crear penca', definís las opciones y la fecha de cierre. Compartís el código por WhatsApp. Los demás entran, ponen su nombre y apuestan. Al final marcás el resultado y Piquefy calcula todo." },
        { q: "¿La penca usa plata real?", a: "No. Piquefy usa importes ficticios. El dinero real lo arreglan entre ustedes." },
        { q: "¿Sirve para la penca del mundial?", a: "Sí, perfecta para el Mundial 2026. Sin límite de participantes." },
        { q: "¿Necesito instalar algo?", a: "Nada. Funciona desde el navegador del celular. Sin App Store, sin registro." },
      ]}
    />
  );
}
