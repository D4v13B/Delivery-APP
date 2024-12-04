import { useParams, Link } from "react-router-dom"
import FormRoute from "../components/FormRoute"

const EditRoutePage = () => {
  const { id } = useParams()

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-3">
          Ver y Editar Ruta
        </h1>

        {/* Buscar ruta */}

        {/* Título de la página */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Información de ruta
        </h2>

        <FormRoute routeId={id} />
      </div>
    </>
  )
}

export default EditRoutePage
