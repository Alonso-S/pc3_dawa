"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./NuevoMedicamento.module.css"

interface TipoMedicamento {
  id: number
  descripcion: string | null
}

interface Especialidad {
  id: number
  descripcionEsp: string | null
}

export default function NuevoMedicamentoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    descripcionMed: "",
    fechaFabricacion: "",
    fechaVencimiento: "",
    Presentacion: "",
    stock: 0,
    precioVentaUni: 0,
    precioVentaPres: 0,
    CodTipoMed: "",
    Marca: "",
    CodEspec: "",
  })
  const [tiposMedicamentos, setTiposMedicamentos] = useState<TipoMedicamento[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposRes, especialidadesRes] = await Promise.all([
          fetch("/api/tipos-medicamentos"),
          fetch("/api/especialidades"),
        ])

        if (tiposRes.ok) {
          const tipos = await tiposRes.json()
          setTiposMedicamentos(tipos)
        }

        if (especialidadesRes.ok) {
          const especialidades = await especialidadesRes.json()
          setEspecialidades(especialidades)
        }
      } catch (err) {
        console.error("Error al cargar datos:", err)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const parsedValue =
      name === "stock" ||
      name === "precioVentaUni" ||
      name === "precioVentaPres" ||
      name === "CodTipoMed" ||
      name === "CodEspec"
        ? value === ""
          ? ""
          : Number(value)
        : value

    setFormData({
      ...formData,
      [name]: parsedValue,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const dataToSend = {
        ...formData,
        fechaFabricacion: formData.fechaFabricacion ? new Date(formData.fechaFabricacion).toISOString() : null,
        fechaVencimiento: formData.fechaVencimiento ? new Date(formData.fechaVencimiento).toISOString() : null,
        CodTipoMed: formData.CodTipoMed ? Number(formData.CodTipoMed) : null,
        CodEspec: formData.CodEspec ? Number(formData.CodEspec) : null,
      }

      const response = await fetch("/api/medicamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error("Error al crear medicamento")
      }

      router.push("/medicamentos")
    } catch (err) {
      setError("Error al crear el medicamento")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nuevo Medicamento</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="descripcionMed" className={styles.formLabel}>
            Descripción del Medicamento *
          </label>
          <input
            type="text"
            id="descripcionMed"
            name="descripcionMed"
            value={formData.descripcionMed}
            onChange={handleChange}
            className={styles.formControl}
            required
            placeholder="Ej: Paracetamol 500mg"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="fechaFabricacion" className={styles.formLabel}>
              Fecha de Fabricación
            </label>
            <input
              type="date"
              id="fechaFabricacion"
              name="fechaFabricacion"
              value={formData.fechaFabricacion}
              onChange={handleChange}
              className={styles.formControl}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fechaVencimiento" className={styles.formLabel}>
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={handleChange}
              className={styles.formControl}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="Presentacion" className={styles.formLabel}>
              Presentación
            </label>
            <input
              type="text"
              id="Presentacion"
              name="Presentacion"
              value={formData.Presentacion}
              onChange={handleChange}
              className={styles.formControl}
              placeholder="Ej: Tabletas, Cápsulas, Jarabe"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stock" className={styles.formLabel}>
              Stock Disponible *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={styles.formControl}
              min="0"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="precioVentaUni" className={styles.formLabel}>
              Precio Venta Unitario *
            </label>
            <input
              type="number"
              step="0.01"
              id="precioVentaUni"
              name="precioVentaUni"
              value={formData.precioVentaUni}
              onChange={handleChange}
              className={styles.formControl}
              min="0"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="precioVentaPres" className={styles.formLabel}>
              Precio Venta por Presentación *
            </label>
            <input
              type="number"
              step="0.01"
              id="precioVentaPres"
              name="precioVentaPres"
              value={formData.precioVentaPres}
              onChange={handleChange}
              className={styles.formControl}
              min="0"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="Marca" className={styles.formLabel}>
              Marca
            </label>
            <input
              type="text"
              id="Marca"
              name="Marca"
              value={formData.Marca}
              onChange={handleChange}
              className={styles.formControl}
              placeholder="Ej: Bayer, Pfizer, Genérico"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="CodTipoMed" className={styles.formLabel}>
              Tipo de Medicamento
            </label>
            <select
              id="CodTipoMed"
              name="CodTipoMed"
              value={formData.CodTipoMed}
              onChange={handleChange}
              className={styles.formControl}
            >
              <option value="">Seleccione un tipo</option>
              {tiposMedicamentos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descripcion}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="CodEspec" className={styles.formLabel}>
            Especialidad Médica
          </label>
          <select
            id="CodEspec"
            name="CodEspec"
            value={formData.CodEspec}
            onChange={handleChange}
            className={styles.formControl}
          >
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.descripcionEsp}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Medicamento"}
          </button>
          <button type="button" onClick={() => router.push("/medicamentos")} className={styles.btnSecondary}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
