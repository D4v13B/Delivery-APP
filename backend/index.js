import express from "express"
import dotenv  from "dotenv"
import {con} from "./config/db.js"
import {Driver} from "./models/index.js"

const app = express()
app.use(express.json())
dotenv.config()
con() // Conectar a la base de datos

const port = process.env.PORT || 4000

app.listen(port, () => {
   console.log(`Puerto ${port} escuchando`)
})