import { Suspense, useEffect, useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import router from "@/router"
import { useGlobalStore } from "@/stores/useGlobalStore"

export default function RootProviders() {
    const theme = useGlobalStore((state) => state.theme)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme,
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                backgroundColor: "var(--color-background)",
                                color: "var(--color-main)",
                            },
                        },
                    },
                },
            }),
        [theme],
    )

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
        </ThemeProvider>
    )
}
