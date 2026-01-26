import GiftIcon from "@/components/icons/GiftIcon"
import useHeader from "./hooks/useHeader"
import ButtonHamburguerIcon from "@/components/icons/ButtonHamburguerIcon"

const HeaderVisitor = () => {
    const headerHook = useHeader()

    const { toggleTheme } = headerHook

    return (
        <header className="flex justify-between items-center py-4 px-8 rounded-lg bg-background-default">
            <section className="hidden md:flex items-center gap-2">
                <h1 className="text-h3">Amigo secreto online </h1>
                <GiftIcon
                    onClick={toggleTheme}
                    className="bg-background-default"
                />
            </section>
            <article className="hidden lg:flex gap-9">
                <span className="text-h3">Como funciona</span>
                <span className="text-h3">Privacidade</span>
            </article>
            <section
                onClick={toggleTheme}
                className="block md:hidden bg-background-default"
            >
                Avatar
            </section>
            <article className="block md:hidden">
                <ButtonHamburguerIcon />
            </article>
        </header>
    )
}

export default HeaderVisitor
