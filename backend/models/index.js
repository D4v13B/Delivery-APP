import { sequelize } from "./../config/db.js";
import Driver from "./Driver";
import Route from "./Route";
import Order from "./Order";

//Relacionar Driver con Ruta de 1 muchos
Driver.hasMany(Route, {foreignKey: "driverId", as : "routes"})
Route.belongsTo(Driver, {foreignKey: "driverId", as: "driver"})

//Relacionar Ruta con ordenes
Route.hasMany(Order, {foreignKey: "routeId", as: "orders"})
Order.belongsTo(Route, {foreignKey: "routeId", as: "route"})

export default {
   sequelize,
   Driver,
   Route,
   Order
}