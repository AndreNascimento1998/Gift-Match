import Seo from "@/seo/Seo"
import { useCurrentUser } from "@/stores/useCurrentUser"
import { useParams } from "react-router-dom"
import Overview from "./components/Overview"
import type { User } from "@/types/CurrentUser/Index"
import { useState } from "react"
import DescriptionGroup from "./components/DescriptionGroup"

const UserInformation = () => {
    const { id } = useParams()
    const group = useCurrentUser((state) => state.group)
    const currentUser = useCurrentUser((state) => state.currentUser)
    const userData =
        group.users.find((user: User) => user.id === id) || ({} as User)

    const [informationMySecretFriend] = useState<boolean>(
        currentUser.mySecretFriend?.id === id,
    )

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
            <Seo
                title="User Information"
                description="View and manage your user information, including personal details, account settings, and preferences. Update your profile, change your password, and customize your experience on our platform."
            />
            <Overview
                user={userData}
                informationMySecretFriend={informationMySecretFriend}
            />
            <DescriptionGroup group={group} />
        </main>
    )
}

export default UserInformation
