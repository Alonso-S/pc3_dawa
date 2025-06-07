"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./EditarDetalleVenta.module.css"

interface Medicamento {
  id: number
  descripcionMed: string | null
}

interface OrdenVenta {
  id: number
  fechaEmision: string | null
  Situacion: string | null
}

interface DetalleVenta {
  id: number
  NroOrdenVta: number | null
  CodMedicamento: number | null
  descripcionMed: string | null
  cantidadRequerida: number | null
}

export default function EditarDetalleVentaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    NroOrdenVta: "",
    CodMedicamento: "",
    descripcionMed: "",
    cantidadRequerida: 1,
  })
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [ordenesVenta, setOrdenesVenta] = useState<OrdenVenta[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params
        const [detalleRes, medicamentosRes, ordenesRes] = await Promise.all([
          fetch(`/api/detalles-venta/${resolvedParams.id}`),
          fetch("/api/medicamentos"),
          fetch("/api/ordenes-venta"),
        ])

        if (!detalleRes.ok) {
          throw new Error("Detalle de venta no encontrado")
        }

        const detalle: DetalleVenta = await detalleRes.json()

        setFormData({
          NroOrdenVta: detalle.NroOrdenVta?.toString() || "",
          CodMedicamento: detalle.CodMedicamento?.toString() || "",
          descripcionMed: detalle.descripcionMed || "",
          cantidadRequerida: detalle.cantidadRequerida || 1,
        })

        if (medicamentosRes.ok) {
          const medicamentos = await medicamentosRes.json()
          setMedicamentos(medicamentos)
        }

        if (ordenesRes.ok) {
          const ordenes = await ordenesRes.json()
          setOrdenesVenta(ordenes)
        }
      } catch (err) {
        setError("Error al cargar los datos")
        console.error(err)
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [params])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "CodMedicamento" && value) {
      const medicamento = medicamentos.find((med) => med.id === Number.parseInt(value))
      if (medicamento) {
        setFormData({
          ...formData,
          [name]: value,
          descripcionMed: medicamento.descripcionMed || "",
        })
        return
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const resolvedParams = await params
      const dataToSend = {
        ...formData,
        NroOrdenVta: Number.parseInt(formData.NroOrdenVta),
        CodMedicamento: Number.parseInt(formData.CodMedicamento),
        cantidadRequerida: Number.parseInt(formData.cantidadRequerida.toString()),
      }

      const response = await fetch(`/api/detalles-venta/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar detalle de venta")
      }

      router.push(`/detalles-venta/${resolvedParams.id}`)
    } catch (err) {
      setError("Error al actualizar el detalle de venta")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) return <div>Cargando datos...</div>
  if (error && loadingData) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Detalle de Venta</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="NroOrdenVta" className={styles.formLabel}>
            Orden de Venta *
          </label>
          <select
            id="NroOrdenVta"
            name="NroOrdenVta"
            value={formData.NroOrdenVta}
            onChange={handleChange}
            className={styles.formControl}
            required
          >
            <option value="">Seleccione una orden</option>
            {ordenesVenta.map((orden) => (
              <option key={orden.id} value={orden.id}>
                {orden.id} - {orden.Situacion} (
                {orden.fechaEmision ? new Date(orden.fechaEmision).toLocaleDateString() : "Sin fecha"})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="CodMedicamento" className={styles.formLabel}>
            Medicamento *
          </label>
          <select
            id="CodMedicamento"
            name="CodMedicamento"
            value={formData.CodMedicamento}
            onChange={handleChange}
            className={styles.formControl}
            required
          >
            <option value="">Seleccione un medicamento</option>
            {medicamentos.map((med) => (
              <option key={med.id} value={med.id}>
                {med.id} - {med.descripcionMed}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="descripcionMed" className={styles.formLabel}>
            Descripción
          </label>
          <input
            type="text"
            id="descripcionMed"
            name="descripcionMed"
            value={formData.descripcionMed}
            onChange={handleChange}
            className={styles.formControl}
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cantidadRequerida" className={styles.formLabel}>
            Cantidad Requerida *
          </label>
          <input
            type="number"
            id="cantidadRequerida"
            name="cantidadRequerida"
            value={formData.cantidadRequerida}
            onChange={handleChange}
            className={styles.formControl}
            min="1"
            required
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar Detalle"}
          </button>
          <button
            type="button"
            onClick={async () => {
              const resolvedParams = await params
              router.push(`/detalles-venta/${resolvedParams.id}`)
            }}
            className={styles.btnSecondary}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
