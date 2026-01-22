import { useGlobalStore } from "@/stores/useGlobalStore"
import Button from "@mui/material/Button"

function Home() {
    const count = useGlobalStore((state) => state.count)
    const increment = useGlobalStore((state) => state.increment)

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Home</h2>
            <div className="flex items-center gap-3">
                <span>Global count: {count}</span>
                <button
                    className="px-3 py-1 border rounded"
                    onClick={increment}
                >
                    Increment
                </button>
            </div>
            <div>
                <Button variant="contained">MUI Button</Button>
            </div>
        </section>
    )
}

export default Home
