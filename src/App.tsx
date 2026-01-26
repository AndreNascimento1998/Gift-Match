import { Outlet } from "react-router-dom"
import "./App.scss"
import Header from "./pages/Header/Index"

function App() {
    return (
        <div className="w-full px-6 py-8 ">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App
