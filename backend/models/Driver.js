import { DataTypes } from "sequelize"
import { sequelize } from "../config/db.js"

const Driver = sequelize.define("driver",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING
      }
   },
   {
      tableName: 'drivers',
      timestamps: false,
   }

)

export default Driver