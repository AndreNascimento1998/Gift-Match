import Button from "@/components/base/Button/Index"
import AnimatedGift from "@/components/base/Gifts/Index"
import BaseModal from "@/components/base/Modal/Index"
import type { Participant } from "@/types/Home/Index"
import { useEffect, useRef, useState } from "react"

type RaffleModalProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    participations: Participant[]
}

type RaffleModalInnerProps = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    participations: Participant[]
}

const RaffleModalInner = ({
    showModal,
    setShowModal,
    participations,
}: RaffleModalInnerProps) => {
    const [showParticipation, setShowParticipation] = useState(false)
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

        setIsOpening(true)
        setShowParticipation(false)
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
                setShowParticipation(true)
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
                            disabled={showParticipation}
                        >
                            Sortear
                        </Button>
                    </>
                }
            >
                <div className="flex flex-col gap-3">
                    {
                        <p className="text-main text-h2">
                            Meu amigo secreto é...
                        </p>
                    }
                    <div className="flex justify-center animate-fade-in">
                        <AnimatedGift
                            open={isOpening || showParticipation}
                            showConfetti={confettiOn}
                            celebrationKey={celebrationKey}
                        />
                    </div>
                    {showParticipation && (
                        <div className="text-main text-h2 animation-translateX">
                            {participations[0].name}
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
    participations,
}: RaffleModalProps) => {
    return (
        <RaffleModalInner
            key={String(showModal)}
            showModal={showModal}
            setShowModal={setShowModal}
            participations={participations}
        />
    )
}

export default RaffleModal
