import useHeader from "./hooks/useHeader"

const Header = () => {
    const headerHook = useHeader()

    const { theme, toggleTheme } = headerHook

    return (
        <header>
            <button
                type="button"
                onClick={toggleTheme}
                className="ml-auto rounded-md border border-border bg-surface px-3 py-2 text-sm text-main"
            >
                Tema: {theme === "light" ? "Light" : "Dark"}
            </button>
        </header>
    )
}

export default Header
