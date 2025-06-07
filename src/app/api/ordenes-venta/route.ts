import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Obtener todas las órdenes de venta
export async function GET() {
  try {
    const ordenesVenta = await prisma.ordenVenta.findMany({
      include: {
        detalles: {
          include: {
            medicamento: true,
          },
        },
      },
    })
    return NextResponse.json(ordenesVenta)
  } catch (error) {
    console.error("Error al obtener órdenes de venta:", error)
    return NextResponse.json({ error: "Error al obtener órdenes de venta" }, { status: 500 })
  }
}

// POST - Crear una nueva orden de venta
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const ordenVenta = await prisma.ordenVenta.create({
      data,
    })
    return NextResponse.json(ordenVenta, { status: 201 })
  } catch (error) {
    console.error("Error al crear orden de venta:", error)
    return NextResponse.json({ error: "Error al crear orden de venta" }, { status: 500 })
  }
}
