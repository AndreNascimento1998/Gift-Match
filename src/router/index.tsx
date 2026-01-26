import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/register",
        lazy: async () => {
            const [{ default: LoggedOutLayout }, { default: RegisterPage }] =
                await Promise.all([
                    import("@/layouts/LoggedOutLayou.tsx/Index"),
                    import("@/pages/RegisterPage/Index"),
                ])

            return {
                element: (
                    <LoggedOutLayout>
                        <RegisterPage />
                    </LoggedOutLayout>
                ),
            }
        },
    },
    {
        path: "/",
        lazy: async () => {
            const { default: App } = await import("@/App")
            return { Component: App }
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: Home } = await import("@/pages/Home/Home")
                    return { Component: Home }
                },
            },
            {
                path: "about",
                lazy: async () => {
                    const { default: About } =
                        await import("@/pages/About/About")
                    return { Component: About }
                },
            },
        ],
    },
])

export default router
