import { useMemo, useState } from "react"
import Description from "./components/Description"
import List from "./components/List"
import RaffleModal from "./components/RaffleModal"
import CardRevelation from "./components/CardRevelation"
import { useCurrentUser } from "@/stores/useCurrentUser"
import Seo from "@/seo/Seo"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const currentUser = useCurrentUser((state) => state.currentUser)
    const group = useCurrentUser((state) => state.group)
    const setMySecretFriend = useCurrentUser((state) => state.setMySecretFriend)
    const navigate = useNavigate()
    const [filtered, setFiltered] = useState("")
    const [showSecretName, setShowSecretName] = useState(
        localStorage.getItem("showSecretName") === "true" || false,
    )

    const usersFiltered = useMemo(() => {
        return group.users.filter((user) =>
            user.name.toLowerCase().includes(filtered.toLocaleLowerCase()),
        )
    }, [filtered, group.users])

    const [showModal, setShowModal] = useState(false)

    const handleClickUser = (userId: string) => {
        if (!currentUser.isAdmin) return
        // TODO: se o id do amigo manda para informação do usuario, se for o meu manda para editar perfil
        navigate(`/user-information/${userId}`)
    }

    const handleClickMySecretFriend = (userId: string) => {
        if (!currentUser.isAdmin || !showSecretName) return
        // TODO: se o id do amigo manda para informação do usuario, se for o meu manda para editar perfil
        navigate(`/user-information/${userId}`)
    }

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
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100dvh-21.8rem)]">
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
                            handleClickUser={handleClickMySecretFriend}
                            showSecretName={showSecretName}
                            setShowSecretName={setShowSecretName}
                        />
                    )}
                </div>
                <List
                    users={usersFiltered}
                    filtered={filtered}
                    isAdmin={currentUser.isAdmin}
                    setFiltered={setFiltered}
                    handleClickUser={handleClickUser}
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
