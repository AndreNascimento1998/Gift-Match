import CardShowParticipant from "@/components/base/Card/CardShowParticipant"
import type { Participant } from "@/types/Home/Index"

const CardRevelation = ({ secretFriend }: { secretFriend: Participant }) => {
    return (
        <section className="flex flex-col gap-4 md:gap-10 border border-border p-3 md:p-6 rounded-lg">
            <div>Meu amigo secreto</div>
            <div className="lg:w-[80%]">
                <CardShowParticipant secretFriend={secretFriend} />
            </div>
        </section>
    )
}

export default CardRevelation
