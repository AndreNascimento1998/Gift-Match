export class FormatMoney {
    static toBrazilianFormat(amount: number): string {
        return amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }
}
