import { useGlobalStore } from "@/stores/useGlobalStore"

const useHeader = () => {
    const theme = useGlobalStore((state) => state.theme)
    const toggleTheme = useGlobalStore((state) => state.toggleTheme)

    return {
        theme,
        toggleTheme,
    }
}

export default useHeader
