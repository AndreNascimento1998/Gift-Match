import { useEffect } from "react"
import { useLocation } from "react-router-dom"

type SeoProps = {
    title?: string
    description?: string
    imagePath?: string
    noindex?: boolean
    jsonLd?: Record<string, unknown>
}

const ensureMeta = (attrs: Record<string, string>) => {
    const selector = Object.entries(attrs)
        .filter(([key]) => key === "name" || key === "property")
        .map(([key, value]) => `${key}="${CSS.escape(value)}"`)
        .join("")

    const existing = selector
        ? document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`)
        : null

    const meta = existing ?? document.createElement("meta")

    Object.entries(attrs).forEach(([key, value]) => {
        meta.setAttribute(key, value)
    })

    if (!existing) document.head.appendChild(meta)

    return meta
}

const ensureLink = (rel: string) => {
    const existing = document.head.querySelector<HTMLLinkElement>(
        `link[rel="${CSS.escape(rel)}"]`,
    )

    const link = existing ?? document.createElement("link")
    link.setAttribute("rel", rel)

    if (!existing) document.head.appendChild(link)

    return link
}

const ensureJsonLd = (id: string) => {
    const existing = document.head.querySelector<HTMLScriptElement>(
        `script#${CSS.escape(id)}`,
    )

    const script = existing ?? document.createElement("script")
    script.id = id
    script.type = "application/ld+json"

    if (!existing) document.head.appendChild(script)

    return script
}

const normalizeOrigin = (origin: string) => origin.replace(/\/$/, "")

export default function Seo({
    title,
    description,
    imagePath = "/og.svg",
    noindex,
    jsonLd,
}: SeoProps) {
    const location = useLocation()

    useEffect(() => {
        const defaultTitle = "Gift Match"
        const defaultDescription =
            "Crie seu grupo de amigo secreto, organize participantes e faça o sorteio de forma simples."

        const finalTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
        const finalDescription = description ?? defaultDescription

        const siteUrlFromEnv = import.meta.env?.VITE_SITE_URL as
            | string
            | undefined
        const siteUrl = normalizeOrigin(
            siteUrlFromEnv ?? window.location.origin,
        )

        const canonicalUrl = new URL(
            `${location.pathname}${location.search}`,
            `${siteUrl}/`,
        ).toString()

        const imageUrl = new URL(imagePath, `${siteUrl}/`).toString()

        document.title = finalTitle

        ensureMeta({ name: "description", content: finalDescription })
        ensureMeta({
            name: "robots",
            content: noindex ? "noindex,nofollow" : "index,follow",
        })

        const canonical = ensureLink("canonical")
        canonical.setAttribute("href", canonicalUrl)

        // Open Graph
        ensureMeta({ property: "og:type", content: "website" })
        ensureMeta({ property: "og:site_name", content: defaultTitle })
        ensureMeta({ property: "og:title", content: finalTitle })
        ensureMeta({ property: "og:description", content: finalDescription })
        ensureMeta({ property: "og:url", content: canonicalUrl })
        ensureMeta({ property: "og:image", content: imageUrl })

        // Twitter
        ensureMeta({ name: "twitter:card", content: "summary_large_image" })
        ensureMeta({ name: "twitter:title", content: finalTitle })
        ensureMeta({ name: "twitter:description", content: finalDescription })
        ensureMeta({ name: "twitter:image", content: imageUrl })

        if (jsonLd) {
            const script = ensureJsonLd("seo-jsonld")
            script.text = JSON.stringify(jsonLd)
        } else {
            const existing = document.head.querySelector("script#seo-jsonld")
            existing?.remove()
        }
    }, [
        description,
        imagePath,
        jsonLd,
        location.pathname,
        location.search,
        noindex,
        title,
    ])

    return null
}
