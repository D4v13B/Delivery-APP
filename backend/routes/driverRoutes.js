import express from "express"
const router = express.Router()

import { getDrivers } from "../controller/driverController.js"

router.get("/drivers", getDrivers)

export default router