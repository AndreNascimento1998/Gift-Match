import type { Participant } from "@/types/Home/Index"
import { create } from "zustand"

type SecretFriendState = {
    secretFriend: Participant
    setSecretFriend: (name: Participant) => void
}

export const useSecretFriend = create<SecretFriendState>((set) => ({
    secretFriend: {} as Participant,

    setSecretFriend: (name: Participant) => set({ secretFriend: name }),
}))
