import { writeFile } from "node:fs/promises"

const routes = ["/", "/about", "/register"]

const rawSiteUrl =
    process.env.SITE_URL ?? process.env.VITE_SITE_URL ?? "https://example.com"

const siteUrl = rawSiteUrl.replace(/\/$/, "")
const now = new Date().toISOString()

const escapeXml = (value) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;")

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map((path) => {
        const loc = `${siteUrl}${path}`
        return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(now)}</lastmod>
  </url>`
    })
    .join("\n")}
</urlset>
`

const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`

await writeFile(new URL("../public/sitemap.xml", import.meta.url), sitemap)
await writeFile(new URL("../public/robots.txt", import.meta.url), robots)

console.log(
    `[seo] Generated public/sitemap.xml and public/robots.txt for ${siteUrl}`,
)
