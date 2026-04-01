import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ref, get } from "firebase/database";
import { db } from "../lib/firebase";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cómo creo mi primera porra?", "acceptedAnswer": { "@type": "Answer", "text": "Entra, ponle nombre a la porra, añade las opciones y fija cuándo cierra. Comparte el código por WhatsApp y listo. Cuando acabe, marcas el resultado y Piquefy hace las cuentas." }},
    { "@type": "Question", "name": "¿Piquefy maneja mi dinero?", "acceptedAnswer": { "@type": "Answer", "text": "No. Piquefy no toca un euro. Calculamos quién gana y cuánto, pero el dinero lo movéis vosotros como queráis — Bizum, en mano, lo que os apetezca." }},
    { "@type": "Question", "name": "¿Funciona para prodes, quinielas y pencas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Piquefy funciona para porras en España, prodes en Argentina, quinielas en México y pencas en Uruguay. El mismo motor, el nombre de tu país." }},
    { "@type": "Question", "name": "¿Necesito instalar algo?", "acceptedAnswer": { "@type": "Answer", "text": "Nada. Piquefy funciona desde el navegador de cualquier móvil u ordenador. Sin descargas, sin cuentas, sin contraseñas." }},
    { "@type": "Question", "name": "¿Sirve para apostar si el bebé es niño o niña?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Crea el pique con las opciones 'Niño' y 'Niña', fija el cierre para antes del parto y comparte el enlace en el grupo. Cuando nazca, el organizador marca el resultado y Piquefy calcula quién ganó." }},
    { "@type": "Question", "name": "¿Cuántas personas pueden participar?", "acceptedAnswer": { "@type": "Answer", "text": "Sin límite. Desde 2 amigos hasta grupos grandes de familia, trabajo o compañeros. Cada uno entra desde su móvil sin instalar nada." }},
  ]
};

const CARRUSEL_ITEMS = [
  { title: "¿Quién gana el Balón de Oro?", participants: 12, time: "hace 3 min" },
  { title: "¿Cuántos goles mete el Madrid esta temporada?", participants: 8, time: "hace 7 min" },
  { title: "¿Sale Laura del reality esta semana?", participants: 23, time: "hace 12 min" },
  { title: "¿Niño o niña? El bebé de Ana y Marcos", participants: 31, time: "hace 18 min" },
  { title: "¿Quién gana Eurovisión 2026?", participants: 15, time: "hace 25 min" },
  { title: "¿Llegamos al objetivo de ventas este mes?", participants: 9, time: "hace 31 min" },
  { title: "¿Cuándo nace el bebé? Apuesta por la fecha", participants: 19, time: "hace 38 min" },
  { title: "El Clásico — ¿quién gana este domingo?", participants: 44, time: "hace 45 min" },
  { title: "¿Quién paga la cena de Navidad?", participants: 7, time: "hace 52 min" },
  { title: "Final Champions 2026 — pon tu pique", participants: 28, time: "hace 1 h" },
  { title: "¿Cuántos capítulos tiene la última temporada?", participants: 6, time: "hace 1 h" },
  { title: "¿Quién llega tarde a la reunión del lunes?", participants: 11, time: "hace 1 h" },
  { title: "Oscar 2026 — ¿mejor película?", participants: 17, time: "hace 2 h" },
  { title: "¿Con qué equipo termina primero la Liga?", participants: 33, time: "hace 2 h" },
  { title: "¿Sale antes del trabajo Carlos o Marta?", participants: 5, time: "hace 3 h" },
];

function OrganizerModal({ onClose }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    const roomCode = code.trim().toUpperCase();
    if (roomCode.length < 3) { setError("Introduce el código de la porra"); return; }
    if (pin.length !== 6) { setError("El PIN tiene 6 dígitos"); return; }
    setLoading(true);
    const snap = await get(ref(db, `porras/${roomCode}`));
    if (!snap.exists()) { setError("Porra no encontrada"); setLoading(false); return; }
    const data = snap.val();
    if (data.adminPin === pin) {
      if (typeof window !== "undefined") sessionStorage.setItem(`porra_admin_${roomCode}`, data.adminToken);
      router.push(`/porra/${roomCode}?admin=${data.adminToken}`);
    } else {
      setError("PIN incorrecto");
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <div className={styles.modalIcon}>👑</div>
        <h2 className={styles.modalTitle}>Soy el organizador</h2>
        <p className={styles.modalDesc}>Introduce el código de la porra y tu PIN para recuperar el acceso desde cualquier dispositivo</p>
        <div className={styles.modalField}>
          <label>Código de la porra</label>
          <input
            placeholder="XXXXX" maxLength={5} value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
            style={{textAlign:"center",letterSpacing:"0.2em",fontFamily:"'Unbounded',cursive",fontSize:"1.1rem"}}
          />
        </div>
        <div className={styles.modalField}>
          <label>PIN de organizador (6 dígitos)</label>
          <input
            placeholder="000000" maxLength={6} value={pin}
            onChange={e => { setPin(e.target.value.replace(/\D/g,"")); setError(""); }}
            onKeyDown={e => e.key === "Enter" && verify()}
            style={{textAlign:"center",letterSpacing:"0.3em",fontFamily:"'Unbounded',cursive",fontSize:"1.3rem"}}
          />
        </div>
        {error && <p className={styles.modalError}>{error}</p>}
        <button className={styles.modalBtn} onClick={verify} disabled={loading}>
          {loading ? "Verificando..." : "Acceder como organizador →"}
        </button>
      </div>
    </div>
  );
}

// Carrusel with JS scroll for reliability
function Carrusel() {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.5; // px per frame

    const step = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const items = [...CARRUSEL_ITEMS, ...CARRUSEL_ITEMS];

  return (
    <div
      className={styles.carruselTrack}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div ref={trackRef} className={styles.carruselInner}>
        {items.map((item, i) => (
          <div key={i} className={styles.carruselCard}>
            <div className={styles.carruselTitle}>{item.title}</div>
            <div className={styles.carruselMeta}>
              <span>👥 {item.participants} apostando</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOrgModal, setShowOrgModal] = useState(false);

  const joinPorra = async () => {
    const code = joinCode.trim().toUpperCase();
    if (code.length < 3) { setError("Introduce el código del pique"); return; }
    setLoading(true); setError("");
    const snap = await get(ref(db, `porras/${code}`));
    if (!snap.exists()) { setError("Pique no encontrado. ¿Está bien el código?"); setLoading(false); return; }
    router.push(`/porra/${code}`);
  };

  return (
    <>
      <Head>
        <title>Piquefy — Porras entre amigos, sin el lío de siempre | Gratis sin registro</title>
        <meta name="description" content="Crea tu porra, prode o quiniela en 60 segundos. Sin registro. Comparte por WhatsApp, sigue el bote en directo y que gane el mejor. Piquefy organiza los pagos sin que te preocupes de nada." />
        <meta name="keywords" content="pique online amigos, porra online gratis, prode online, quiniela amigos online, penca online, porra sin registro, pique entre amigos whatsapp, porra fútbol amigos, prode mundial 2026, porra champions, porra eurovisión, pique bebe niño niña, piquefy" />
        <meta property="og:title" content="Piquefy — Porras entre amigos, sin el lío de siempre" />
        <meta property="og:description" content="Crea tu porra en 60 segundos. Seguid el bote en tiempo real. Piquefy organiza los pagos para que no os preocupéis de nada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piquefy.com" />
        <link rel="canonical" href="https://piquefy.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      </Head>

      {showOrgModal && <OrganizerModal onClose={() => setShowOrgModal(false)} />}

      <div className={styles.page}>

        {/* ── HERO ── */}
        <header className={styles.hero}>
          <div className={styles.logoSmall}>
            <span className={styles.logoWhite}>Pique</span><span className={styles.logoFire}>fy</span>
          </div>

          <div className={styles.badge}>Gratis · Sin registro · Listo en 60 segundos</div>

          <h1 className={styles.headline}>
            <span className={styles.headlineMain}>Porras entre amigos,</span>
            <span className={styles.headlineAccent}>sin el lío de siempre</span>
          </h1>

          <p className={styles.subtitle}>
            Crea la tuya en 60 segundos, comparte por WhatsApp y seguid el bote en tiempo real.{" "}
            <strong>Piquefy organiza los pagos para que no os preocupéis de nada.</strong>
          </p>
        </header>

        {/* ── CTA ── */}
        <main className={styles.main}>
          <button className={styles.createCard} onClick={() => router.push("/crear")}>
            <div className={styles.createCardInner}>
              <span className={styles.createIcon}>🔥</span>
              <div>
                <div className={styles.createTitle}>Crear un pique</div>
                <div className={styles.createDesc}>Pon las opciones, fija las reglas y que empiece el pique. Todo el mundo apuesta.</div>
              </div>
              <span className={styles.createArrow}>→</span>
            </div>
          </button>

          <div className={styles.divider}>o entra con el código</div>

          <div className={styles.joinBox}>
            <input
              className={styles.codeInput}
              placeholder="CÓDIGO" maxLength={5}
              value={joinCode}
              onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError(""); }}
              onKeyDown={e => e.key === "Enter" && joinPorra()}
              autoComplete="off"
            />
            <button className={styles.joinBtn} onClick={joinPorra} disabled={loading}>
              {loading ? "..." : "Entrar"}
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.orgLink} onClick={() => setShowOrgModal(true)}>
            👑 ¿Eres el organizador? Accede con tu PIN
          </button>
        </main>

        {/* ── GEO & EVENTS ── */}
        <div className={styles.geoBar}>
          <span className={styles.geoLabel}>También conocido como:</span>
          <Link href="/prode" className={styles.geoLink}>🇦🇷 Prode</Link>
          <Link href="/quiniela" className={styles.geoLink}>🇲🇽 Quiniela</Link>
          <Link href="/penca" className={styles.geoLink}>🇺🇾 Penca</Link>
          <Link href="/porra" className={styles.geoLink}>🇪🇸 Porra</Link>
        </div>

        <div className={styles.eventsBar}>
          <span className={styles.eventsLabel}>Piques populares:</span>
          <div className={styles.eventLinks}>
            <Link href="/pique/champions-league" className={styles.eventChip}>⚽ Champions</Link>
            <Link href="/pique/eurovision" className={styles.eventChip}>🎤 Eurovisión</Link>
            <Link href="/pique/mundial-2026" className={styles.eventChip}>🏆 Mundial 2026</Link>
            <Link href="/pique/oscar" className={styles.eventChip}>🎬 Oscar</Link>
            <Link href="/pique/clasico" className={styles.eventChip}>🔥 El Clásico</Link>
            <Link href="/pique/social" className={styles.eventChip}>👶 Baby shower · Realities · Lo que sea</Link>
          </div>
        </div>

        {/* ── SEO SECTION ── */}
        <section className={styles.seoSection}>

          {/* How it works */}
          <div className={styles.seoBlock2col}>
            <div className={styles.seoBlockText}>
              <h2 className={styles.seoH2}>La herramienta de piques entre amigos más fácil de internet</h2>
              <p>Piquefy es una plataforma gratuita para crear porras, prodes, quinielas y piques de cualquier tipo entre amigos, sin registro. En menos de un minuto tienes tu pique listo para compartir por WhatsApp.</p>
              <p>No importa si eres de España y lo llamas porra, de Argentina y lo llamas prode, de México y lo llamas quiniela, o de Uruguay y lo llamas penca. Piquefy entiende tu idioma y funciona igual para todos.</p>
            </div>
            <div className={styles.seoSteps}>
              {[
                { n: "1", t: "Crea el pique", d: "Dale un título, añade las opciones y fija cuándo cierra" },
                { n: "2", t: "Comparte el código", d: "Por WhatsApp, por enlace o como quieras" },
                { n: "3", t: "Todo el mundo apuesta", d: "Cada uno entra desde su móvil sin instalar nada" },
                { n: "4", t: "Piquefy hace las cuentas", d: "Calcula quién le pasa pasta a quién. Vosotros solo pagáis." },
              ].map((s, i) => (
                <div key={i} className={styles.seoStep}>
                  <span className={styles.seoStepN}>{s.n}</span>
                  <div>
                    <div className={styles.seoStepT}>{s.t}</div>
                    <div className={styles.seoStepD}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel — BELOW the explainer block */}
          <div className={styles.carruselSection}>
            <p className={styles.carruselLabel}>🔴 Piques activos ahora mismo</p>
            <Carrusel />
          </div>

          {/* Payments explainer */}
          <div className={styles.paymentsBlock}>
            <h2 className={styles.paymentsTitle}>¿Quién le debe a quién? Piquefy lo sabe.</h2>
            <p className={styles.paymentsSubtitle}>El momento más incómodo de cualquier porra, resuelto.</p>
            <div className={styles.paymentsSteps}>
              {[
                { icon: "💸", t: "Cada uno apuesta su cantidad", d: "Tú fijas el mínimo y el máximo. Ellos eligen cuánto se juegan." },
                { icon: "🏆", t: "Se declara el resultado", d: "El organizador marca quién ha ganado cuando acaba el evento." },
                { icon: "🧮", t: "Piquefy calcula los reembolsos", d: "La app dice exactamente quién le pasa pasta a quién y cuánto. Sin capturas, sin calculadoras, sin ese momento raro de cobrar." },
              ].map((s, i) => (
                <div key={i} className={styles.paymentsStep}>
                  <div className={styles.paymentsStepIcon}>{s.icon}</div>
                  <div className={styles.paymentsStepTitle}>{s.t}</div>
                  <div className={styles.paymentsStepDesc}>{s.d}</div>
                </div>
              ))}
            </div>
            <div className={styles.paymentsNote}>
              Piquefy no gestiona ni mueve dinero. Solo calculamos. Vosotros pagáis como queráis — Bizum, en mano, lo que os apetezca.
            </div>
          </div>

          {/* Use cases */}
          <div className={styles.seoCasesSection}>
            <h2 className={styles.seoH2center}>Para esto y para mucho más</h2>
            <p className={styles.seoH2sub}>Cualquier situación con un resultado incierto es una excusa para un pique</p>
            <div className={styles.seoCasesGrid}>
              {[
                { icon: "⚽", title: "Porra de fútbol", text: "Champions, LaLiga, El Clásico, Mundial 2026... El pique deportivo de toda la vida, digitalizado.", link: "/porra" },
                { icon: "👶", title: "¿Niño o niña?", text: "El pique más esperado del embarazo. Cada amigo elige su predicción en el baby shower.", link: "/pique/social" },
                { icon: "🎤", title: "Porra de Eurovisión", text: "¿Quién gana el festival? Que cada uno defienda su favorito mientras seguís la gala.", link: "/pique/eurovision" },
                { icon: "📺", title: "Realities y series", text: "¿Quién sale esta semana? El pique perfecto para ver la tele en grupo.", link: "/pique/social" },
                { icon: "💼", title: "Piques de trabajo", text: "¿Quién llega tarde? ¿Conseguimos el cliente? El pique de oficina de toda la vida.", link: "/pique/social" },
                { icon: "🎬", title: "Premios Oscar", text: "¿Mejor película? ¿Mejor director? Un pique por categoría para los más cinéfilos.", link: "/pique/oscar" },
                { icon: "🏆", title: "Prode del Mundial 2026", text: "El torneo más grande del fútbol. El prode más épico con tus amigos.", link: "/pique/mundial-2026" },
                { icon: "🎯", title: "Piques cotidianos", text: "¿A qué hora sale el vuelo con retraso? Si se puede predecir, se puede piqueficar.", link: "/pique/social" },
              ].map((c, i) => (
                <Link key={i} href={c.link} className={styles.caseCard}>
                  <span className={styles.caseIcon}>{c.icon}</span>
                  <div className={styles.caseTitle}>{c.title}</div>
                  <div className={styles.caseText}>{c.text}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Geo */}
          <div className={styles.seoGeoSection}>
            <h2 className={styles.seoH2center}>El pique online para todo el mundo hispano</h2>
            <div className={styles.seoGeoGrid}>
              {[
                { flag: "🇪🇸", country: "España", term: "Porra", desc: "En España el pique entre amigos se llama porra. Crea tu porra online en un minuto, comparte el código y que empiece.", link: "/porra", cta: "Crear porra online →" },
                { flag: "🇦🇷", country: "Argentina · Uruguay", term: "Prode", desc: "En Argentina y Uruguay se llama prode. Armá tu prode con los pibes, compartí el código y seguí el ranking en vivo.", link: "/prode", cta: "Armar prode online →" },
                { flag: "🇲🇽", country: "México · Colombia", term: "Quiniela", desc: "En México y Colombia lo llaman quiniela. Organiza la tuya entre amigos, comparte por WhatsApp y que gane el más listo.", link: "/quiniela", cta: "Organizar quiniela →" },
                { flag: "🇺🇾", country: "Uruguay · Paraguay", term: "Penca", desc: "En Uruguay y Paraguay se llama penca. Armá tu penca para el mundial o la champions.", link: "/penca", cta: "Armar penca online →" },
              ].map((g, i) => (
                <Link key={i} href={g.link} className={styles.geoCard}>
                  <div className={styles.geoFlag}>{g.flag}</div>
                  <div className={styles.geoCountry}>{g.country}</div>
                  <div className={styles.geoTerm}>{g.term}</div>
                  <div className={styles.geoDesc}>{g.desc}</div>
                  <div className={styles.geoCta}>{g.cta}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className={styles.seoFeaturesSection}>
            <h2 className={styles.seoH2center}>Todo lo que necesita un buen pique</h2>
            <div className={styles.seoFeaturesGrid}>
              {[
                { icon: "⚡", t: "Listo en 60 segundos", d: "Sin registro, sin configuraciones. Título, opciones, fecha de cierre y listo." },
                { icon: "📊", t: "Bote en tiempo real", d: "Todos ven quién apuesta qué y cuánto hay acumulado. La tensión crece con cada apuesta." },
                { icon: "💸", t: "Importe mínimo y máximo", d: "El organizador puede fijar un rango para que todos jueguen en igualdad." },
                { icon: "🔒", t: "Cierre automático", d: "Fija la fecha y hora. Cuando llega el momento, nadie puede cambiar su apuesta." },
                { icon: "🧮", t: "Cálculo automático tipo Tricount", d: "Piquefy calcula quién le debe a quién con el mínimo de transferencias." },
                { icon: "📸", t: "Imagen viral del ganador", d: "El ganador recibe su imagen para compartir en Stories y presumir de que tenía razón." },
                { icon: "📲", t: "Invitar por WhatsApp", d: "Botón de invitar integrado. El enlace lleva directo al pique." },
                { icon: "🌍", t: "Para toda Hispanoamérica", d: "Funciona igual en España, Argentina, México, Colombia, Uruguay y Chile." },
              ].map((f, i) => (
                <div key={i} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div className={styles.featureT}>{f.t}</div>
                  <div className={styles.featureD}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.faqSection}>
            <h2 className={styles.seoH2center}>Preguntas frecuentes sobre Piquefy</h2>
            <div className={styles.faqs}>
              {FAQ_SCHEMA.mainEntity.map((faq, i) => (
                <details key={i} className={styles.faq}>
                  <summary className={styles.faqQ}>{faq.name}</summary>
                  <p className={styles.faqA}>{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>

        </section>

        <footer className={styles.footer}>
          <div className={styles.footerLogo}>
            <span className={styles.logoWhite}>Pique</span><span className={styles.logoFire}>fy</span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/legal">Aviso legal</Link>
            <Link href="/porra">Porra online</Link>
            <Link href="/prode">Prode online</Link>
            <Link href="/quiniela">Quiniela online</Link>
            <Link href="/penca">Penca online</Link>
            <Link href="/pique/champions-league">Porra Champions</Link>
            <Link href="/pique/eurovision">Porra Eurovisión</Link>
            <Link href="/pique/mundial-2026">Prode Mundial 2026</Link>
            <Link href="/pique/social">Piques cotidianos</Link>
          </div>
          <p className={styles.footerCopy}>© 2025 Piquefy · piquefy.com · Porque cualquier momento es bueno para un pique.</p>
        </footer>
      </div>
    </>
  );
}
