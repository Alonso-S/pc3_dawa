import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Obtener todos los detalles de venta
export async function GET() {
  try {
    const detallesVenta = await prisma.detalleOrdenVta.findMany({
      include: {
        ordenVenta: true,
        medicamento: true,
      },
    })
    return NextResponse.json(detallesVenta)
  } catch (error) {
    console.error("Error al obtener detalles de venta:", error)
    return NextResponse.json({ error: "Error al obtener detalles de venta" }, { status: 500 })
  }
}

// POST - Crear un nuevo detalle de venta
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const detalleVenta = await prisma.detalleOrdenVta.create({
      data,
    })
    return NextResponse.json(detalleVenta, { status: 201 })
  } catch (error) {
    console.error("Error al crear detalle de venta:", error)
    return NextResponse.json({ error: "Error al crear detalle de venta" }, { status: 500 })
  }
}
