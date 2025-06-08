import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Obtener un medicamento por ID
// Corregir el error de params - deben ser awaited en Next.js 15
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const medicamentoId = Number.parseInt(id)
    const medicamento = await prisma.medicamento.findUnique({
      where: { id: medicamentoId },
      include: {
        tipoMedic: true,
        especialidad: true,
      },
    })

    if (!medicamento) {
      return NextResponse.json({ error: "Medicamento no encontrado" }, { status: 404 })
    }

    return NextResponse.json(medicamento)
  } catch (error) {
    console.error("Error al obtener medicamento:", error)
    return NextResponse.json({ error: "Error al obtener medicamento" }, { status: 500 })
  }
}

// PUT - Actualizar un medicamento
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const medicamentoId = Number.parseInt(id)
    const data = await request.json()

    const medicamento = await prisma.medicamento.update({
      where: { id: medicamentoId },
      data,
    })

    return NextResponse.json(medicamento)
  } catch (error) {
    console.error("Error al actualizar medicamento:", error)
    return NextResponse.json({ error: "Error al actualizar medicamento" }, { status: 500 })
  }
}

// DELETE - Eliminar un medicamento
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const medicamentoId = Number.parseInt(id)

    await prisma.medicamento.delete({
      where: { id: medicamentoId },
    })

    return NextResponse.json({ message: "Medicamento eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar medicamento:", error)
    return NextResponse.json({ error: "Error al eliminar medicamento" }, { status: 500 })
  }
}
