export default function Robots() { return null; }
export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *\nAllow: /\nDisallow: /porra/\nSitemap: https://piquefy.com/sitemap.xml`);
  res.end();
  return { props: {} };
}
