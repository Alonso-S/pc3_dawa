export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Sistema de Gestión de Farmacia</h1>
      <p className="mb-4">
        Bienvenido al sistema de gestión de farmacia. Utilice la barra de navegación para acceder a las diferentes
        secciones.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Medicamentos</h2>
          <p>
            Gestione el inventario de medicamentos, incluyendo información sobre fabricación, vencimiento y precios.
          </p>
        </div>

        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Órdenes de Venta</h2>
          <p>Administre las órdenes de venta y sus detalles, incluyendo medicamentos vendidos y cantidades.</p>
        </div>
      </div>
    </div>
  )
}
