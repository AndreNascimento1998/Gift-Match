import type { User } from "@/types/CurrentUser/Index"
import { create } from "zustand"

type SecretFriendState = {
    secretFriend: User
    setSecretFriend: (user: User) => void
}

export const useSecretFriend = create<SecretFriendState>((set) => ({
    secretFriend: {} as User,

    setSecretFriend: (user: User) => set({ secretFriend: user }),
}))
