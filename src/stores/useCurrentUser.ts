import type { CurrentUser, Group, User } from "@/types/CurrentUser/Index"
import { create } from "zustand"

type CurrentUserState = {
    currentUser: CurrentUser
    group: Group
    setCurrentUser: (currentUserValue: CurrentUser) => void
    setMySecretFriend: (mySecretFriendValue: User) => void
    updateGroup: (patch: Partial<Group>) => void
    setUserGroup: (userGroup: User) => void
}

export const useCurrentUser = create<CurrentUserState>((set) => ({
    currentUser: {
        id: "1",
        name: "André",
        email: "andre.ncardoso@hotmail.com",
        isAdmin: true,
        groupId: "1",
        mySecretFriend: {} as User,
    },

    group: {
        id: "1",
        title: "Amigo Secreto da Firma",
        description: "Descrição do grupo",
        secretDate: "2026-02-12",
        giftAmount: 50,
        users: [
            {
                id: "1",
                name: "Stefanny Joareza",
                email: "sanfrancisconigthfillalrigth@yahoooutlookhotmail.com",
            },
            {
                id: "2",
                name: "Maria",
                email: "maria@dsa.com",
            },
            {
                id: "3",
                name: "João Souza",
                email: "joao@hasad.com",
            },
            {
                id: "4",
                name: "Ana Pereira",
                email: "ana@sadas.com",
            },
            {
                id: "5",
                name: "Carlos Oliveira",
                email: "carlos@dsad.com",
            },
            {
                id: "6",
                name: "Mariana Costa",
                email: "dasdas@com",
            },
        ],
    } as Group,

    setCurrentUser: (currentUserValue: CurrentUser) =>
        set({ currentUser: currentUserValue }),

    setMySecretFriend: (mySecretFriendValue: User) =>
        set((state) => ({
            currentUser: {
                ...state.currentUser,
                mySecretFriend: mySecretFriendValue,
            },
        })),

    updateGroup: (patch: Partial<Group>) =>
        set((state) => ({
            group: {
                ...state.group,
                ...patch,
            },
        })),

    setUserGroup: (userGroup: User) =>
        set((state) => ({
            group: {
                ...state.group,
                users: state.group.users.map((user) =>
                    user.id === userGroup.id ? userGroup : user,
                ),
            },
        })),
}))
