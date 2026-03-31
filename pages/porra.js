import LandingTemplate from "../components/LandingTemplate";
export default function PorraPage() {
  return (
    <LandingTemplate
      metaTitle="Porra online gratis entre amigos | Piquefy — Sin registro"
      metaDesc="Crea tu porra online en segundos. Sin registro, sin dinero real. Comparte por WhatsApp, sigue quién apuesta qué en directo y calcula el resultado. La porra entre amigos más fácil de España."
      metaKeywords="porra online, crear porra online amigos, porra online gratis, hacer porra whatsapp, porra fútbol amigos, porra online sin registro, porra España"
      canonical="/porra"
      badge="🇪🇸 La porra online de España"
      heroTitle="Crea tu porra online"
      heroAccent="en un minuto"
      tagline="No te quedes fuera. Monta tu porra y demuestra quién sabe más."
      subtitle="La herramienta de porras entre amigos más fácil de España. Sin descargas, sin registro, sin líos. Solo pega el enlace en el grupo de WhatsApp y que empiece el pique."
      localName="porra"
      features={[
        { icon: "⚡", title: "Porra lista en 60 segundos", text: "Define el título, las opciones y cuándo cierra. Comparte el código y listo." },
        { icon: "📊", title: "Ranking en directo", text: "Ve en tiempo real quién apuesta qué y cuánto hay en el bote." },
        { icon: "🏆", title: "Calcula el resultado", text: "Marca el ganador y Piquefy calcula automáticamente quién le debe qué a quién." },
        { icon: "📸", title: "Imagen viral del ganador", text: "El ganador recibe una imagen para compartir en Stories y presumir." },
      ]}
      faqItems={[
        { q: "¿Cómo hacer una porra online entre amigos?", a: "Entra en Piquefy, haz clic en 'Crear porra', define las opciones y la fecha de cierre. Comparte el código por WhatsApp. Tus amigos entran, ponen su nombre y apuestan. Cuando acaba el evento, marcas el resultado y la app calcula quién gana." },
        { q: "¿La porra online usa dinero real?", a: "No. Piquefy usa importes ficticios. La app calcula los resultados pero el dinero real lo gestionáis vosotros como queráis: Bizum, en mano o lo que prefiráis." },
        { q: "¿Cuántos pueden participar en la porra?", a: "Sin límite. Desde 2 amigos hasta grupos grandes. Cada uno apuesta desde su móvil sin instalar nada." },
        { q: "¿Puedo hacer una porra para el partido del domingo?", a: "Exacto. Crea la porra antes del partido, fija el cierre para la hora de inicio y comparte el código. Perfecto para el clásico, la Champions o cualquier partido." },
      ]}
    />
  );
}
