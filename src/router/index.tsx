import { createBrowserRouter } from "react-router-dom"

const hydrateFallbackElement = (
    <div className="p-6 text-main">Carregando...</div>
)

const router = createBrowserRouter([
    {
        path: "/register",
        hydrateFallbackElement,
        lazy: async () => {
            const [{ default: VisitorLayout }, { default: RegisterPage }] =
                await Promise.all([
                    import("@/layouts/VisitorLayout/Index"),
                    import("@/pages/RegisterPage/Index"),
                ])

            return {
                element: (
                    <VisitorLayout>
                        <RegisterPage />
                    </VisitorLayout>
                ),
            }
        },
    },
    {
        path: "/",
        hydrateFallbackElement,
        lazy: async () => {
            const { default: App } = await import("@/App")
            return { Component: App }
        },
        children: [
            {
                index: true,
                hydrateFallbackElement,
                lazy: async () => {
                    const { default: Home } = await import("@/pages/Home/Home")
                    return { Component: Home }
                },
            },
            {
                path: "about",
                hydrateFallbackElement,
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
