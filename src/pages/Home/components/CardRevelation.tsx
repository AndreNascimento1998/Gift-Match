import CardShowParticipant from "@/components/page/Card/CardShowParticipant"
import GiftIcon from "@/components/icons/GiftIcon"
import type { User } from "@/types/CurrentUser/Index"
import Card from "@/components/base/Cards/Index"

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
        <div className="animation-translateX">
            <Card onClick={() => handleClickUser(secretFriend.id)}>
                {children ? (
                    children
                ) : (
                    <div className="flex items-center gap-2">
                        <GiftIcon color="var(--color-primary)" />
                        <div className="text-h2 font-bold">
                            Meu amigo secreto
                        </div>
                    </div>
                )}
                <div className="lg:w-[80%]">
                    <CardShowParticipant
                        secretFriend={secretFriend}
                        showSecretName={showSecretName}
                        setShowSecretName={setShowSecretName}
                    />
                </div>
            </Card>
        </div>
    )
}

export default CardRevelation
