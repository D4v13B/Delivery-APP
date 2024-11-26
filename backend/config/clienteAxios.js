import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const clienteAxios = axios.create({
   baseURL: process.env.EXTERNAL_API_URL
})

export default clienteAxios