import Seo from "@/seo/Seo"

function About() {
    return (
        <section className="flex flex-col gap-4">
            <Seo title="Sobre" description="Saiba mais sobre o Gift Match." />
            <h2 className="text-xl font-semibold">About</h2>
            <p>Example route to validate React Router setup.</p>
        </section>
    )
}

export default About
