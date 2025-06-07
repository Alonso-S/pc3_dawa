"use client";

interface DateFormatterProps {
    date: string | null;
    showTime?: boolean;
}

export default function DateFormatter(
    { date, showTime = false }: DateFormatterProps,
) {
    if (!date) return <span>N/A</span>;

    const formatDate = (dateString: string) => {
        try {
            const dateObj = new Date(dateString);
            if (showTime) {
                return dateObj.toLocaleString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            }
            return dateObj.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return "Fecha inválida";
        }
    };

    return <span>{formatDate(date)}</span>;
}
