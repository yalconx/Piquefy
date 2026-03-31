import { useState } from "react";
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
    { "@type": "Question", "name": "¿Cómo se crea un pique online con amigos?", "acceptedAnswer": { "@type": "Answer", "text": "Entra en Piquefy, haz clic en 'Crear pique', define las opciones y comparte el código por WhatsApp. Tus amigos entran, eligen su opción y el ranking se actualiza en directo." }},
    { "@type": "Question", "name": "¿Se usa dinero real en Piquefy?", "acceptedAnswer": { "@type": "Answer", "text": "No. Piquefy usa importes ficticios. La app calcula quién gana y cuánto, pero el intercambio real es entre vosotros, como queráis." }},
    { "@type": "Question", "name": "¿Piquefy funciona para prodes y quinielas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Piquefy funciona para porras en España, prodes en Argentina, quinielas en México y pencas en Uruguay. El mismo motor, el nombre de tu país." }},
    { "@type": "Question", "name": "¿Necesito instalar algo?", "acceptedAnswer": { "@type": "Answer", "text": "Nada. Piquefy funciona desde el navegador de cualquier móvil u ordenador. Sin descargas, sin cuentas, sin contraseñas." }},
    { "@type": "Question", "name": "¿Puedo hacer un pique para adivinar si el bebé es niño o niña?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Crea el pique con las opciones 'Niño' y 'Niña', fija el cierre para antes del parto y comparte el enlace en el grupo. Cuando nazca, el organizador marca el resultado y Piquefy calcula quién ganó." }},
    { "@type": "Question", "name": "¿Cuántas personas pueden participar en un pique?", "acceptedAnswer": { "@type": "Answer", "text": "Sin límite. Desde 2 amigos hasta grupos grandes de familia, trabajo o compañeros. Cada uno entra desde su móvil sin instalar nada." }},
  ]
};

export default function Home() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        <title>Piquefy — Piques, porras, prodes y quinielas entre amigos | Gratis sin registro</title>
        <meta name="description" content="Crea tu pique, porra o prode en segundos. Sin registro, sin dinero real. Para fútbol, realities, baby shower, trabajo... Comparte por WhatsApp y que gane el mejor. Disponible para España, Argentina, México y más." />
        <meta name="keywords" content="pique online amigos, porra online gratis, prode online, quiniela amigos online, penca online, porra sin registro, pique entre amigos whatsapp, porra fútbol amigos, prode mundial 2026, porra champions, porra eurovisión, pique bebe niño niña, apuesta amigos online, reto amigos, porra trabajo amigos, piquefy" />
        <meta property="og:title" content="Piquefy — Piques y porras entre amigos" />
        <meta property="og:description" content="Crea tu pique en segundos. Sin registro. Comparte por WhatsApp y que gane el mejor." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piquefy.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Piquefy — Piques y porras entre amigos" />
        <meta name="twitter:description" content="Crea tu pique en segundos. Sin registro, sin dinero real. Para fútbol, baby shower, realities y mucho más." />
        <link rel="canonical" href="https://piquefy.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      </Head>

      <div className={styles.page}>
        <div className={styles.bgNoise} />
        <div className={styles.bgGlow} />

        <header className={styles.hero}>
          <div className={styles.badge}>🔥 Gratis · Sin registro · 100% social</div>
          <h1 className={styles.title}>
            <span className={styles.titleMain}>PIQUEFY</span>
            <span className={styles.titleSub}>Cualquier momento es un pique.</span>
          </h1>
          <p className={styles.subtitle}>
            Lanza tu porra, prode o quiniela en segundos.<br />
            Comparte por WhatsApp y que gane el mejor.
          </p>
        </header>

        <main className={styles.main}>
          <button className={styles.createCard} onClick={() => router.push("/crear")}>
            <div className={styles.createCardInner}>
              <span className={styles.createIcon}>🔥</span>
              <div>
                <div className={styles.createTitle}>Crear un pique</div>
                <div className={styles.createDesc}>Define las opciones, fija las reglas y lanza</div>
              </div>
              <span className={styles.createArrow}>→</span>
            </div>
          </button>

          <div className={styles.divider}>o entra con el código</div>

          <div className={styles.joinBox}>
            <input
              className={styles.codeInput}
              placeholder="CÓDIGO"
              maxLength={5}
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
        </main>

        {/* Geo bar */}
        <div className={styles.geoBar}>
          <span className={styles.geoLabel}>También conocido como:</span>
          <Link href="/prode" className={styles.geoLink}>🇦🇷 Prode</Link>
          <Link href="/quiniela" className={styles.geoLink}>🇲🇽 Quiniela</Link>
          <Link href="/penca" className={styles.geoLink}>🇺🇾 Penca</Link>
          <Link href="/porra" className={styles.geoLink}>🇪🇸 Porra</Link>
        </div>

        {/* Event chips */}
        <div className={styles.eventsBar}>
          <span className={styles.eventsLabel}>Piques populares:</span>
          <div className={styles.eventLinks}>
            <Link href="/pique/champions-league" className={styles.eventChip}>⚽ Champions</Link>
            <Link href="/pique/eurovision" className={styles.eventChip}>🎤 Eurovisión</Link>
            <Link href="/pique/mundial-2026" className={styles.eventChip}>🏆 Mundial 2026</Link>
            <Link href="/pique/oscar" className={styles.eventChip}>🎬 Oscar</Link>
            <Link href="/pique/clasico" className={styles.eventChip}>🔥 El Clásico</Link>
            <Link href="/pique/social" className={styles.eventChip}>👶 Baby shower · Realities · Trabajo</Link>
          </div>
        </div>

        {/* SEO content */}
        <section className={styles.seoSection}>

          {/* Block 1: How it works */}
          <div className={styles.seoBlock2col}>
            <div className={styles.seoBlockText}>
              <h2 className={styles.seoH2}>La herramienta de piques entre amigos más fácil de internet</h2>
              <p>Piquefy es una plataforma gratuita para crear porras, prodes, quinielas y piques de cualquier tipo entre amigos, sin registro y sin dinero real. En menos de un minuto puedes tener tu pique listo para compartir por WhatsApp.</p>
              <p>No importa si eres de España y lo llamas porra, de Argentina y lo llamas prode, de México y lo llamas quiniela, o de Uruguay y lo llamas penca. Piquefy entiende tu idioma y funciona igual para todos.</p>
            </div>
            <div className={styles.seoSteps}>
              {[
                { n: "1", t: "Crea el pique", d: "Define el título, las opciones y cuándo cierra" },
                { n: "2", t: "Comparte el código", d: "Por WhatsApp, por enlace o como quieras" },
                { n: "3", t: "Todos apuestan", d: "Cada amigo entra desde su móvil sin instalar nada" },
                { n: "4", t: "Se calcula el resultado", d: "Piquefy dice quién gana y cuánto cobra" },
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

          {/* Block 2: Use cases grid */}
          <div className={styles.seoCasesSection}>
            <h2 className={styles.seoH2center}>¿Para qué sirve Piquefy?</h2>
            <p className={styles.seoH2sub}>Cualquier situación con un resultado incierto es una excusa para un pique</p>
            <div className={styles.seoCasesGrid}>
              {[
                { icon: "⚽", title: "Porra de fútbol", text: "Champions, LaLiga, El Clásico, Mundial 2026, Copa del Rey, Premier... El pique deportivo de toda la vida, digitalizado.", link: "/porra" },
                { icon: "👶", title: "¿Niño o niña?", text: "El pique más esperado del embarazo. Cada amigo elige su predicción y apuesta en el baby shower.", link: "/pique/social" },
                { icon: "🎤", title: "Porra de Eurovisión", text: "¿Quién gana el festival? Que cada uno defienda su favorito mientras seguís la gala en directo.", link: "/pique/eurovision" },
                { icon: "📺", title: "Realities y series", text: "¿Quién sale esta semana? ¿Quién gana La Isla? El pique perfecto para ver la tele en grupo.", link: "/pique/social" },
                { icon: "💼", title: "Piques de trabajo", text: "¿Quién llega tarde? ¿Conseguimos el cliente? El pique de oficina de toda la vida, sin Excel.", link: "/pique/social" },
                { icon: "🎬", title: "Premios Oscar", text: "¿Mejor película? ¿Mejor director? Un pique por categoría para los más cinéfilos del grupo.", link: "/pique/oscar" },
                { icon: "🏆", title: "Prode del Mundial 2026", text: "El torneo más grande del fútbol. El prode más épico con tus amigos de toda la vida.", link: "/pique/mundial-2026" },
                { icon: "🎯", title: "Piques cotidianos", text: "¿A qué hora sale el vuelo con retraso? ¿Cuánto dura la peli? Si se puede predecir, se puede piqueficar.", link: "/pique/social" },
              ].map((c, i) => (
                <Link key={i} href={c.link} className={styles.caseCard}>
                  <span className={styles.caseIcon}>{c.icon}</span>
                  <div className={styles.caseTitle}>{c.title}</div>
                  <div className={styles.caseText}>{c.text}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Block 3: Geographic SEO */}
          <div className={styles.seoGeoSection}>
            <h2 className={styles.seoH2center}>El pique online para todo el mundo hispano</h2>
            <div className={styles.seoGeoGrid}>
              {[
                { flag: "🇪🇸", country: "España", term: "Porra", desc: "En España el pique entre amigos se llama porra. Crea tu porra online en un minuto, comparte el código y que empiece la competición.", link: "/porra", cta: "Crear porra online →" },
                { flag: "🇦🇷", country: "Argentina · Uruguay", term: "Prode", desc: "En Argentina y Uruguay se llama prode. Armá tu prode online con los pibes, compartí el código y seguí el ranking en vivo.", link: "/prode", cta: "Armar prode online →" },
                { flag: "🇲🇽", country: "México · Colombia", term: "Quiniela", desc: "En México y Colombia lo llaman quiniela. Organiza tu quiniela de fútbol entre amigos, comparte por WhatsApp y que gane el más listo.", link: "/quiniela", cta: "Organizar quiniela →" },
                { flag: "🇺🇾", country: "Uruguay · Paraguay", term: "Penca", desc: "En Uruguay y Paraguay se llama penca. Armá tu penca online con los amigos para el mundial o la champions.", link: "/penca", cta: "Armar penca online →" },
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

          {/* Block 4: Features */}
          <div className={styles.seoFeaturesSection}>
            <h2 className={styles.seoH2center}>Todo lo que necesita un buen pique</h2>
            <div className={styles.seoFeaturesGrid}>
              {[
                { icon: "⚡", t: "Crea un pique en 60 segundos", d: "Sin registro, sin configuraciones complicadas. Título, opciones, fecha de cierre y listo." },
                { icon: "📊", t: "Ranking en tiempo real", d: "Todos ven quién apuesta qué y cuánto hay en el bote. La tensión crece con cada nueva apuesta." },
                { icon: "💸", t: "Importe mínimo y máximo", d: "El organizador puede fijar un rango de apuesta para que todos jueguen en igualdad." },
                { icon: "🔒", t: "Cierre automático", d: "Fija la fecha y hora de cierre. Cuando llega el momento, nadie puede cambiar su apuesta." },
                { icon: "🧮", t: "Cálculo automático tipo Tricount", d: "Piquefy calcula quién le debe a quién para liquidar el pique con el mínimo de transferencias." },
                { icon: "📸", t: "Imagen viral del ganador", d: "El ganador recibe una imagen para compartir en Stories y presumir de que tiene razón." },
                { icon: "📲", t: "Invitar por WhatsApp", d: "Botón de invitar por WhatsApp integrado. El enlace lleva directamente al pique, sin buscar nada." },
                { icon: "🌍", t: "Para toda Hispanoamérica", d: "Funciona igual en España, Argentina, México, Colombia, Uruguay, Chile y cualquier país hispano." },
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
          <div className={styles.footerLogo}>PIQUEFY</div>
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
