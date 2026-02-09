import { useCurrentUser } from "@/stores/useCurrentUser"
import EditInformations from "./components/EditInformations"
import Rules from "./components/Rules"

const GroupInformation = () => {
    const group = useCurrentUser((state) => state.group)

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
            <EditInformations groupTitle={group.title} />
            <Rules />
        </main>
    )
}

export default GroupInformation
