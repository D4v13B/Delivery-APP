import { sequelize } from "./../config/db.js";
import Driver from "./Driver.js";
import Route from "./Route.js";
import Order from "./Order.js";

//Relacionar Driver con Ruta de 1 muchos
Driver.hasMany(Route, { foreignKey: "driverId", as: "routes" })
Route.belongsTo(Driver, { foreignKey: "driverId", as: "drivers" })

//Relacionar Ruta con ordenes
Route.hasMany(Order, { foreignKey: "routeId", as: "orders" })
Order.belongsTo(Route, { foreignKey: "routeId", as: "routes" })

export  {
   sequelize,
   Driver,
   Route,
   Order,
}