"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import DateFormatter from "@/components/DateFormatter"
import styles from "./DetallesVenta.module.css"

interface DetalleVenta {
  id: number
  NroOrdenVta: number | null
  CodMedicamento: number | null
  descripcionMed: string | null
  cantidadRequerida: number | null
  medicamento: {
    descripcionMed: string | null
  } | null
  ordenVenta: {
    fechaEmision: string | null
    Situacion: string | null
  } | null
}

export default function DetallesVentaPage() {
  const [detallesVenta, setDetallesVenta] = useState<DetalleVenta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const ordenFilter = searchParams.get("orden")

  useEffect(() => {
    const fetchDetallesVenta = async () => {
      try {
        const response = await fetch("/api/detalles-venta")
        if (!response.ok) {
          throw new Error("Error al cargar detalles de venta")
        }
        const data = await response.json()

        // Filtrar por orden si se especifica
        const filteredData = ordenFilter
          ? data.filter((detalle: DetalleVenta) => detalle.NroOrdenVta === Number.parseInt(ordenFilter))
          : data

        setDetallesVenta(filteredData)
      } catch (err) {
        setError("Error al cargar los detalles de venta")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetallesVenta()
  }, [ordenFilter])

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro que desea eliminar este detalle de venta?")) {
      try {
        const response = await fetch(`/api/detalles-venta/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Error al eliminar detalle de venta")
        }

        setDetallesVenta(detallesVenta.filter((detalle) => detalle.id !== id))
      } catch (err) {
        setError("Error al eliminar el detalle de venta")
        console.error(err)
      }
    }
  }

  if (loading) return <div>Cargando detalles de venta...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Detalles de Órdenes de Venta
          {ordenFilter && ` - Orden #${ordenFilter}`}
        </h1>
        <Link href="/detalles-venta/nuevo" className={styles.btnPrimary}>
          Nuevo Detalle de Venta
        </Link>
      </div>

      {ordenFilter && (
        <div className="mb-4">
          <Link href="/detalles-venta" className="text-blue-600 hover:underline">
            ← Ver todos los detalles
          </Link>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nro. Orden</th>
              <th>Medicamento</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Fecha Emisión</th>
              <th>Situación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detallesVenta.length > 0 ? (
              detallesVenta.map((detalle) => (
                <tr key={detalle.id}>
                  <td>{detalle.id}</td>
                  <td>{detalle.NroOrdenVta}</td>
                  <td>{detalle.CodMedicamento}</td>
                  <td>{detalle.descripcionMed || (detalle.medicamento && detalle.medicamento.descripcionMed)}</td>
                  <td>{detalle.cantidadRequerida}</td>
                  <td>
                    <DateFormatter date={detalle.ordenVenta?.fechaEmision} />
                  </td>
                  <td>{detalle.ordenVenta?.Situacion || "N/A"}</td>
                  <td className="flex gap-2">
                    <Link href={`/detalles-venta/${detalle.id}`} className={styles.btnInfo}>
                      Ver
                    </Link>
                    <Link href={`/detalles-venta/${detalle.id}/editar`} className={styles.btnSuccess}>
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(detalle.id)} className={styles.btnDanger}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  {ordenFilter
                    ? `No hay detalles para la orden #${ordenFilter}`
                    : "No hay detalles de venta registrados"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
