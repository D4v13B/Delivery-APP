import { useEffect } from "react"
import { useRoutes } from "../hooks/useRoutes"
import { Link, useNavigate } from "react-router-dom"

export const RoutesPage = () => {
  const { routes, setRoute } = useRoutes()
  const navigate = useNavigate()

  const handleEditRoute = (event, route, targetLink) => {
    event.preventDefault()
    setRoute(route)

    navigate(targetLink)
    console.log(route)
  }

  useEffect(() => {
    setRoute({})
  }, [])

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Rutas</h1>
        <div className="overflow-x-auto mb-10">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">
                  Ruta
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">
                  Conductor
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">
                  Fecha
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {routes.length > 0 ? (
                routes.map((e) => (
                  <tr key={e.id} className="hover:bg-indigo-50">
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 border-b">
                      {e.id}
                    </td>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 border-b">
                      {e.drivers.name}
                    </td>
                    <td className="py-3 px-6 text-sm font-medium text-gray-900 border-b">
                      {new Date(e.date).toLocaleDateString("es-PA")}
                    </td>
                    <td className="py-3 px-6 text-sm font-medium text-blue-600 hover:text-blue-800 border-b">
                      <Link
                        to={`/router-detail/${e.id}`}
                        onClick={(event) =>
                          handleEditRoute(event, e, `/router-detail/${e.id}`)
                        }
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 px-6 text-sm font-medium text-gray-500 border-b text-center"
                  >
                    No hay rutas disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link
          to={"/add-route"}
          className="bg-indigo-600 px-5 py-2 text-white text-sm font-medium uppercase rounded-lg  hover:bg-indigo-700"
        >
          + Añadir Ruta
        </Link>
      </div>
    </>
  )
}
