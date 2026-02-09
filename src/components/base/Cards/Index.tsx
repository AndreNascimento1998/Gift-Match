type CardsProps = {
    children: React.ReactNode
    onClick?: () => void
}

const Card = ({ children, onClick }: CardsProps) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col gap-4 md:gap-10 border border-border p-4 bg-bg-card lg:p-6 rounded-lg"
        >
            {children}
        </div>
    )
}

export default Card
