import { Suspense, useEffect, useMemo, useState } from "react"
import { RouterProvider } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import router from "@/router"
import { useGlobalStore } from "@/stores/useGlobalStore"

export default function RootProviders() {
    const theme = useGlobalStore((state) => state.theme)

    const [muiColors, setMuiColors] = useState(() => ({
        primary: theme === "dark" ? "#a78bfa" : "#6d28d9",
        secondary: theme === "dark" ? "#c4b5fd" : "#8b5cf6",
        background: theme === "dark" ? "#0a0909" : "#f8fafc",
        paper: theme === "dark" ? "#141414" : "#ffffff",
        text: theme === "dark" ? "#e5e7eb" : "#111827",
        muted: theme === "dark" ? "#9ca3af" : "#6b7280",
        divider: theme === "dark" ? "#1f2937" : "#e2e8f0",
    }))

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    useEffect(() => {
        const readVar = (name: string) =>
            getComputedStyle(document.documentElement)
                .getPropertyValue(name)
                .trim()

        const primary = readVar("--color-primary") || muiColors.primary
        const secondary = readVar("--color-secondary") || muiColors.secondary
        const background = readVar("--color-background") || muiColors.background
        const paper =
            readVar("--color-background-component") ||
            readVar("--color-surface") ||
            muiColors.paper
        const text = readVar("--color-main") || muiColors.text
        const muted = readVar("--color-muted") || muiColors.muted
        const divider = readVar("--color-border") || muiColors.divider

        setMuiColors({
            primary,
            secondary,
            background,
            paper,
            text,
            muted,
            divider,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme])

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme,
                    primary: {
                        main: muiColors.primary,
                    },
                    secondary: {
                        main: muiColors.secondary,
                    },
                    background: {
                        default: muiColors.background,
                        paper: muiColors.paper,
                    },
                    text: {
                        primary: muiColors.text,
                        secondary: muiColors.muted,
                    },
                    divider: muiColors.divider,
                },
                typography: {
                    fontFamily: "var(--font-sans)",
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
        [muiColors, theme],
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
