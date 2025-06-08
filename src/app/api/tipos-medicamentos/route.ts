import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Obtener todos los tipos de medicamentos
export async function GET() {
  try {
    const tiposMedicamentos = await prisma.tipoMedic.findMany()
    return NextResponse.json(tiposMedicamentos)
  } catch (error) {
    console.error("Error al obtener tipos de medicamentos:", error)
    return NextResponse.json({ error: "Error al obtener tipos de medicamentos" }, { status: 500 })
  }
}

// POST - Crear un nuevo tipo de medicamento
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const tipoMedicamento = await prisma.tipoMedic.create({
      data,
    })
    return NextResponse.json(tipoMedicamento, { status: 201 })
  } catch (error) {
    console.error("Error al crear tipo de medicamento:", error)
    return NextResponse.json({ error: "Error al crear tipo de medicamento" }, { status: 500 })
  }
}
