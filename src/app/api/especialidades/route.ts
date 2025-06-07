import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Obtener todas las especialidades
export async function GET() {
  try {
    const especialidades = await prisma.especialidad.findMany()
    return NextResponse.json(especialidades)
  } catch (error) {
    console.error("Error al obtener especialidades:", error)
    return NextResponse.json({ error: "Error al obtener especialidades" }, { status: 500 })
  }
}

// POST - Crear una nueva especialidad
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const especialidad = await prisma.especialidad.create({
      data,
    })
    return NextResponse.json(especialidad, { status: 201 })
  } catch (error) {
    console.error("Error al crear especialidad:", error)
    return NextResponse.json({ error: "Error al crear especialidad" }, { status: 500 })
  }
}
