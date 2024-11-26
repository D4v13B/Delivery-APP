import { DataTypes } from "sequelize"
import { sequilize } from "../config/db.js"

const Driver = sequilize.define("driver", 
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
      tableName: "drivers",
      timestamps: true
   }
)

export default Driver