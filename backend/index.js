import express from "express"
import dotenv  from "dotenv"
import cors from "cors"

import {con} from "./config/db.js"
import routeRoutes from "./routes/routeRoutes.js"
import driversRoutes from "./routes/driverRoutes.js"

const app = express()
app.use(express.json())
dotenv.config()
con() // Conectar a la base de datos

app.use(cors())

const port = process.env.PORT || 4000

app.use("/", routeRoutes)
app.use("/", driversRoutes)

app.listen(port, () => {
   console.log(`Puerto ${port} escuchando`)
})