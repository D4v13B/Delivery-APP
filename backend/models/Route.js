import { DataTypes } from "sequelize"
import { sequilize } from "../config/db.js"

const Route = sequilize.define("route",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
      },
      driverId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'drivers', // Nombre de la tabla referenciada
            key: 'id',
         },
      },
      date: {
         type: DataTypes.DATE
      },
      notes: {
         type: DataTypes.TEXT
      },
      driverId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'drivers',
            key: 'id',
         },
      },
   },
   {
      tableName: "routes",
      timestamps: true
   }
)

export default Route