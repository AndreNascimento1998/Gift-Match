import { Outlet } from "react-router-dom"
import "./App.scss"
import Header from "./pages/Header/Index"

function App() {
    return (
        <div className="w-full">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App
