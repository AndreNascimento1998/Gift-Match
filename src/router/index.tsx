import { createBrowserRouter } from "react-router-dom"

import App from "@/App"
import Home from "@/pages/Home/Home"
import About from "@/pages/About/About"
import RegisterPage from "@/pages/RegisterPage/Index"
import LoggedOutLayout from "@/layouts/LoggedOutLayou.tsx/Index"

const router = createBrowserRouter([
    {
        path: "/register",
        element: (
            <LoggedOutLayout>
                <RegisterPage />
            </LoggedOutLayout>
        ),
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
        ],
    },
])

export default router
