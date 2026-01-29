import { Avatar } from "@mui/material"
import useHeader from "./hooks/useHeader"

const HeaderDefault = () => {
    const header = useHeader()
    const { toggleTheme } = header

    return (
        <header className="flex justify-between items-center py-4 px-8 md:px-20 rounded-lg lg:rounded-none bg-secondary">
            <Avatar
                sx={{
                    bgcolor: "third.main",
                    cursor: "pointer",
                }}
                onClick={toggleTheme}
            >
                A
            </Avatar>
        </header>
    )
}

export default HeaderDefault
