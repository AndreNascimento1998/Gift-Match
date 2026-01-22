import { create } from "zustand"

type GlobalState = {
    count: number
    increment: () => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}))
