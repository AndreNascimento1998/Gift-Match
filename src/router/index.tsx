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
                path: "user-information/:id",
                hydrateFallbackElement,
                lazy: async () => {
                    const [
                        { default: DefaultLayout },
                        { default: UserInformation },
                    ] = await Promise.all([
                        import("@/layouts/DefaultLayout/Index"),
                        import("@/pages/UserInformation/Index"),
                    ])
                    return {
                        element: (
                            <DefaultLayout>
                                <UserInformation />
                            </DefaultLayout>
                        ),
                    }
                },
            },
            {
                path: "group-information",
                hydrateFallbackElement,
                lazy: async () => {
                    const [
                        { default: DefaultLayout },
                        { default: GroupInformation },
                    ] = await Promise.all([
                        import("@/layouts/DefaultLayout/Index"),
                        import("@/pages/GroupInformation/Index"),
                    ])
                    return {
                        element: (
                            <DefaultLayout>
                                <GroupInformation />
                            </DefaultLayout>
                        ),
                    }
                },
            },
        ],
    },
])

export default router
