import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "name": "Piquefy",
                "url": "https://piquefy.com",
                "applicationCategory": "GameApplication",
                "operatingSystem": "Web, iOS, Android",
                "description": "Plataforma de piques, porras y retos entre amigos. Sin registro, sin dinero real. Comparte por WhatsApp y que gane el mejor.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "124" }
              },
              {
                "@type": "Game",
                "name": "Piquefy — Piques y porras entre amigos",
                "url": "https://piquefy.com",
                "genre": ["Social Game", "Prediction Game", "Party Game"],
                "playMode": "MultiPlayer",
                "numberOfPlayers": { "@type": "QuantitativeValue", "minValue": 2 }
              }
            ]
          })}}
        />
      </Head>

      {/* Google Analytics GA4 — G-X4TMF772ZB */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-X4TMF772ZB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X4TMF772ZB', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
