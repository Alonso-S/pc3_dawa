"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DateFormatter from "@/components/DateFormatter"
import styles from "./VerMedicamento.module.css"

interface Medicamento {
  id: number
  descripcionMed: string | null
  fechaFabricacion: string | null
  fechaVencimiento: string | null
  Presentacion: string | null
  stock: number | null
  precioVentaUni: number | null
  precioVentaPres: number | null
  Marca: string | null
  tipoMedic: {
    descripcion: string | null
  } | null
  especialidad: {
    descripcionEsp: string | null
  } | null
  createdAt: string
  updatedAt: string
}

export default function VerMedicamentoPage({ params }: { params: Promise<{ id: string }> }) {
  const [medicamento, setMedicamento] = useState<Medicamento | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchMedicamento = async () => {
      try {
        const resolvedParams = await params
        const response = await fetch(`/api/medicamentos/${resolvedParams.id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError("Medicamento no encontrado")
          } else {
            throw new Error("Error al cargar medicamento")
          }
          return
        }

        const data = await response.json()
        setMedicamento(data)
      } catch (err) {
        setError("Error al cargar el medicamento")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMedicamento()
  }, [params])

  const handleDelete = async () => {
    if (!medicamento) return

    if (confirm("¿Está seguro que desea eliminar este medicamento?")) {
      try {
        const response = await fetch(`/api/medicamentos/${medicamento.id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Error al eliminar medicamento")
        }

        router.push("/medicamentos")
      } catch (err) {
        setError("Error al eliminar el medicamento")
        console.error(err)
      }
    }
  }

  if (loading) return <div className={styles.loading}>Cargando medicamento...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!medicamento) return <div className={styles.error}>Medicamento no encontrado</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Detalles del Medicamento</h1>
        <div className={styles.actions}>
          <Link href={`/medicamentos/${medicamento.id}/editar`} className={styles.btnEdit}>
            Editar
          </Link>
          <button onClick={handleDelete} className={styles.btnDelete}>
            Eliminar
          </button>
          <Link href="/medicamentos" className={styles.btnBack}>
            Volver
          </Link>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información General</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>ID:</label>
              <span className={styles.value}>{medicamento.id}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Descripción:</label>
              <span className={styles.value}>{medicamento.descripcionMed || "N/A"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Marca:</label>
              <span className={styles.value}>{medicamento.Marca || "N/A"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Presentación:</label>
              <span className={styles.value}>{medicamento.Presentacion || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Fechas</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Fecha de Fabricación:</label>
              <span className={styles.value}>
                <DateFormatter date={medicamento.fechaFabricacion} />
              </span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Fecha de Vencimiento:</label>
              <span className={styles.value}>
                <DateFormatter date={medicamento.fechaVencimiento} />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Inventario y Precios</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Stock Disponible:</label>
              <span className={`${styles.value} ${medicamento.stock && medicamento.stock < 10 ? styles.lowStock : ""}`}>
                {medicamento.stock || 0} unidades
              </span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Precio Unitario:</label>
              <span className={styles.value}>S/. {medicamento.precioVentaUni || "0.00"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Precio por Presentación:</label>
              <span className={styles.value}>S/. {medicamento.precioVentaPres || "0.00"}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Clasificación</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Tipo de Medicamento:</label>
              <span className={styles.value}>{medicamento.tipoMedic?.descripcion || "N/A"}</span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Especialidad Médica:</label>
              <span className={styles.value}>{medicamento.especialidad?.descripcionEsp || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información del Sistema</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Fecha de Creación:</label>
              <span className={styles.value}>
                <DateFormatter date={medicamento.createdAt} showTime />
              </span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Última Actualización:</label>
              <span className={styles.value}>
                <DateFormatter date={medicamento.updatedAt} showTime />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
