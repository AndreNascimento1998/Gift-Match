import { createBrowserRouter } from "react-router-dom"

const hydrateFallbackElement = (
    <div className="p-6 text-main">Carregando...</div>
)

const router = createBrowserRouter([
    {
        path: "/register",
        hydrateFallbackElement,
        lazy: async () => {
            const [{ default: CreatorGroupLayout }, { default: RegisterPage }] =
                await Promise.all([
                    import("@/layouts/CreatorGroupLayout/Index"),
                    import("@/pages/RegisterPage/Index"),
                ])

            return {
                element: (
                    <CreatorGroupLayout>
                        <RegisterPage />
                    </CreatorGroupLayout>
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
                    const [{ default: DefaultLayout }, { default: Home }] =
                        await Promise.all([
                            import("@/layouts/DefaultLayout/Index"),
                            import("@/pages/Home/Index"),
                        ])

                    return {
                        element: (
                            <DefaultLayout>
                                <Home />
                            </DefaultLayout>
                        ),
                    }
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
