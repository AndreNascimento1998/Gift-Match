import CardShowParticipant from "@/components/page/Card/CardShowParticipant"
import GiftIcon from "@/components/icons/GiftIcon"
import type { User } from "@/types/CurrentUser/Index"

const CardRevelation = ({
    secretFriend,
    children,
    handleClickUser,
    showSecretName,
    setShowSecretName,
}: {
    secretFriend: User
    children?: React.ReactNode
    handleClickUser: (userId: string) => void
    showSecretName: boolean
    setShowSecretName: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <section
            onClick={() => handleClickUser(secretFriend.id)}
            className="flex flex-col gap-4 md:gap-10 bg-bg-card border border-border p-3 md:p-6 rounded-lg"
        >
            {children ? (
                children
            ) : (
                <div className="flex items-center gap-2">
                    <GiftIcon color="var(--color-primary)" />
                    <div className="text-h2 font-bold">Meu amigo secreto</div>
                </div>
            )}
            <div className="lg:w-[80%]">
                <CardShowParticipant
                    secretFriend={secretFriend}
                    showSecretName={showSecretName}
                    setShowSecretName={setShowSecretName}
                />
            </div>
        </section>
    )
}

export default CardRevelation
