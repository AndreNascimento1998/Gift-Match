import Seo from "@/seo/Seo"
import { useCurrentUser } from "@/stores/useCurrentUser"
import { useParams } from "react-router-dom"
import Overview from "./components/Overview"
import type { User } from "@/types/CurrentUser/Index"

const UserInformation = () => {
    const { id } = useParams()
    const group = useCurrentUser((state) => state.group)
    const userData =
        group.users.find((user: User) => user.id === id) || ({} as User)

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-background-default py-6 px-8 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
            <Seo
                title="User Information"
                description="View and manage your user information, including personal details, account settings, and preferences. Update your profile, change your password, and customize your experience on our platform."
            />

            <Overview user={userData} />
            <div>eu</div>
        </main>
    )
}

export default UserInformation
