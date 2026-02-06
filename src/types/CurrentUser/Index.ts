export type Group = {
    id: string
    title: string
    description: string
    secretDate: string
    giftAmount: number
    users: User[]
}

export type User = {
    id: string
    name: string
    email: string
    chosenGift?: string
}

export type CurrentUser = {
    id: string
    name: string
    email: string
    chosenGift?: string
    isAdmin: boolean
    mySecretFriend?: User
    dependents?: CurrentUser[]
}
