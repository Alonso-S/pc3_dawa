"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DateFormatter from "@/components/DateFormatter"
import styles from "./VerDetalleVenta.module.css"

interface DetalleVenta {
  id: number
  NroOrdenVta: number | null
  CodMedicamento: number | null
  descripcionMed: string | null
  cantidadRequerida: number | null
  createdAt: string
  updatedAt: string
  medicamento: {
    id: number
    descripcionMed: string | null
    Marca: string | null
    Presentacion: string | null
    precioVentaUni: number | null
    stock: number | null
  } | null
  ordenVenta: {
    id: number
    fechaEmision: string | null
    Motivo: string | null
    Situacion: string | null
  } | null
}

export default function VerDetalleVentaPage({ params }: { params: Promise<{ id: string }> }) {
  const [detalleVenta, setDetalleVenta] = useState<DetalleVenta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchDetalleVenta = async () => {
      try {
        const resolvedParams = await params
        const response = await fetch(`/api/detalles-venta/${resolvedParams.id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError("Detalle de venta no encontrado")
          } else {
            throw new Error("Error al cargar detalle de venta")
          }
          return
        }

        const data = await response.json()
        setDetalleVenta(data)
      } catch (err) {
        setError("Error al cargar el detalle de venta")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetalleVenta()
  }, [params])

  const handleDelete = async () => {
    if (!detalleVenta) return

    if (confirm("¿Está seguro que desea eliminar este detalle de venta?")) {
      try {
        const response = await fetch(`/api/detalles-venta/${detalleVenta.id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Error al eliminar detalle de venta")
        }

        router.push("/detalles-venta")
      } catch (err) {
        setError("Error al eliminar el detalle de venta")
        console.error(err)
      }
    }
  }

  if (loading) return <div className={styles.loading}>Cargando detalle de venta...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!detalleVenta) return <div className={styles.error}>Detalle de venta no encontrado</div>

  const calcularTotal = () => {
    if (detalleVenta.medicamento?.precioVentaUni && detalleVenta.cantidadRequerida) {
      return (detalleVenta.medicamento.precioVentaUni * detalleVenta.cantidadRequerida).toFixed(2)
    }
    return "0.00"
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Detalle de Venta #{detalleVenta.id}</h1>
        <div className={styles.actions}>
          <Link href={`/detalles-venta/${detalleVenta.id}/editar`} className={styles.btnEdit}>
            Editar
          </Link>
          <button onClick={handleDelete} className={styles.btnDelete}>
            Eliminar
          </button>
          <Link href="/detalles-venta" className={styles.btnBack}>
            Volver
          </Link>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información de la Orden</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Número de Orden:</label>
              <span className={styles.value}>{detalleVenta.NroOrdenVta || "N/A"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Fecha de Emisión:</label>
              <span className={styles.value}>
                <DateFormatter date={detalleVenta.ordenVenta?.fechaEmision} showTime />
              </span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Motivo:</label>
              <span className={styles.value}>{detalleVenta.ordenVenta?.Motivo || "N/A"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Situación:</label>
              <span className={`${styles.value} ${styles.status} ${detalleVenta.ordenVenta?.Situacion?.toLowerCase()}`}>
                {detalleVenta.ordenVenta?.Situacion || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información del Medicamento</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Código de Medicamento:</label>
              <span className={styles.value}>{detalleVenta.CodMedicamento || "N/A"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Descripción:</label>
              <span className={styles.value}>
                {detalleVenta.descripcionMed || detalleVenta.medicamento?.descripcionMed || "N/A"}
              </span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Marca:</label>
              <span className={styles.value}>{detalleVenta.medicamento?.Marca || "N/A"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Presentación:</label>
              <span className={styles.value}>{detalleVenta.medicamento?.Presentacion || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Detalles de Venta</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Cantidad Requerida:</label>
              <span className={styles.value}>{detalleVenta.cantidadRequerida || 0} unidades</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Precio Unitario:</label>
              <span className={styles.value}>S/. {detalleVenta.medicamento?.precioVentaUni || "0.00"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Total:</label>
              <span className={`${styles.value} ${styles.total}`}>S/. {calcularTotal()}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Stock Disponible:</label>
              <span
                className={`${styles.value} ${detalleVenta.medicamento?.stock && detalleVenta.medicamento.stock < 10 ? styles.lowStock : ""}`}
              >
                {detalleVenta.medicamento?.stock || 0} unidades
              </span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información del Sistema</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Fecha de Creación:</label>
              <span className={styles.value}>
                <DateFormatter date={detalleVenta.createdAt} showTime />
              </span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Última Actualización:</label>
              <span className={styles.value}>
                <DateFormatter date={detalleVenta.updatedAt} showTime />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
