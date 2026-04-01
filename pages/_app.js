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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230A0A0A'/><text y='.9em' font-size='80' x='10'>🔥</text></svg>" />
        {/* OG Image global */}
        <meta property="og:image" content="https://piquefy.com/api/og" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://piquefy.com/api/og" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Schema.org */}
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
                "description": "Porras entre amigos, sin el lío de siempre. Crea tu porra en 60 segundos, comparte por WhatsApp y Piquefy organiza los pagos.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
              },
              {
                "@type": "Game",
                "name": "Piquefy — Porras entre amigos",
                "url": "https://piquefy.com",
                "genre": ["Social Game", "Prediction Game", "Party Game"],
                "playMode": "MultiPlayer",
                "numberOfPlayers": { "@type": "QuantitativeValue", "minValue": 2 }
              }
            ]
          })}}
        />
      </Head>

      {/* Google Analytics GA4 */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-X4TMF772ZB" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X4TMF772ZB', { page_path: window.location.pathname });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
