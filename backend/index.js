import express from "express"
import dotenv  from "dotenv"
import {con} from "./config/db.js"
import routeRoutes from "./routes/routeRoutes.js"

const app = express()
app.use(express.json())
dotenv.config()
con() // Conectar a la base de datos

const port = process.env.PORT || 4000

app.use("/", routeRoutes)

app.listen(port, () => {
   console.log(`Puerto ${port} escuchando`)
})