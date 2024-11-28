import express from "express"
const router = express.Router()

import { getRoute, getRoutes, saveRoute } from "../controller/routeController.js"

router
   .get("/routes", getRoutes)
   .get("/routes/:id", getRoute)
   .post("/routes/:rutaId", saveRoute)

export default router