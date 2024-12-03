import { useParams } from "react-router-dom"
import FormRoute from "../components/FormRoute"

const EditRoutePage = () => {
  const { id } = useParams()

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ver y Editar Ruta
        </h1>

        {/* Buscar ruta */}

        {/* Título de la página */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Información de ruta
        </h2>

        <FormRoute />

        {/* Botón de guardar */}
        <div className="mt-6">
          <button className="w-full bg-indigo-600 text-white p-3 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Editar
          </button>
        </div>
      </div>
    </>
  )
}

export default EditRoutePage
