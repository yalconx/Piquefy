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
    { "@type": "Question", "name": "¿Se usa dinero real en Piquefy?", "acceptedAnswer": { "@type": "Answer", "text": "No. Piquefy usa puntos ficticios. La app calcula quién gana y cuánto, pero el intercambio real es entre vosotros, como queráis." }},
    { "@type": "Question", "name": "¿Piquefy funciona para prodes y quinielas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Piquefy funciona para porras en España, prodes en Argentina, quinielas en México y pencas en Uruguay. El mismo motor, el nombre de tu país." }},
    { "@type": "Question", "name": "¿Necesito instalar algo?", "acceptedAnswer": { "@type": "Answer", "text": "Nada. Piquefy funciona desde el navegador de cualquier móvil u ordenador. Sin descargas, sin cuentas, sin contraseñas." }},
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
    setLoading(true);
    setError("");
    const snap = await get(ref(db, `porras/${code}`));
    if (!snap.exists()) {
      setError("Pique no encontrado. ¿Está bien el código?");
      setLoading(false);
      return;
    }
    router.push(`/porra/${code}`);
  };

  return (
    <>
      <Head>
        <title>Piquefy — Piques, porras y prodes entre amigos | Gratis y sin registro</title>
        <meta name="description" content="Crea tu pique, porra o prode en segundos. Sin registro, sin dinero real. Comparte por WhatsApp, sigue el ranking en directo y que gane el mejor. Disponible para España, Argentina, México y más." />
        <meta name="keywords" content="pique online, porra online amigos, prode online, quiniela amigos, penca online, crear porra gratis, pique entre amigos, reto amigos online, piquefy" />
        <meta property="og:title" content="Piquefy — Piques y porras entre amigos" />
        <meta property="og:description" content="Crea tu pique en segundos. Sin registro. Comparte por WhatsApp y que gane el mejor." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piquefy.com" />
        <meta property="og:image" content="https://piquefy.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Piquefy — Piques y porras entre amigos" />
        <meta name="twitter:description" content="Crea tu pique en segundos. Sin registro, sin dinero real. Comparte por WhatsApp." />
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

        {/* Geo landing links */}
        <div className={styles.geoBar}>
          <span className={styles.geoLabel}>También conocido como:</span>
          <Link href="/prode" className={styles.geoLink}>🇦🇷 Prode</Link>
          <Link href="/quiniela" className={styles.geoLink}>🇲🇽 Quiniela</Link>
          <Link href="/penca" className={styles.geoLink}>🇺🇾 Penca</Link>
          <Link href="/porra" className={styles.geoLink}>🇪🇸 Porra</Link>
        </div>

        {/* Event landing links */}
        <div className={styles.eventsBar}>
          <span className={styles.eventsLabel}>Piques populares:</span>
          <div className={styles.eventLinks}>
            <Link href="/pique/champions-league" className={styles.eventChip}>⚽ Champions</Link>
            <Link href="/pique/eurovisión" className={styles.eventChip}>🎤 Eurovisión</Link>
            <Link href="/pique/mundial-2026" className={styles.eventChip}>🏆 Mundial 2026</Link>
            <Link href="/pique/oscar" className={styles.eventChip}>🎬 Oscar</Link>
            <Link href="/pique/clasico" className={styles.eventChip}>🔥 El Clásico</Link>
          </div>
        </div>

        {/* SEO content */}
        <section className={styles.seoSection}>
          <div className={styles.seoGrid}>
            {[
              { icon: "⚡", title: "Piquefica cualquier momento", text: "¿Quién gana el partido? ¿Cuándo nace el bebé? ¿Quién sale del reality? Cualquier situación es una excusa para un pique entre amigos." },
              { icon: "🌎", title: "Porra, prode, quiniela o penca", text: "En España lo llaman porra. En Argentina, prode. En México, quiniela. En Uruguay, penca. Piquefy habla tu idioma." },
              { icon: "📱", title: "Sin descargas ni registro", text: "Funciona desde el navegador de tu móvil al instante. Comparte el código por WhatsApp y que empiece el pique." },
              { icon: "📊", title: "Ranking en directo", text: "Sigue en tiempo real quién apuesta qué, cuánto hay en el bote y cómo se distribuyen las predicciones." },
              { icon: "🏆", title: "Calcula quién gana", text: "Cuando acaba el evento, marca el resultado y Piquefy calcula automáticamente los importes. Como Tricount pero para piques." },
              { icon: "🚀", title: "Viral por diseño", text: "El ganador recibe una imagen para compartir en Stories. Cada pique genera su propio enlace que se comparte solo." },
            ].map((b, i) => (
              <div key={i} className={styles.seoBlock}>
                <span className={styles.seoIcon}>{b.icon}</span>
                <h2 className={styles.seoTitle}>{b.title}</h2>
                <p className={styles.seoText}>{b.text}</p>
              </div>
            ))}
          </div>

          {/* Glosario del Pique */}
          <div className={styles.glosario}>
            <h2 className={styles.glosarioTitle}>El glosario del pique</h2>
            <div className={styles.glosarioGrid}>
              {[
                { term: "Pique", def: "Reto entre amigos donde cada uno predice un resultado y apuesta su prestigio (y algo más si queréis)." },
                { term: "Piqueficar", def: "Convertir cualquier situación en una competición entre amigos. Ej: 'Vamos a piqueficar quién llega antes.'" },
                { term: "Prode", def: "Nombre con el que se conoce el pique deportivo en Argentina y Uruguay." },
                { term: "Quiniela", def: "La versión mexicana y colombiana del pique deportivo entre amigos." },
                { term: "Penca", def: "Así llaman al pique en Uruguay y Paraguay, especialmente en torneos de fútbol." },
                { term: "Bote", def: "El total acumulado de las apuestas ficticias. El ganador se lleva el bote." },
              ].map((g, i) => (
                <div key={i} className={styles.glosarioItem}>
                  <span className={styles.glosarioTerm}>{g.term}</span>
                  <span className={styles.glosarioDef}>{g.def}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Preguntas frecuentes</h2>
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
            <Link href="/prode">Prode online</Link>
            <Link href="/quiniela">Quiniela online</Link>
            <Link href="/penca">Penca online</Link>
          </div>
          <p className={styles.footerCopy}>© 2025 Piquefy · piquefy.com · Porque cualquier momento es bueno para un pique.</p>
        </footer>
      </div>
    </>
  );
}
