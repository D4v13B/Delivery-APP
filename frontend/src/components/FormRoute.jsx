import { useState, useEffect } from "react"
import { useRoutes } from "../hooks/useRoutes"
import { clienteAxios } from "../config/ClienteAxios"

const FormRoute = () => {
  const { route, routes, setRoute } = useRoutes()

  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data } = await clienteAxios.get("/drivers")
        setDrivers(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDrivers()
  }, [])

  useEffect(() => {
    
  }, [routes, setRoute])

  const handleCheckboxChange = (event, id) => {
    const updatedOrders = route.orders.map((order) =>
      order.id === id ? { ...order, priority: event.target.checked } : order
    )
    setRoute({ ...route, orders: updatedOrders })
  }

  console.log(route)

  return (
    <>
      {/* Buscar y seleccionar campos */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* ID de la ruta */}
        <input
          type="text"
          placeholder="78901"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={route.id}
        />
        {/* Nombre del conductor */}
        <select
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={route?.driverId || ""}
          onChange={(e) =>
            setRoute({ ...route, driverId: e.target.value })
          }
        >
          {drivers.map((e) => (
            <option value={e.id} key={e.id}>
              {e.name}
            </option>
          ))}
          {/* Aquí agregarías más conductores dinámicamente */}
        </select>
        {/* Fecha */}
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={
            route?.date ? new Date(route.date).toISOString().split("T")[0] : ""
          }
          onChange={(e) => setRoute({ ...route, date: e.target.value })}
        />
        {/* Notas */}
        <textarea
          placeholder="Notas"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={route.notes || ""}
          onChange={(e) => setRoute({ ...route, notes: e.target.value })}
        />
      </div>

      {/* Tabla de órdenes */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                #
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Orden
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Valor
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Prioritario
              </th>
            </tr>
          </thead>
          <tbody>
            {route.orders && route.orders.length > 0 ? (
              route.orders.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {e.sequence}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">{e.id}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    ${e.value}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={e.priority || false}
                      onChange={(event) => handleCheckboxChange(event, e.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No hay órdenes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Valor total */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-semibold text-gray-700">Valor total</span>
        <span className="text-xl font-semibold text-gray-900">${route.total ?? 0}</span>
      </div>

      
    </>
  )
}

export default FormRoute
