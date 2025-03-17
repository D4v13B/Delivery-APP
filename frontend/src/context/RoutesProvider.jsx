import { createContext, useEffect, useState } from "react"
import { clienteAxios } from "../config/ClienteAxios"

const RoutesContext = createContext()

export const RoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState([])
  const [route, setRoute] = useState({})

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data } = await clienteAxios("/routes")

        setRoutes(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchRoutes()
  }, [])

  return (
    <RoutesContext.Provider
      value={{
        routes,
        setRoute,
        route
      }}
    >
      {children}
    </RoutesContext.Provider>
  )
}

export default RoutesContext