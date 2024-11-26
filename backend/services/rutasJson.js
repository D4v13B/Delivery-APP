import clienteAxios from "../config/clienteAxios.js";

const fetchAllRoutes = async () => {
   
   try {
      const {data} = await clienteAxios("/routes")
      return data
   } catch (error) {
      console.error(error)
      return null
   }
}

const fetchRoute = async id => {

   try {
      const {data} = await clienteAxios.get(`/routes/${id}`)
      return data
   } catch (error) {
      console.error(error)
   }
}

export {
   fetchAllRoutes,
   fetchRoute
}