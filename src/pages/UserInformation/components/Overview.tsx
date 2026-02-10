import Button from "@/components/base/Button/Index"
import Input from "@/components/base/Input/Index"
import BaseModal from "@/components/base/Modal/Index"
import ArrowDownIcon from "@/components/icons/ArrowDownIcon"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import ChatMessageIcon from "@/components/icons/ChatMessageIcon"
import CopyIcon from "@/components/icons/CopyIcon"
import EditIcon from "@/components/icons/EditIcon"
import GiftIcon from "@/components/icons/GiftIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"
import MarkGroupIcon from "@/components/icons/MarkGroupIcon"
import MessageIcon from "@/components/icons/MessageIcon"
import TrashIcon from "@/components/icons/TrashIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import useValidations from "@/hooks/useValidation"
import type { User } from "@/types/CurrentUser/Index"
import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type OverviewProps = {
    user: User
    informationMySecretFriend: boolean
    isAdmin?: boolean
    setUserGroup: (userGroup: User) => void
}

const CardInformation = ({
    user,
    informationMySecretFriend,
}: {
    user: User
    informationMySecretFriend: boolean
}) => {
    return (
        <div className="flex flex-col gap-2 animation-translateX">
            <div className="flex flex-col gap-2">
                {informationMySecretFriend && (
                    <span className="text-h2 lg:text-h1 font-bold text-primary ">
                        Meu amigo secreto
                    </span>
                )}
                {!informationMySecretFriend && (
                    <span className="text-h2 lg:text-h1 font-bold text-primary ">
                        Perfil do Participante
                    </span>
                )}
                <div className="w-full border border-dashed border-primary" />
            </div>
            <div className="flex flex-col gap-4 border border-border bg-bg-card rounded-lg animate-fade-in p-2 md:p-4">
                <div className="flex items-center gap-4 ">
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: GenerateRandomColor.generateColor(
                                user.name || "medtlo",
                            ),
                        }}
                    >
                        {user.name ? user.name[0] : "*"}
                        {user.name ? (user.name.split(" ")[1]?.[0] ?? "") : "*"}
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-bold text-ellipsis truncate">
                            {user.name}
                        </span>
                        <span className="text-ellipsis truncate">
                            {user.email}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 items-center italic border border-border rounded-lg p-2">
                    <MessageIcon />
                    {/*TODO: Colocar aqui um recado para o participante quando tiver */}
                    <span className="text-muted">
                        Este participante ainda não tem nenhum recado.
                    </span>
                </div>
            </div>
        </div>
    )
}

const CardGift = ({ chosenGift }: { chosenGift?: string }) => {
    return (
        <div className="flex flex-col gap-4 border border-border rounded-lg bg-bg-card animation-translateX p-2 md:p-4">
            <div className="flex gap-2 items-center">
                <GiftIcon color="var(--color-primary)" />
                <span>Presentes escolhidos</span>
            </div>
            <div className="w-full border border-primary" />
            <div className="flex gap-2 border items-center border-primary rounded-lg p-2">
                <InfoCircleIcon color="var(--color-primary)" />
                {chosenGift ? (
                    <span>{chosenGift}</span>
                ) : (
                    <span className="text-muted">
                        Este participante ainda não escolheu um presente.
                    </span>
                )}
            </div>
        </div>
    )
}

const ChatMySecretFriend = () => {
    return (
        <div className="flex gap-2 justify-between items-center cursor-pointer border border-border rounded-lg bg-bg-card animation-translateX p-2 md:p-4">
            <div className="flex gap-2">
                <ChatMessageIcon />
                <div className="flex flex-col gap-2 justify-center">
                    <span className="font-bold">Conversar</span>
                    <span className="text-[14px] text-muted">
                        Amigo secreto
                    </span>
                </div>
            </div>
            <ArrowRightIcon />
        </div>
    )
}

const SectionEdit = ({
    user,
    setUserGroup,
}: {
    user: User
    setUserGroup: (userGroup: User) => void
}) => {
    const [showOptions, setShowOptions] = useState(false)
    const [codeGroup] = useState("ABCD1234")
    const [showModal, setShowModal] = useState(false)
    const [animateSucessCopy, setAnimateSucessCopy] = useState(false)
    const [userName, setUserName] = useState(user.name)
    const [userEmail, setUserEmail] = useState(user.email)
    const { requiredFields, validateRequiredFields, requiredText } =
        useValidations()

    useEffect(() => {
        if (!animateSucessCopy) return

        setTimeout(() => {
            setAnimateSucessCopy(false)
        }, 2000)
    }, [animateSucessCopy])

    const handleCopyInviteLink = async () => {
        // Montado com base na url
        // const inviteLink = `${window.location.origin}/join/${codeGroup}`
        try {
            await navigator.clipboard.writeText(codeGroup)

            toast.success(
                "Link de convite copiado para a área de transferência!",
            )

            setAnimateSucessCopy(true)
        } catch (error) {
            toast.error("Falha ao copiar o link de convite. " + error)
        }
    }

    const handleSave = () => {
        const canProceed = validateRequiredFields({
            name: userName,
            email: userEmail,
        })

        if (!canProceed) return

        setUserGroup({
            id: user.id,
            name: userName,
            email: userEmail,
        })

        toast.success("Informações do participante atualizadas com sucesso!")
        setShowModal(false)
    }

    return (
        <div className="flex flex-col gap-2 md:gap-4 border border-primary rounded-lg p-2 lg:p-6 bg-bg-card animation-translateX">
            <div
                onClick={() => setShowOptions(!showOptions)}
                className="flex gap-2 items-center"
            >
                <MarkGroupIcon />
                <div className="flex justify-between w-full">
                    <span className="text-muted font-bold">Opções</span>
                    <ArrowDownIcon
                        className={`${showOptions ? "rotate-180" : ""} transition-transform md:hidden`}
                    />
                </div>
            </div>
            <div
                className={`${showOptions ? "flex" : "hidden"} flex-col gap-2 md:flex`}
            >
                <div
                    onClick={handleCopyInviteLink}
                    className={`flex gap-2 items-center border rounded-lg p-2 cursor-pointer hover:bg-primary-hover animate-fade-in ${animateSucessCopy ? "border-success" : "border-primary"}`}
                >
                    <CopyIcon
                        color={`${animateSucessCopy ? "var(--color-success)" : "var(--color-primary)"}`}
                    />
                    <span className={animateSucessCopy ? "text-success" : ""}>
                        Copiar link de convite
                    </span>
                </div>
                <div
                    onClick={() => setShowModal(true)}
                    className="flex gap-2 items-center border border-primary rounded-lg p-2 cursor-pointer hover:bg-primary-hover animate-fade-in"
                >
                    <EditIcon />
                    <span>Editar dados</span>
                </div>
                <div className="flex gap-2 items-center border border-primary rounded-lg p-2 cursor-pointer hover:bg-primary-hover animate-fade-in">
                    <TrashIcon />
                    <span>Remover participante</span>
                </div>
            </div>
            <BaseModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={() => handleSave()}
                title={
                    <div className="flex gap-2 items-center">
                        <EditIcon />
                        <span>Editar informações</span>
                    </div>
                }
                footer={
                    <div className="w-full">
                        <Button type="submit" className="w-full">
                            Salvar
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-col gap-4">
                    <div className="text-h2 text-primary">
                        Edite as informações do participante
                    </div>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="Nome"
                            value={userName}
                            onValueChange={(value) => setUserName(value)}
                            error={Boolean(requiredFields.name)}
                            helperText={
                                requiredFields.name ? requiredText : undefined
                            }
                        />
                        <Input
                            label="Email"
                            value={userEmail}
                            onValueChange={(value) => setUserEmail(value)}
                            error={Boolean(requiredFields.email)}
                            helperText={
                                requiredFields.email ? requiredText : undefined
                            }
                        />
                    </div>
                </div>
            </BaseModal>
        </div>
    )
}

const Overview = ({
    user,
    informationMySecretFriend,
    isAdmin,
    setUserGroup,
}: OverviewProps) => {
    return (
        <div className="flex flex-col gap-4 md:gap-10">
            <CardInformation
                user={user}
                informationMySecretFriend={informationMySecretFriend}
            />
            <CardGift chosenGift={user.chosenGift} />
            {informationMySecretFriend && <ChatMySecretFriend />}
            {isAdmin && <SectionEdit user={user} setUserGroup={setUserGroup} />}
        </div>
    )
}

export default Overview
