import React from "react"

type ConfettiPiece = { dx: number; dy: number; rot: number; delay: number }

const ConfettiBurst = () => {
    const pieces: ConfettiPiece[] = [
        { dx: -22, dy: -28, rot: 110, delay: 0 },
        { dx: -10, dy: -34, rot: 220, delay: 40 },
        { dx: 6, dy: -36, rot: 180, delay: 20 },
        { dx: 20, dy: -30, rot: 260, delay: 60 },
        { dx: -30, dy: -10, rot: 160, delay: 80 },
        { dx: 30, dy: -8, rot: 320, delay: 90 },
        { dx: -26, dy: 10, rot: 240, delay: 120 },
        { dx: 26, dy: 12, rot: 140, delay: 130 },
        { dx: -14, dy: 22, rot: 300, delay: 160 },
        { dx: 14, dy: 24, rot: 120, delay: 170 },
        { dx: -4, dy: 28, rot: 210, delay: 200 },
        { dx: 4, dy: 30, rot: 30, delay: 220 },
    ]

    const colors = [
        "bg-primary",
        "bg-secondary",
        "bg-primary/70",
        "bg-secondary/70",
    ]

    return (
        <div
            className="pointer-events-none absolute inset-0 z-30 motion-reduce:hidden"
            aria-hidden="true"
        >
            {pieces.map((piece, index) => (
                <span
                    key={index}
                    className={`absolute left-1/2 top-1/2 h-2 w-1 rounded-sm ${
                        colors[index % colors.length]
                    } animate-confetti`}
                    style={
                        {
                            "--dx": `${piece.dx}px`,
                            "--dy": `${piece.dy}px`,
                            "--rot": `${piece.rot}deg`,
                            "--delay": `${piece.delay}ms`,
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    )
}

export type AnimatedGiftProps = {
    open: boolean
    showConfetti: boolean
    celebrationKey: number
    sizeClassName?: string
    svgClassName?: string
}

const AnimatedGift = ({
    open,
    showConfetti,
    celebrationKey,
    sizeClassName = "h-28 w-28",
    svgClassName = "h-20 w-20",
}: AnimatedGiftProps) => {
    return (
        <div
            className={`relative ${sizeClassName} select-none motion-reduce:animate-none`}
            aria-hidden="true"
        >
            <div className="absolute inset-0 rounded-full bg-third blur-xl" />

            {showConfetti && <ConfettiBurst key={celebrationKey} />}

            <div className="absolute left-3 top-2 h-3 w-3 rounded-full bg-secondary/40 animate-gift-sparkle motion-reduce:animate-none" />
            <div className="absolute right-4 top-5 h-2 w-2 rounded-full bg-primary/30 animate-gift-sparkle animate-gift-sparkle-delay motion-reduce:animate-none" />
            <div className="absolute left-5 bottom-4 h-2 w-2 rounded-full bg-secondary/30 animate-gift-sparkle animate-gift-sparkle-delay-2 motion-reduce:animate-none" />

            <div className="absolute inset-0 grid place-items-center animate-gift-float motion-reduce:animate-none">
                <svg
                    className={`${svgClassName} animate-gift-wiggle motion-reduce:animate-none`}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g className={open ? "animate-gift-lid-open" : ""}>
                        <path
                            className="text-primary"
                            fill="currentColor"
                            d="M10 24c0-2.2 1.8-4 4-4h36c2.2 0 4 1.8 4 4v8H10v-8z"
                            opacity="0.92"
                        />
                    </g>
                    <path
                        className="text-primary"
                        fill="currentColor"
                        d="M12 32h40v20c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V32z"
                    />
                    <path
                        className="text-secondary"
                        fill="currentColor"
                        d="M29 20h6v36h-6V20z"
                    />
                    <path
                        className="text-secondary"
                        fill="currentColor"
                        d="M10 34h44v6H10v-6z"
                        opacity="0.95"
                    />
                    <path
                        className="text-secondary"
                        fill="currentColor"
                        d="M32 12c-3.6 0-7.3 2.1-9 5.1-.7 1.2-.8 2.6-.1 3.7.9 1.6 2.9 2.1 4.6 1.2 2-.9 3.7-3.1 4.5-5.2.8 2.1 2.5 4.3 4.5 5.2 1.7.9 3.7.4 4.6-1.2.7-1.1.6-2.5-.1-3.7C39.3 14.1 35.6 12 32 12z"
                    />
                </svg>
            </div>
        </div>
    )
}

export default AnimatedGift
