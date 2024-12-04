import { useState, useEffect } from "react"
import { clienteAxios } from "../config/ClienteAxios"
import { useRoutes } from "../hooks/useRoutes"

const FormRoute = ({ routeId }) => {
  const { route, setRoute } = useRoutes()
  const [total, setTotal] = useState(0)
  const [drivers, setDrivers] = useState([])
  const [alerta, setAlerta] = useState("")

  // Cargar datos de la ruta al iniciar
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const { data } = await clienteAxios.get(`/routes/${routeId}`)
        setRoute(data) // Asignar la información de la ruta al estado
      } catch (error) {
        console.error(error)
      }
    }

    if (routeId) {
      fetchRoute()
    }
  }, [routeId, setRoute])

  // Cargar datos de conductores al iniciar
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

  // Calcular el total
  useEffect(() => {
    if (route.orders && route.orders.length > 0) {
      const totalOrders = route.orders.reduce(
        (acc, e) => acc + parseFloat(e.value || 0),
        0
      )
      setTotal(totalOrders)
    } else {
      setTotal(0)
    }
  }, [route.orders])

  const handleCheckboxChange = (event, id) => {
    const updatedOrders = route.orders.map((order) =>
      order.id === id ? { ...order, priority: event.target.checked } : order
    )
    setRoute({ ...route, orders: updatedOrders })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const rutaInfo = {
        driverId: route.driverId,
        date: route.date,
        notes: route.notes,
      }

      const ordersInfo = route.orders

      const res = await clienteAxios.post(`/routes/${route.id}`, {
        rutaInfo,
        ordersInfo,
      })

      setAlerta({ msg: res.data.msg })
      setRoute({})
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      {/* Mostrar alerta */}
      {alerta && (
        <div
          className={`p-3 mb-3 rounded-lg text-center ${
            !alerta.error ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {alerta.msg || "Error en la operación"}
        </div>
      )}

      {/* Formulario */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          placeholder="78901"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={route.id || ""}
          readOnly
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={route?.driverId || ""}
          onChange={(e) => setRoute({ ...route, driverId: e.target.value })}
        >
          {drivers.map((e) => (
            <option value={e.id} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={
            route?.date ? new Date(route.date).toISOString().split("T")[0] : ""
          }
          onChange={(e) => setRoute({ ...route, date: e.target.value })}
        />
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

      {/* Total */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-semibold text-gray-700">Valor total</span>
        <span className="text-xl font-semibold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Botón */}
      <div className="mt-6">
        <button
          className="w-full bg-indigo-600 text-white p-3 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={handleSubmit}
        >
          Guardar
        </button>
      </div>
    </>
  )
}

export default FormRoute
