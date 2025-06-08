"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./NuevoDetalleVenta.module.css"

interface Medicamento {
  id: number
  descripcionMed: string | null
}

interface OrdenVenta {
  id: number
  fechaEmision: string | null
  Situacion: string | null
}

export default function NuevoDetalleVentaPage() {
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicamentosRes, ordenesRes] = await Promise.all([
          fetch("/api/medicamentos"),
          fetch("/api/ordenes-venta"),
        ])

        if (medicamentosRes.ok) {
          const medicamentos = await medicamentosRes.json()
          setMedicamentos(medicamentos)
        }

        if (ordenesRes.ok) {
          const ordenes = await ordenesRes.json()
          setOrdenesVenta(ordenes)
        }
      } catch (err) {
        console.error("Error al cargar datos:", err)
      }
    }

    fetchData()
  }, [])

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
      const dataToSend = {
        ...formData,
        NroOrdenVta: Number.parseInt(formData.NroOrdenVta),
        CodMedicamento: Number.parseInt(formData.CodMedicamento),
        cantidadRequerida: Number.parseInt(formData.cantidadRequerida.toString()),
      }

      const response = await fetch("/api/detalles-venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error("Error al crear detalle de venta")
      }

      router.push("/detalles-venta")
    } catch (err) {
      setError("Error al crear el detalle de venta")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatFechaEmision = (fecha: string | null) => {
    if (!fecha) return "Sin fecha"
    try {
      return new Date(fecha).toLocaleDateString("es-ES")
    } catch {
      return "Fecha inválida"
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nuevo Detalle de Venta</h1>

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
                {orden.id} - {orden.Situacion} ({formatFechaEmision(orden.fechaEmision)})
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
            {loading ? "Guardando..." : "Guardar Detalle"}
          </button>
          <button type="button" onClick={() => router.push("/detalles-venta")} className={styles.btnSecondary}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
