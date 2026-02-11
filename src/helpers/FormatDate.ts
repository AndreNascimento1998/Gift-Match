export class FormatDate {
    static toBrazilianFormat(dateString: string): string {
        const [year, month, day] = dateString.split("-")

        return `${day}/${month}/${year}`
    }
}
