"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import DateFormatter from "@/components/DateFormatter"
import styles from "./OrdenesVenta.module.css"

interface OrdenVenta {
  id: number
  fechaEmision: string | null
  Motivo: string | null
  Situacion: string | null
  detalles: Array<{
    id: number
    cantidadRequerida: number | null
    medicamento: {
      descripcionMed: string | null
    } | null
  }>
}

export default function OrdenesVentaPage() {
  const [ordenesVenta, setOrdenesVenta] = useState<OrdenVenta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrdenesVenta = async () => {
      try {
        const response = await fetch("/api/ordenes-venta")
        if (!response.ok) {
          throw new Error("Error al cargar órdenes de venta")
        }
        const data = await response.json()
        setOrdenesVenta(data)
      } catch (err) {
        setError("Error al cargar las órdenes de venta")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrdenesVenta()
  }, [])

  if (loading) return <div>Cargando órdenes de venta...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Órdenes de Venta</h1>
        <div className="text-sm text-gray-600">
          Esta sección muestra las órdenes de venta registradas en el sistema.
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha Emisión</th>
              <th>Motivo</th>
              <th>Situación</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {ordenesVenta.length > 0 ? (
              ordenesVenta.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>
                  <td>
                    <DateFormatter date={orden.fechaEmision} showTime />
                  </td>
                  <td>{orden.Motivo || "N/A"}</td>
                  <td>
                    <span className={`${styles.status} ${orden.Situacion?.toLowerCase()}`}>
                      {orden.Situacion || "N/A"}
                    </span>
                  </td>
                  <td>
                    <Link href={`/detalles-venta?orden=${orden.id}`} className={styles.btnInfo}>
                      Ver Detalles ({orden.detalles.length})
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No hay órdenes de venta registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
