import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Obtener todos los medicamentos
export async function GET() {
  try {
    const medicamentos = await prisma.medicamento.findMany({
      include: {
        tipoMedic: true,
        especialidad: true,
      },
    })
    return NextResponse.json(medicamentos)
  } catch (error) {
    console.error("Error al obtener medicamentos:", error)
    return NextResponse.json({ error: "Error al obtener medicamentos" }, { status: 500 })
  }
}

// POST - Crear un nuevo medicamento
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const medicamento = await prisma.medicamento.create({
      data,
    })
    return NextResponse.json(medicamento, { status: 201 })
  } catch (error) {
    console.error("Error al crear medicamento:", error)
    return NextResponse.json({ error: "Error al crear medicamento" }, { status: 500 })
  }
}
