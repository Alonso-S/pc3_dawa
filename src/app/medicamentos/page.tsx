"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./Medicamentos.module.css"
// Importar el componente DateFormatter para evitar errores de hidratación
import DateFormatter from "@/components/DateFormatter"

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
}

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await fetch("/api/medicamentos")
        if (!response.ok) {
          throw new Error("Error al cargar medicamentos")
        }
        const data = await response.json()
        setMedicamentos(data)
      } catch (err) {
        setError("Error al cargar los medicamentos")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMedicamentos()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro que desea eliminar este medicamento?")) {
      try {
        const response = await fetch(`/api/medicamentos/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Error al eliminar medicamento")
        }

        setMedicamentos(medicamentos.filter((med) => med.id !== id))
      } catch (err) {
        setError("Error al eliminar el medicamento")
        console.error(err)
      }
    }
  }

  if (loading) return <div>Cargando medicamentos...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Medicamentos</h1>
        <Link href="/medicamentos/nuevo" className={styles.btnPrimary}>
          Nuevo Medicamento
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Presentación</th>
              <th>Stock</th>
              <th>Precio Unitario</th>
              <th>Precio Presentación</th>
              <th>Marca</th>
              <th>Fecha Fabricación</th>
              <th>Fecha Vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.length > 0 ? (
              medicamentos.map((med) => (
                <tr key={med.id}>
                  <td>{med.id}</td>
                  <td>{med.descripcionMed}</td>
                  <td>{med.Presentacion}</td>
                  <td>{med.stock}</td>
                  <td>{med.precioVentaUni}</td>
                  <td>{med.precioVentaPres}</td>
                  <td>{med.Marca}</td>
                  <td>
                    <DateFormatter date={med.fechaFabricacion} />
                  </td>
                  <td>
                    <DateFormatter date={med.fechaVencimiento} />
                  </td>
                  <td className="flex gap-2">
                    <Link href={`/medicamentos/${med.id}`} className={styles.btnInfo}>
                      Ver
                    </Link>
                    <Link href={`/medicamentos/${med.id}/editar`} className={styles.btnSuccess}>
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(med.id)} className={styles.btnDanger}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No hay medicamentos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
