import { useState } from "react"
import FormRoute from "../components/FormRoute"
import { clienteAxios } from "../config/ClienteAxios"
import { useRoutes } from "../hooks/useRoutes"
import { useNavigate, Link } from "react-router-dom"

export const AddRoutePage = () => {
  const [search, setSearch] = useState("")
  const [alerta, setAlerta] = useState("")
  const { setRoute } = useRoutes()
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

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <Link
          className="w-full bg-red-600 text-white p-1 mb-3 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          to={"/routes"}
        >
          {"<-"}Regresar
        </Link>
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-3">Añadir Ruta</h1>

        {/* Buscar ruta */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar ruta..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500  focus:border-indigo-500"
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
      </div>
    </>
  )
}
