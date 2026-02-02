import FlagBrazil from "@/components/icons/FlagBrazil"

const Footer = () => {
    return (
        <div className="flex flex-col px-8 md:px-20 gap-3 rounded-lg lg:rounded-none bg-background-default pb-8 pt-14 text-h3">
            <section className="flex flex-col md:flex-row md:justify-around md:px-10">
                <div className="flex md:block flex-col items-center">
                    <h3 className="text-h3 font-bold text-primary">
                        Amigo secreto online
                    </h3>
                    <span className="flex gap-1 items-center text-h3">
                        <FlagBrazil /> Português do Brasil
                    </span>
                </div>
                <div className="flex gap-2 flex-col items-center">
                    <span className="pb-0.5 font-bold">Plataforma</span>
                    <span className="cursor-pointer hover:text-muted">
                        Sobre
                    </span>
                    <span className="cursor-pointer hover:text-muted">
                        Como funciona?
                    </span>
                </div>
                <div className="flex gap-2 flex-col items-center">
                    <span className="pb-0.5 font-bold ">
                        Política de privacidade
                    </span>
                    <span className="cursor-pointer hover:text-muted ">
                        Termos
                    </span>
                    <span className="cursor-pointer hover:text-muted">
                        Privacidade
                    </span>
                    <span className="cursor-pointer hover:text-muted">
                        Cookies{" "}
                    </span>
                    <span className="cursor-pointer hover:text-muted">
                        Moderação
                    </span>
                </div>
            </section>
            <div className="border border-primary w-full" />
            <span className="flex justify-center">Copyright © 2026</span>
        </div>
    )
}

export default Footer
