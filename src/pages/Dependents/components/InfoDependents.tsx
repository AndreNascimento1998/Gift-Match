import Button from "@/components/base/Button/Index"
import Dropdown from "@/components/base/Dropdown/Index"
import Input from "@/components/base/Input/Index"
import BaseModal from "@/components/base/Modal/Index"
import CopyIcon from "@/components/icons/CopyIcon"
import DepententIcons from "@/components/icons/DependentIcons"
import DropdownPoints from "@/components/icons/DropdownPoints"
import EditIcon from "@/components/icons/EditIcon"
import InterrogationIcon from "@/components/icons/InterrogationIcon"
import PlusIcon from "@/components/icons/PlusIcon"
import ProfileIcon from "@/components/icons/ProfileIcon"
import TrashIcon from "@/components/icons/TrashIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import type { Dependent } from "@/types/CurrentUser/Index"
import { Avatar } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type ModalEditNameDependentProps = {
    showModal: boolean
    setShowModal: (show: boolean) => void
    secretFriendClicked: Dependent
    setDependent: (dependent: Dependent) => void
    setUserGroup: (userGroup: Dependent) => void
}

const ModalEditNameDependent = ({
    showModal,
    setShowModal,
    secretFriendClicked,
    setDependent,
    setUserGroup,
}: ModalEditNameDependentProps) => {
    const [nameDependent, setNameDependent] = useState(
        secretFriendClicked?.name || "",
    )

    const setDefault = () => {
        setNameDependent(secretFriendClicked?.name || "")
        setShowModal(false)
    }

    const handleSave = () => {
        console.log(secretFriendClicked, "das")
        try {
            setDependent({
                ...secretFriendClicked,
                name: nameDependent,
            })
            setUserGroup({
                ...secretFriendClicked,
                name: nameDependent,
            })
            toast.success("Nome do dependente atualizado com sucesso!")
        } catch (error) {
            console.error("Erro ao atualizar o nome do dependente:", error)
            toast.error("Erro ao atualizar o nome do dependente.")
        }
    }

    return (
        <BaseModal
            open={showModal}
            onClose={setDefault}
            title={
                <div className="flex items-center gap-2">
                    <EditIcon />
                    <span>Editar nome do dependente</span>
                </div>
            }
            footer={
                <div className="w-full">
                    <Button className="w-full" onClick={handleSave}>
                        Salvar
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <span className="font-bold ">Editar o nome do dependente</span>
                <Input
                    label="Nome"
                    value={nameDependent}
                    onValueChange={(value) => setNameDependent(value)}
                />
            </div>
        </BaseModal>
    )
}

const InfoDependents = ({
    dependents,
    setDependent,
    setUserGroup,
}: {
    dependents: Dependent[]
    setDependent: (dependent: Dependent) => void
    setUserGroup: (userGroup: Dependent) => void
}) => {
    const navigate = useNavigate()
    const [showModalEditName, setShowModalEditName] = useState(false)
    const [secretFriendClicked, setSecretFriendClicked] = useState<Dependent>(
        {} as Dependent,
    )
    const [showSecretFriend, setShowSecretFriend] = useState<boolean[]>(
        new Array(dependents.length).fill(false),
    )
    const itemsDropdown = (dependent: Dependent) => {
        return [
            {
                value: "view",
                label: (
                    <div className="flex gap-2 items-center">
                        <ProfileIcon />
                        <span className="text-primary">Perfil</span>
                    </div>
                ),
                // TODO: trocar pela página de perfil do dependente quando existir
                onClick: () => navigate(`/user-information/${dependent.id}`),
            },
            {
                value: "edit",
                label: (
                    <div className="flex gap-2 items-center">
                        <EditIcon />
                        <span className="text-primary">Editar Nome</span>
                    </div>
                ),
                onClick: () => {
                    const newDependent = dependent
                    setSecretFriendClicked(newDependent)
                    setShowModalEditName(true)
                },
            },
            {
                value: "secret",
                label: (
                    <div className="flex gap-1 items-center">
                        <CopyIcon />
                        <span className="text-primary">Ver amigo secreto</span>
                    </div>
                ),
                onClick: () =>
                    navigate(
                        `/user-information/${dependent.mySecretFriend?.id}`,
                    ),
            },
            {
                value: "remove",
                label: (
                    <div className="flex gap-1 items-center">
                        <TrashIcon />
                        <span className="text-primary">Remover dependente</span>
                    </div>
                ),
                onClick: () => {
                    // TODO: remover dependente
                },
            },
        ]
    }

    return (
        <div className="flex flex-col gap-4 md:gap-10 animation-translateX">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <DepententIcons
                        color="var(--color-primary)"
                        width={"32"}
                        height={"32"}
                    />
                    <span className="text-h2 lg:text-h1 font-bold text-primary ">
                        Dependentes
                    </span>
                </div>

                <div className="w-full border border-dashed border-primary" />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2 border border-primary p-2 rounded-lg bg-primary-hover">
                <InterrogationIcon />
                <span>
                    Dependentes são participantes que não possuem celular ou
                    e-mail próprio.Você será o responsável por gerenciar o
                    sorteio e as informações deles.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                {dependents &&
                    dependents.map((dependent, index) => (
                        <div
                            className={`flex justify-between items-center gap-2 h-22.5 border border-border py-2 px-4 md:py-4 md:px-6 rounded-lg hover:bg-primary-hover cursor-pointer bg-bg-card animate-fade-in`}
                            key={dependent.id}
                        >
                            <div className="flex items-center gap-8 truncate pr-5 text-ellipsis">
                                <Avatar
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        bgcolor:
                                            GenerateRandomColor.generateColor(
                                                dependent.name,
                                            ),
                                    }}
                                >
                                    {dependent.name[0]}
                                    {dependent.name.split(" ")[1]?.[0] ?? ""}
                                </Avatar>
                                <div className="flex flex-col truncate">
                                    <span className="truncate">
                                        {dependent.name}
                                    </span>

                                    <div className="flex gap-2">
                                        <span>Amigo sorteado:</span>
                                        {showSecretFriend[index] && (
                                            <span className="truncate text-primary">
                                                {dependent.mySecretFriend?.name}
                                            </span>
                                        )}
                                        {!showSecretFriend[index] && (
                                            <span
                                                onClick={() => {
                                                    const newShowSecretFriend =
                                                        [...showSecretFriend]
                                                    newShowSecretFriend[index] =
                                                        true
                                                    setShowSecretFriend(
                                                        newShowSecretFriend,
                                                    )
                                                }}
                                                className="truncate text-primary"
                                            >
                                                Oculto
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Dropdown items={itemsDropdown(dependent)}>
                                <div className="flex justify-center w-10 cursor-pointer">
                                    <DropdownPoints />
                                </div>
                            </Dropdown>
                        </div>
                    ))}
                {!dependents.length && (
                    <div>Você não tem dependentes cadastrados.</div>
                )}
            </div>
            <Button variant="outlined">
                <div className="flex items-center gap-2">
                    <PlusIcon />
                    <span>Adicionar dependente</span>
                </div>
            </Button>
            <ModalEditNameDependent
                key={secretFriendClicked?.id ?? "no-dependent"}
                showModal={showModalEditName}
                setShowModal={setShowModalEditName}
                secretFriendClicked={secretFriendClicked}
                setDependent={setDependent}
                setUserGroup={setUserGroup}
            />
        </div>
    )
}

export default InfoDependents
