import { NavLink, Outlet } from "react-router-dom"

function App() {
    return (
        <div className="min-h-screen w-full px-6 py-8">
            <header className="mb-8 flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">Vite + React</h1>
                <nav className="flex gap-4">
                    <NavLink to="/" className="underline">
                        Home
                    </NavLink>
                    <NavLink to="/about" className="underline">
                        About
                    </NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App
