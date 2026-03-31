import { useState } from "react";
import { useRouter } from "next/router";
import { ref, get } from "firebase/database";
import { db } from "../lib/firebase";
import Head from "next/head";
import Link from "next/link";

export default function LandingTemplate({
  // SEO
  metaTitle, metaDesc, metaKeywords, canonical,
  // Hero
  badge, heroTitle, heroAccent, tagline, subtitle,
  // Content
  localName, features, faqItems,
  // Schema extras
  schemaName,
}) {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const joinPorra = async () => {
    const code = joinCode.trim().toUpperCase();
    if (code.length < 3) { setError(`Introduce el código de ${localName || "pique"}`); return; }
    setLoading(true); setError("");
    const snap = await get(ref(db, `porras/${code}`));
    if (!snap.exists()) { setError("No encontrado. ¿Está bien el código?"); setLoading(false); return; }
    router.push(`/porra/${code}`);
  };

  const faqSchema = faqItems ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://piquefy.com${canonical}`} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      </Head>

      <div style={s.page}>
        <div style={s.bgGlow} />

        <nav style={s.nav}>
          <Link href="/" style={s.navLogo}>🔥 PIQUEFY</Link>
          <Link href="/crear" style={s.navBtn}>Crear {localName || "pique"}</Link>
        </nav>

        <header style={s.hero}>
          {badge && <div style={s.badge}>{badge}</div>}
          <h1 style={s.h1}>
            {heroTitle}{heroAccent && <span style={s.accent}> {heroAccent}</span>}
          </h1>
          {tagline && <p style={s.tagline}>{tagline}</p>}
          {subtitle && <p style={s.subtitle}>{subtitle}</p>}
        </header>

        <div style={s.ctaBox}>
          <button style={s.createBtn} onClick={() => router.push("/crear")}>
            🔥 Crear {localName || "pique"} ahora
          </button>
          <div style={s.divider}>o entra con el código</div>
          <div style={s.joinRow}>
            <input
              style={s.codeInput}
              placeholder="CÓDIGO"
              maxLength={5}
              value={joinCode}
              onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError(""); }}
              onKeyDown={e => e.key === "Enter" && joinPorra()}
            />
            <button style={s.joinBtn} onClick={joinPorra} disabled={loading}>
              {loading ? "..." : "Entrar"}
            </button>
          </div>
          {error && <p style={s.error}>{error}</p>}
        </div>

        {features && (
          <section style={s.featuresSection}>
            <div style={s.featuresGrid}>
              {features.map((f, i) => (
                <div key={i} style={s.featureCard}>
                  <span style={s.featureIcon}>{f.icon}</span>
                  <h2 style={s.featureTitle}>{f.title}</h2>
                  <p style={s.featureText}>{f.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {faqItems && (
          <section style={s.faqSection}>
            <h2 style={s.faqTitle}>Preguntas frecuentes</h2>
            {faqItems.map((f, i) => (
              <details key={i} style={s.faq}>
                <summary style={s.faqQ}>{f.q}</summary>
                <p style={s.faqA}>{f.a}</p>
              </details>
            ))}
          </section>
        )}

        <footer style={s.footer}>
          <Link href="/" style={s.footerLogo}>PIQUEFY</Link>
          <div style={s.footerLinks}>
            <Link href="/porra" style={s.footerLink}>Porra online</Link>
            <Link href="/prode" style={s.footerLink}>Prode online</Link>
            <Link href="/quiniela" style={s.footerLink}>Quiniela online</Link>
            <Link href="/penca" style={s.footerLink}>Penca online</Link>
            <Link href="/privacidad" style={s.footerLink}>Privacidad</Link>
            <Link href="/legal" style={s.footerLink}>Legal</Link>
          </div>
        </footer>
      </div>
    </>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#0A0A0A", color: "#F5F5F5", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 1rem 4rem", position: "relative", overflowX: "hidden" },
  bgGlow: { position: "fixed", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(255,77,28,0.1) 0%, transparent 55%)", pointerEvents: "none" },
  nav: { width: "100%", maxWidth: "800px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.07)" },
  navLogo: { fontFamily: "'Unbounded', cursive", fontSize: "1rem", fontWeight: 900, color: "#FF4D1C", letterSpacing: "0.05em", textDecoration: "none" },
  navBtn: { background: "linear-gradient(135deg, #FF4D1C, #FF8C42)", color: "#fff", borderRadius: "20px", padding: "0.4rem 1.1rem", fontSize: "0.8rem", fontFamily: "'Unbounded', cursive", fontWeight: 700, textDecoration: "none" },
  hero: { textAlign: "center", padding: "3rem 1rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem", maxWidth: "680px" },
  badge: { background: "rgba(255,77,28,0.12)", border: "1px solid rgba(255,77,28,0.25)", borderRadius: "50px", padding: "0.3rem 1rem", fontSize: "0.75rem", color: "#FF8C42", fontWeight: 600 },
  h1: { fontFamily: "'Unbounded', cursive", fontSize: "clamp(1.8rem, 6vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em" },
  accent: { color: "#FF4D1C" },
  tagline: { fontSize: "1rem", color: "#FF8C42", fontWeight: 600 },
  subtitle: { fontSize: "0.9rem", color: "#666", lineHeight: 1.7, maxWidth: "500px" },
  ctaBox: { width: "100%", maxWidth: "440px", display: "flex", flexDirection: "column", gap: "0.9rem", marginTop: "0.5rem" },
  createBtn: { background: "linear-gradient(135deg, #FF4D1C, #FFD166)", color: "#1a1a1a", borderRadius: "50px", padding: "1rem", fontSize: "0.95rem", fontFamily: "'Unbounded', cursive", fontWeight: 900, width: "100%", boxShadow: "0 6px 30px rgba(255,77,28,0.35)", letterSpacing: "0.02em" },
  divider: { textAlign: "center", fontSize: "0.72rem", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" },
  joinRow: { display: "flex", gap: "0.5rem" },
  codeInput: { flex: 1, background: "#1A1A1A", border: "1.5px solid rgba(255,255,255,0.07)", borderRadius: "10px", color: "#F5F5F5", padding: "0.75rem 1rem", fontFamily: "'Unbounded', cursive", fontSize: "1rem", letterSpacing: "0.2em", textAlign: "center", textTransform: "uppercase", outline: "none" },
  joinBtn: { background: "linear-gradient(135deg, #FF4D1C, #FF8C42)", color: "#fff", borderRadius: "10px", padding: "0 1.4rem", fontFamily: "'Unbounded', cursive", fontSize: "0.85rem", fontWeight: 700, border: "none", cursor: "pointer" },
  error: { fontSize: "0.8rem", color: "#ff6b6b", textAlign: "center" },
  featuresSection: { width: "100%", maxWidth: "800px", marginTop: "3rem" },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" },
  featureCard: { background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.3rem", display: "flex", flexDirection: "column", gap: "0.5rem" },
  featureIcon: { fontSize: "1.6rem" },
  featureTitle: { fontFamily: "'Unbounded', cursive", fontSize: "0.78rem", color: "#FFD166", lineHeight: 1.3 },
  featureText: { fontSize: "0.82rem", color: "#666", lineHeight: 1.65 },
  faqSection: { width: "100%", maxWidth: "700px", marginTop: "3rem", display: "flex", flexDirection: "column", gap: "0.5rem" },
  faqTitle: { fontFamily: "'Unbounded', cursive", fontSize: "0.9rem", color: "#F5F5F5", marginBottom: "0.5rem" },
  faq: { background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "0.9rem 1.2rem", cursor: "pointer" },
  faqQ: { fontSize: "0.87rem", fontWeight: 600, color: "#F5F5F5", listStyle: "none", cursor: "pointer" },
  faqA: { fontSize: "0.83rem", color: "#666", lineHeight: 1.65, marginTop: "0.6rem", paddingTop: "0.6rem", borderTop: "1px solid rgba(255,255,255,0.07)" },
  footer: { width: "100%", maxWidth: "800px", marginTop: "4rem", padding: "2rem 0", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" },
  footerLogo: { fontFamily: "'Unbounded', cursive", fontSize: "1rem", fontWeight: 900, color: "#FF4D1C", textDecoration: "none" },
  footerLinks: { display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" },
  footerLink: { fontSize: "0.75rem", color: "#333", textDecoration: "none" },
};
