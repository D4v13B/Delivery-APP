import express from "express"
const router = express.Router()

import { getRoute, getRoutes, saveRoute } from "../controller/routeController.js"

router
   .get("/routes", getRoutes) //Traer las rutas guardadas en el sistema
   .get("/routes/:id", getRoute)
   .post("/routes/:rutaId", saveRoute)

export default router