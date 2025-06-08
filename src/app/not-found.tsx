import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">La página que estás buscando no existe o ha sido movida.</p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Inicio
          </Link>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/medicamentos" className="text-blue-600 hover:underline">
              Medicamentos
            </Link>
            <Link href="/detalles-venta" className="text-blue-600 hover:underline">
              Detalles de Venta
            </Link>
            <Link href="/ordenes-venta" className="text-blue-600 hover:underline">
              Órdenes de Venta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
