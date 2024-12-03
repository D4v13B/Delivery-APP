import { where } from "sequelize"
import { sequelize, Driver, Order, Route } from "../models/index.js"

import { fetchAllRoutes, fetchRoute } from "../services/rutasJson.js"

const getRoutes = async (req, res) => {
   const routes = await Route.findAll({
      attributes: {
         include: [
            [
               sequelize.fn("SUM", sequelize.col("orders.value")), "total"
            ]
         ]
      },
      include: [
         {
            model: Order,
            as: "orders",
            required: true
         },
         {
            model: Driver,
            as: "drivers",
            required: true
         }
      ],
      group: ["Route.id"]
   })
   res.json(routes)
}

const getRoute = async (req, res) => {
   try {
      const { id } = req.params

      //Buscamos en la base de datos
      let route = await Route.findByPk(id, {
         attributes: [
            'id',
            'driverId',
            'date',
            'notes',
            'createdAt',
            'updatedAt',
            [
               sequelize.fn('SUM', sequelize.col('orders.value')), 'total'
            ]
         ],
         include: [
            {
               model: Order,
               as: 'orders',
               required: true
            },
            {
               model: Driver,
               as: 'drivers',
               required: true
            }
         ],
         group: ['Route.id', 'orders.id', 'drivers.id'],
         order: [
            ['orders', 'sequence', 'ASC']
         ]
      });
      
      if (route) {
         const routeData = route.toJSON();
      
         // Eliminar la referencia circular de manera recursiva
         routeData.orders.forEach(order => {
            delete order.route 
         });
      
         res.json({...routeData, inSystem: true})
         return
      }

      //Si no existe en la base de datos, buscamos en el servicio externo
      route = await fetchRoute(id) //llamado al servicio externo
      if (route) {
         const total = (route.orders.reduce((sum, order) => sum + order.value, 0)).toFixed(2)
         res.json({ total, ...route })
         return
      }

      res.status(404).json({ msg: "Ruta no encontrada" })
   } catch (error) {
      res.status(400).json({ msg: "Ha ocurrido un error al momento de consultar la Ruta"+ error.message })
   }
}

const saveRoute = async (req, res) => {
   const { rutaId } = req.params
   const { rutaInfo, ordersInfo } = req.body

   const transact = await sequelize.transaction() //Utilizaremos transacciones para asegurar la integridad de los datos
   let msg
   try {

      const findRoute = await Route.findByPk(rutaId)//Vamosa a buscar el ID de la ruta en la base de datos

      if (findRoute) {

         const updatedRoute = {
            driverId: rutaInfo.driverId,
            date: rutaInfo.date,
            notes: rutaInfo.notes
         }

         await Route.update(updatedRoute, {
            where: { id: findRoute.id },
            transact,
         })

         for (let order of ordersInfo) {
            await Order.update((order), {
               where: { id: order.id },
               transact
            })
         }//Actualizamos la prioridad de las ordenes

         msg = `Ruta ${rutaId} actualizada correctamente`
      } else {
         const externalRoute = {
            id: rutaId,
            ...rutaInfo,
            orders: ordersInfo.map(order => order),
         }

         //En caso de que la ruta no exista en la base de datos
         await Route.create(externalRoute,
            {
               include: [{ model: Order, as: "orders" }],
               transact
            }
         )

         msg = `Ruta ${rutaId} guardada correctamente`
      }

      await transact.commit()
      res.json({ msg })

   } catch (error) {
      await transact.rollback()
      console.log(error)
      res.status(400).json({ msg: "Ha ocurrido un error al momento de guardar la Ruta", error: error.message })
   }
}

export {
   getRoutes,
   getRoute,
   saveRoute
}