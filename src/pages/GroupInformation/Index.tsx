import { useCurrentUser } from "@/stores/useCurrentUser"
import EditInformations from "./components/EditInformations"
import Rules from "./components/Rules"

const GroupInformation = () => {
    const group = useCurrentUser((state) => state.group)
    const setUpdateGroup = useCurrentUser((state) => state.updateGroup)

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
            <EditInformations
                groupTitle={group.title}
                groupDescription={group.description}
                setUpdateGroup={setUpdateGroup}
            />
            <Rules
                secretDate={group.secretDate}
                giftAmount={group.giftAmount}
                setUpdateGroup={setUpdateGroup}
            />
        </main>
    )
}

export default GroupInformation
