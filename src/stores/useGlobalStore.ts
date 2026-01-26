import { create } from "zustand"

export type ThemeMode = "light" | "dark"

type GlobalState = {
    count: number
    increment: () => void

    theme: ThemeMode
    setTheme: (theme: ThemeMode) => void
    toggleTheme: () => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),

    theme: "light",
    setTheme: (theme) => set({ theme }),
    toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}))
