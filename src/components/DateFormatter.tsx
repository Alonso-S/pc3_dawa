"use client"

interface DateFormatterProps {
  date: string | null | undefined
  showTime?: boolean
  fallback?: string
}

export default function DateFormatter({ date, showTime = false, fallback = "N/A" }: DateFormatterProps) {
  if (!date) return <span>{fallback}</span>

  const formatDate = (dateString: string): string => {
    try {
      const dateObj = new Date(dateString)

      // Verificar si la fecha es válida
      if (isNaN(dateObj.getTime())) {
        return fallback
      }

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "America/Lima", // Zona horaria de Perú
      }

      if (showTime) {
        options.hour = "2-digit"
        options.minute = "2-digit"
        options.hour12 = false
      }

      return dateObj.toLocaleDateString("es-PE", options)
    } catch (error) {
      console.warn("Error formatting date:", error)
      return fallback
    }
  }

  return <span>{formatDate(date)}</span>
}
