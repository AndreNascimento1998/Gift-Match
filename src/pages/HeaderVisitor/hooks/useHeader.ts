import { useGlobalStore } from "@/stores/useGlobalStore"

const useHeader = () => {
    const theme = useGlobalStore((state) => state.theme)
    const toggleTheme = useGlobalStore((state) => state.toggleTheme)

    const options = [
        { value: "working", label: "Como funciona" },
        { value: "rules", label: "Regras" },
        { value: "support", label: "Suporte" },
    ]

    return {
        theme,
        toggleTheme,
        options
    }
}

export default useHeader
