import { sequelize, Driver } from "../models/index.js"

const getDrivers = async (req, res) =>{
   const drivers = await Driver.findAll()

   res.json(drivers)
}

export {getDrivers}