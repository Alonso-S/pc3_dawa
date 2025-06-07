import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Obtener un detalle de venta por ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const detalleId = Number.parseInt(id)
    const detalleVenta = await prisma.detalleOrdenVta.findUnique({
      where: { id: detalleId },
      include: {
        ordenVenta: true,
        medicamento: true,
      },
    })

    if (!detalleVenta) {
      return NextResponse.json({ error: "Detalle de venta no encontrado" }, { status: 404 })
    }

    return NextResponse.json(detalleVenta)
  } catch (error) {
    console.error("Error al obtener detalle de venta:", error)
    return NextResponse.json({ error: "Error al obtener detalle de venta" }, { status: 500 })
  }
}

// PUT - Actualizar un detalle de venta
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const detalleId = Number.parseInt(id)
    const data = await request.json()

    const detalleVenta = await prisma.detalleOrdenVta.update({
      where: { id: detalleId },
      data,
    })

    return NextResponse.json(detalleVenta)
  } catch (error) {
    console.error("Error al actualizar detalle de venta:", error)
    return NextResponse.json({ error: "Error al actualizar detalle de venta" }, { status: 500 })
  }
}

// DELETE - Eliminar un detalle de venta
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const detalleId = Number.parseInt(id)

    await prisma.detalleOrdenVta.delete({
      where: { id: detalleId },
    })

    return NextResponse.json({ message: "Detalle de venta eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar detalle de venta:", error)
    return NextResponse.json({ error: "Error al eliminar detalle de venta" }, { status: 500 })
  }
}
