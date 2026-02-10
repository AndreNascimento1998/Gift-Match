import DescriptionComponent from "@/components/page/DescriptionComponent/Index"
import Seo from "@/seo/Seo"
import { useCurrentUser } from "@/stores/useCurrentUser"
import InfoDependents from "./components/InfoDependents"

const Dependents = () => {
    const group = useCurrentUser((state) => state.group)
    const currentUser = useCurrentUser((state) => state.currentUser)

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100dvh-21.8rem)]">
            <Seo
                title="Dependents"
                description="Manage your dependents and their information. Add, edit, or remove dependents from your account. Keep track of their details and ensure they are up to date for a seamless experience on our platform."
            />
            <InfoDependents dependents={currentUser.dependents} />
            <DescriptionComponent group={group} />
        </main>
    )
}

export default Dependents
