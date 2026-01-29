import GiftIcon from "@/components/icons/GiftIcon"
import useHeaderCreatorGroup from "./hooks/useHeader"
import ButtonHamburguerIcon from "@/components/icons/ButtonHamburguerIcon"
import Dropdown from "@/components/base/Dropdown/Index"

const HeaderCreatorGroup = () => {
    const HeaderCreatorGroup = useHeaderCreatorGroup()

    const { toggleTheme, options } = HeaderCreatorGroup

    return (
        <header className="flex justify-between items-center py-4 px-8 md:px-20 rounded-lg lg:rounded-none bg-background-default">
            <section className="hidden md:flex items-center gap-2">
                <h1 className="text-h3">Amigo secreto online </h1>
                <GiftIcon
                    onClick={toggleTheme}
                    className="bg-background-default"
                />
            </section>
            <article className="hidden lg:flex lg:items-center gap-9">
                <span className="text-h3">Como funciona</span>
                <span className="text-h3">
                    <Dropdown
                        label="Menu"
                        items={options}
                        variant="outlined"
                        onSelect={(value) => {
                            console.log("dropdown select", value)
                        }}
                    />
                </span>
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

export default HeaderCreatorGroup
