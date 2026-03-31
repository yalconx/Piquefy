import LandingTemplate from "../components/LandingTemplate";
export default function ProdePage() {
  return (
    <LandingTemplate
      metaTitle="Prode online gratis entre amigos | Piquefy — Sin registro"
      metaDesc="Armá tu prode online con los pibes en segundos. Sin registro, sin plata real. Compartí por WhatsApp, seguí el ranking en vivo y calculá quién ganó. El mejor prode online de Argentina y Uruguay."
      metaKeywords="prode online, hacer prode online amigos, prode gratis, prode whatsapp, prode mundial, prode champions, app para prode, armar prode online Argentina"
      canonical="/prode"
      badge="🇦🇷 🇺🇾 El prode online de Argentina y Uruguay"
      heroTitle="Armá tu prode online"
      heroAccent="con los pibes"
      tagline="Piquefy: la app para armar el prode del mundial, la Champions o lo que se te ocurra."
      subtitle="Sin descargas, sin registro, sin drama. Compartí el código por WhatsApp, cada uno elige su opción y el ranking se actualiza solo. Al final, Piquefy calcula quién le debe a quién."
      localName="prode"
      features={[
        { icon: "⚡", title: "Prode listo en 60 segundos", text: "Definís las opciones, fijás cuándo cierra y compartís. Así de simple." },
        { icon: "📊", title: "Ranking en tiempo real", text: "Ves en vivo quién apostó qué y cuánto hay en el bote acumulado." },
        { icon: "🏆", title: "Calcula el resultado", text: "Marcás el ganador y Piquefy calcula automáticamente quién le debe plata a quién." },
        { icon: "🌍", title: "Para el mundial y la Champions", text: "Perfecto para el prode del Mundial 2026, la Champions o la Liga Profesional." },
      ]}
      faqItems={[
        { q: "¿Cómo armar un prode online con amigos?", a: "Entrás a Piquefy, hacés clic en 'Crear prode', definís las opciones y la fecha de cierre. Compartís el código por WhatsApp. Los demás entran, ponen su nombre y apuestan. Cuando termina el partido marcás el resultado y Piquefy calcula todo." },
        { q: "¿El prode usa plata real?", a: "No. Piquefy usa importes ficticios. La app calcula los resultados pero la plata real la arreglan entre ustedes como quieran." },
        { q: "¿Sirve para el prode del mundial?", a: "Perfecto para el Mundial 2026. Podés hacer un prode por partido, por fase o del torneo completo. Sin límite de participantes." },
        { q: "¿Necesito instalar algo?", a: "Nada. Funciona desde el navegador del celular. Sin App Store, sin registro, sin contraseñas." },
      ]}
    />
  );
}
