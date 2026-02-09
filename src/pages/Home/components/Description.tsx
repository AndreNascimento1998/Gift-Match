import Bars from "@/components/base/Bars/Index"
import Button from "@/components/base/Button/Index"
import Card from "@/components/base/Cards/Index"
import ArrowDownIcon from "@/components/icons/ArrowDownIcon"
import EditIcon from "@/components/icons/EditIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"
import DescriptionComponent from "@/components/page/DescriptionComponent/Index"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type DescriptionProps = {
    groupName: string
    groupDescription: string
    secretDate: string
    giftAmount: number
}

const Description = ({
    groupName,
    groupDescription,
    secretDate,
    giftAmount,
}: DescriptionProps) => {
    const navigate = useNavigate()
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="animation-translateX">
            <Card>
                <div className="flex flex-col gap-4">
                    <h1 className="text-h2 lg:text-h1 text-primary font-bold ">
                        {groupName}
                    </h1>
                    <div className="border border-dashed border-primary" />
                </div>
                <Bars max={10} current={1} />
                <article className="flex flex-col gap-4 font-semibold">
                    <div className="flex items-center gap-2">
                        <InfoCircleIcon />
                        <div
                            onClick={() => setShowInfo(!showInfo)}
                            className="flex justify-between items-center w-full"
                        >
                            <span>Informações do grupo</span>
                            <ArrowDownIcon
                                className={`${showInfo ? "rotate-180" : ""} transition-transform md:hidden`}
                            />
                        </div>
                    </div>
                    <div
                        className={`flex-col gap-4 font-semibold md:flex ${showInfo ? "flex" : "hidden"}`}
                    >
                        <DescriptionComponent
                            groupDescription={groupDescription}
                            secretDate={secretDate}
                            giftAmount={giftAmount}
                        />
                    </div>
                </article>
                <div
                    className={`md:flex justify-center ${showInfo ? "flex" : "hidden"}`}
                >
                    <Button
                        className="w-full md:w-[80%] animate-fade-in"
                        variant="outlined"
                        onClick={() => navigate("/group-information")}
                    >
                        <div className="flex items-center gap-2">
                            <EditIcon /> <span>Editar informações</span>{" "}
                        </div>
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Description
