import Button from "@/components/base/Button/Index"
import AnimatedGift from "@/components/base/Gifts/Index"
import BaseModal from "@/components/base/Modal/Index"
import type { User } from "@/types/CurrentUser/Index"
import { useEffect, useRef, useState } from "react"

type RaffleModalProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    users: User[]
    setSecretFriend: (user: User) => void
    secretFriend?: User
}

type RaffleModalInnerProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    users: User[]
    setSecretFriend: (user: User) => void
    secretFriend?: User
}

const RaffleModalInner = ({
    showModal,
    setShowModal,
    users,
    setSecretFriend,
    secretFriend,
}: RaffleModalInnerProps) => {
    const [isOpening, setIsOpening] = useState(false)
    const [confettiOn, setConfettiOn] = useState(false)
    const [celebrationKey, setCelebrationKey] = useState(0)
    const timeoutsRef = useRef<number[]>([])

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((timeoutId) =>
                window.clearTimeout(timeoutId),
            )
            timeoutsRef.current = []
        }
    }, [])

    const clearAllTimeouts = () => {
        timeoutsRef.current.forEach((timeoutId) =>
            window.clearTimeout(timeoutId),
        )
        timeoutsRef.current = []
    }

    const handleClose = () => {
        clearAllTimeouts()
        setShowModal(false)
    }

    const handleRaffle = () => {
        clearAllTimeouts()

        if (users.length === 0) return

        setIsOpening(true)
        setConfettiOn(false)
        setCelebrationKey((v) => v + 1)

        // trigger burst while opening
        timeoutsRef.current.push(
            window.setTimeout(() => {
                setConfettiOn(true)
            }, 0),
        )
        timeoutsRef.current.push(
            window.setTimeout(() => {
                setConfettiOn(false)
            }, 1100),
        )

        timeoutsRef.current.push(
            window.setTimeout(() => {
                setSecretFriend(users[0])
            }, 900),
        )
    }

    return (
        <div>
            <BaseModal
                open={showModal}
                onClose={handleClose}
                title="Sortear"
                footer={
                    <>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleRaffle}
                            disabled={
                                !!secretFriend?.name || users.length === 0
                            }
                        >
                            Sortear
                        </Button>
                    </>
                }
            >
                <div className="flex flex-col gap-3">
                    {
                        <p className="text-h2 text-primary">
                            Meu amigo secreto é...
                        </p>
                    }
                    <div className="flex justify-center animate-fade-in">
                        <AnimatedGift
                            open={isOpening || !!secretFriend?.name}
                            showConfetti={confettiOn}
                            celebrationKey={celebrationKey}
                        />
                    </div>
                    {!!secretFriend?.name && (
                        <div className="text-primary text-center text-h2 font-bold animation-translateX">
                            {secretFriend.name}
                        </div>
                    )}
                </div>
            </BaseModal>
        </div>
    )
}

const RaffleModal = ({
    showModal,
    setShowModal,
    users,
    secretFriend,
    setSecretFriend,
}: RaffleModalProps) => {
    return (
        <RaffleModalInner
            key={String(showModal)}
            showModal={showModal}
            setShowModal={setShowModal}
            users={users}
            secretFriend={secretFriend}
            setSecretFriend={setSecretFriend}
        />
    )
}

export default RaffleModal
