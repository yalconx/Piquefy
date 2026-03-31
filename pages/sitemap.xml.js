const DOMAIN = "https://piquefy.com";

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/crear", priority: "0.9", changefreq: "weekly" },
  { url: "/porra", priority: "0.9", changefreq: "weekly" },
  { url: "/prode", priority: "0.9", changefreq: "weekly" },
  { url: "/quiniela", priority: "0.9", changefreq: "weekly" },
  { url: "/penca", priority: "0.8", changefreq: "weekly" },
  { url: "/pique/champions-league", priority: "0.8", changefreq: "weekly" },
  { url: "/pique/eurovision", priority: "0.8", changefreq: "monthly" },
  { url: "/pique/mundial-2026", priority: "0.8", changefreq: "monthly" },
  { url: "/pique/oscar", priority: "0.7", changefreq: "monthly" },
  { url: "/pique/clasico", priority: "0.8", changefreq: "weekly" },
  { url: "/privacidad", priority: "0.2", changefreq: "yearly" },
  { url: "/legal", priority: "0.2", changefreq: "yearly" },
];

function generateSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${DOMAIN}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
}

export default function Sitemap() { return null; }

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}
