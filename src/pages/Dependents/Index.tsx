import Seo from "@/seo/Seo"

const Dependents = () => {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100dvh-21.8rem)]">
            <Seo
                title="Dependents"
                description="Manage your dependents and their information. Add, edit, or remove dependents from your account. Keep track of their details and ensure they are up to date for a seamless experience on our platform."
            />
        </main>
    )
}

export default Dependents
