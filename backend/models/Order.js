import { DataTypes } from "sequelize"
import { sequilize } from "../config/db.js"

const Order = sequilize.define("order",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      sequence: {
         tyoe: DataTypes.INTEGER
      },
      value: {
         type: DataTypes.DECIMAL
      },
      priority: {
         type: DataTypes.BOOLEAN
      },
      routeId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'routes',
            key: 'id',
         },
      },
   },
   {
      tableName: "orders",
      timestamps: true
   }
)

export default Order