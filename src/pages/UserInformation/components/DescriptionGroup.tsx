import DescriptionComponent from "@/components/page/DescriptionComponent/Index"
import type { Group } from "@/types/CurrentUser/Index"

type DescriptionGroupProps = {
    group: Group
}

const DescriptionGroup = ({ group }: DescriptionGroupProps) => {
    return (
        <div className="flex flex-col gap-2 md:gap-10">
            <div className="flex flex-col gap-2">
                <span className="text-h2 lg:text-h1 font-bold text-primary">
                    Informações do grupo
                </span>
                <div className="w-full border border-dashed border-primary" />
                <div className="flex gap-1">
                    <span>Título do grupo:</span>
                    <span className="font-bold text-primary">
                        {group.title}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <DescriptionComponent
                    groupDescription={group.description}
                    secretDate={group.secretDate}
                    giftAmount={group.giftAmount}
                />
            </div>
        </div>
    )
}

export default DescriptionGroup
