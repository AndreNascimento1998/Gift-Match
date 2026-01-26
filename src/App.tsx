import { NavLink, Outlet } from "react-router-dom"
import { useEffect } from "react"
import "./App.scss"
import { useGlobalStore } from "@/stores/useGlobalStore"

function App() {
    const theme = useGlobalStore((state) => state.theme)
    const toggleTheme = useGlobalStore((state) => state.toggleTheme)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    return (
        <div className="w-full px-6 py-8 text-main">
            <header className="mb-8 flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">Vite + React</h1>
                <nav className="flex flex-wrap items-center gap-4">
                    <NavLink to="/" className="underline text-main">
                        Home
                    </NavLink>
                    <NavLink to="/about" className="underline text-main">
                        About ds
                    </NavLink>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="ml-auto rounded-md border border-border bg-surface px-3 py-2 text-sm text-main"
                    >
                        Tema: {theme === "light" ? "Light" : "Dark"}
                    </button>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App
