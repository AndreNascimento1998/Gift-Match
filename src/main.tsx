import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./tailwind.css"
import "./index.scss"
import RootProviders from "@/RootProviders"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RootProviders />
    </StrictMode>,
)
