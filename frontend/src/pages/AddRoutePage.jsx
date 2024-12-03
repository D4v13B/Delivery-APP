import { useEffect, useState } from "react"
import FormRoute from "../components/FormRoute"
import { clienteAxios } from "../config/ClienteAxios"
import { useRoutes } from "../hooks/useRoutes"
import { useNavigate } from "react-router-dom"

export const AddRoutePage = () => {
  const [search, setSearch] = useState("")
  const [alerta, setAlerta] = useState("")
  const { setRoute, route } = useRoutes()
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!search) {
      setAlerta({
        msg: "Por favor ingrese un valor para la búsqueda",
        error: true,
      })
      return
    }

    try {
      const { data } = await clienteAxios.get(`/routes/${search}`)
      setRoute(data)
      setAlerta("")

      if (data.inSystem) {
        navigate(`/router-detail/${data.id}`)
      }
    } catch (error) {
      console.log(error)
      setRoute({})
      setAlerta({
        msg: error.response?.data?.msg || "Hubo un error al buscar la ruta",
        error: true,
      })
    }
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
      setSearch("")
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Añadir Ruta</h1>

        {/* Buscar ruta */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar ruta..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {alerta && (
          <div
            className={`p-3 mb-3 rounded-lg text-center ${
              !alerta.error
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {alerta.msg || "Error en la operación"}
          </div>
        )}

        <button
          className="bg-indigo-600 px-5 py-2 text-white text-sm font-medium uppercase rounded-lg  hover:bg-indigo-700 mb-3"
          onClick={(e) => handleSearch(e)}
        >
          Buscar Ruta
        </button>
        {/* Título de la página */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Información de ruta
        </h2>

        <FormRoute />

        {/* Botón de guardar */}
        <div className="mt-6">
          <button
            className="w-full bg-indigo-600 text-white p-3 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={(e) => handleSubmit(e)}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  )
}
