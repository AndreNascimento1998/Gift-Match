import Details from "./componets/Details"
import FirstStep from "./componets/FirstStep"

const RegisterPage = () => {
    return (
        <main className="grid grid-cols-2 gap-4 bg-background-default py-4 px-8 lg:border-t border-t-border shadow-2xs">
            <FirstStep />
            <Details />
        </main>
    )
}

export default RegisterPage
