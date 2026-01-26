import { Outlet } from "react-router-dom"
import "./App.scss"
import HeaderLoggedOut from "./pages/HeaderVisitor/Index"

function App() {
    return (
        <div className="w-full">
            <HeaderLoggedOut />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App
