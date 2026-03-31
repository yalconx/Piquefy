import LandingTemplate from "../../components/LandingTemplate";
export default function SocialPage() {
  return (
    <LandingTemplate
      metaTitle="Piques y apuestas entre amigos para cualquier momento | Piquefy"
      metaDesc="¿Es niño o niña? ¿Quién llega tarde? ¿Cuándo nace el bebé? Crea un pique online para cualquier momento de tu vida. Sin registro, sin dinero real. Comparte por WhatsApp al instante."
      metaKeywords="pique online amigos, apuesta bebe niño niña, porra cotidiana amigos, pique gracioso whatsapp, apuesta divertida amigos, reto entre amigos online, pique cumpleaños, apuesta trabajo amigos, porra baby shower, pique pareja, adivina cuando nace el bebe"
      canonical="/pique/social"
      badge="🎉 Para cualquier momento"
      heroTitle="Piques para"
      heroAccent="cualquier momento"
      tagline="No hace falta un partido. Cualquier situación es un pique."
      subtitle="¿Es niño o niña? ¿Quién llega primero? ¿Cuándo nace el bebé? Crea tu pique en segundos, comparte por WhatsApp y que cada uno defienda su predicción."
      localName="pique"
      features={[
        { icon: "👶", title: "¿Niño o niña?", text: "El pique más clásico del baby shower. Cada uno apuesta por su predicción y el bote va creciendo hasta el día del parto." },
        { icon: "⏰", title: "¿Cuándo nace el bebé?", text: "Elige una fecha y hora. Quien más se acerque gana el bote. Perfecto para los últimos días del embarazo." },
        { icon: "🎂", title: "Piques de cumpleaños", text: "¿Cuántas velas apaga? ¿A qué hora llega el cumpleañero? ¿Quién llora primero? Cualquier excusa es buena." },
        { icon: "💼", title: "Piques de trabajo", text: "¿Quién llega tarde a la reunión? ¿Conseguimos el cliente? ¿Cuánto dura la presentación? El pique de oficina de toda la vida, digitalizado." },
        { icon: "📺", title: "Realities y series", text: "¿Quién sale esta semana? ¿Quién gana La Isla de las Tentaciones? ¿Cómo acaba la temporada? El pique perfecto para ver la tele en grupo." },
        { icon: "🎯", title: "Cualquier cosa", text: "¿Quién paga la cena? ¿A qué hora sale el vuelo con retraso? ¿Cuántos goles mete? Si se puede predecir, se puede piqueficar." },
      ]}
      faqItems={[
        { q: "¿Para qué tipo de eventos puedo crear un pique?", a: "Para cualquier cosa que tenga un resultado incierto: si el bebé es niño o niña, cuándo nace, quién gana un reality, quién llega tarde al plan, cuánto dura una reunión... Si se puede predecir, se puede piqueficar." },
        { q: "¿Cómo funciona el pique del bebé niño o niña?", a: "Crea el pique con dos opciones (Niño / Niña), fija el cierre para antes del parto y comparte el código en el grupo de WhatsApp o en el baby shower. Cuando nazca el bebé, el organizador marca el resultado y Piquefy calcula quién ganó." },
        { q: "¿Puedo hacer un pique para adivinar la fecha de nacimiento?", a: "Sí. Crea las opciones con fechas o rangos de fechas (ej: 'Antes del día 15', 'Entre el 15 y el 20', 'Después del 20'). Cada amigo elige su predicción y apuesta. El que más se acerque gana." },
        { q: "¿Funciona para grupos de WhatsApp?", a: "Perfectamente. Crea el pique, copia el enlace y pégalo en el grupo. Cada persona entra desde su móvil sin instalar nada ni registrarse." },
        { q: "¿Se usa dinero real?", a: "No. Los importes son ficticios. La app calcula quién gana y cuánto, pero el dinero real lo gestionáis entre vosotros como queráis." },
      ]}
    />
  );
}
