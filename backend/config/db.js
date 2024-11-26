import {Sequelize} from "sequelize"

const sequelize = new Sequelize("ruta_app", "root", "", {
   host: "localhost",
   dialect: "mysql"
})

const con = async () => {
   try {
      
      await sequelize.authenticate()
      // await sequelize.sync({alter: true})

      console.log("Conexion a base de datos establecida");

   } catch (error) {
      console.error(error)
   }
}


export {
   sequelize, con
}