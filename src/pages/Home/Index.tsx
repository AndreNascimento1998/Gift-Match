import { useMemo, useState } from "react"
import Description from "./components/Description"
import List from "./components/List"
import RaffleModal from "./components/RaffleModal"
import CardRevelation from "./components/CardRevelation"
import { useCurrentUser } from "@/stores/useCurrentUser"
import Seo from "@/seo/Seo"

const Home = () => {
    const currentUser = useCurrentUser((state) => state.currentUser)
    const group = useCurrentUser((state) => state.group)
    const setMySecretFriend = useCurrentUser((state) => state.setMySecretFriend)
    const [filtered, setFiltered] = useState("")

    const usersFiltered = useMemo(() => {
        return group.users.filter((user) =>
            user.name.toLowerCase().includes(filtered.toLocaleLowerCase()),
        )
    }, [filtered, group.users])

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Seo
                title={group.title}
                description={group.description}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "Gift Match",
                    description: group.description,
                }}
            />
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-background-default py-6 px-8 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
                <div className="flex flex-col gap-10">
                    <Description
                        groupName={group.title}
                        groupDescription={group.description}
                        secretDate={group.secretDate}
                        giftAmount={group.giftAmount}
                    />
                    {!!currentUser.mySecretFriend?.name && (
                        <CardRevelation
                            secretFriend={currentUser.mySecretFriend}
                        />
                    )}
                </div>
                <List
                    users={usersFiltered}
                    filtered={filtered}
                    isAdmin={currentUser.isAdmin}
                    setFiltered={setFiltered}
                    setShowModal={setShowModal}
                />
            </main>

            <RaffleModal
                showModal={showModal}
                setShowModal={setShowModal}
                users={group.users}
                secretFriend={currentUser.mySecretFriend}
                setSecretFriend={setMySecretFriend}
            />
        </>
    )
}

export default Home
