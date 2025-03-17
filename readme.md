# Proyecto de Gestión de Rutas

Este proyecto es una aplicación web para la gestión de rutas, donde se utilizan varias tecnologías como **Express**, **React**, **Sequelize** y **TailwindCSS**. A continuación, se detallan los pasos para la configuración, inicialización y descripción de las tecnologías utilizadas en el proyecto.

## Tecnologías utilizadas

- **Backend**: 
  - **Express.js**: Framework para la creación de la API.
  - **Sequelize**: ORM para facilitar la conexión y manejo de la base de datos MySQL.
  - **MySQL**: Gestor de base de datos para almacenar las rutas.
  
- **Frontend**: 
  - **React.js**: Biblioteca para la construcción de la interfaz de usuario.
  - **TailwindCSS**: Framework de CSS para estilizar la aplicación de manera rápida y responsiva.
  
- **API Externa**: 
  - **JSON Server**: Simula una API externa para el manejo de datos de manera local durante el desarrollo.

## Descripción del proyecto

### Backend

- **Sequelize ORM**: Utilizamos **Sequelize** como ORM para facilitar la integración de las consultas y modelos en el backend. Esto ahorra tiempo al no tener que escribir consultas SQL complejas manualmente y facilita la manipulación de los datos.

- **Transacciones**: En el momento de crear o editar rutas, usamos **transacciones** de Sequelize. Esto asegura que las operaciones de la base de datos sean atómicas y se realicen de manera limpia, manteniendo la integridad de los datos. Si alguna parte del proceso falla, todos los cambios se revierten para evitar inconsistencias.

### Frontend

- **Context API de React**: Utilizamos el **Context API** para gestionar el estado global de las rutas. Esto facilita el manejo del estado entre componentes sin necesidad de prop-drilling, especialmente para manejar rutas que se están insertando o editando.

- **Formularios de Rutas**: En el frontend, creamos formularios interactivos para la inserción y edición de rutas. Gracias al contexto de rutas, podemos controlar y actualizar el estado de las rutas de forma centralizada, haciendo más sencilla la integración con los componentes y evitando posibles errores de sincronización de datos.

- **TailwindCSS**: **TailwindCSS** es utilizado para estilizar la aplicación de forma rápida y responsiva. Esto permite que la interfaz sea moderna y adaptable a diferentes tamaños de pantalla sin necesidad de escribir CSS personalizado desde cero.


---

## Pasos para configurar el proyecto

### 1. Crear la base de datos `ruta_app`

En primer lugar, necesitas crear la base de datos en MySQL:

```sql
CREATE DATABASE ruta_app;
```

### 2. Configurar las variables de entorno
En la raíz del proyecto, crea un archivo .env con las siguientes variables de entorno dentro de la carpeta `backend`:

```
PORT=4000
DB_HOST=localhost
DB_NAME=ruta_app
DB_USER=root
DB_PASSWORD=       # Asegúrate de colocar la contraseña de tu base de datos
EXTERNAL_API_URL="http://localhost:3000"
```
Estas variables configuran el puerto para la API, la conexión a la base de datos y la URL de la API externa.

## Incializar el proyecto

#### 1. Instalar las dependencias
Primero, navega al directorio de backend y frontend para instalar las dependencias necesarias para ambos entornos:

Backend
```
cd backend
npm install  # Para instalar las dependencias del backen
``` 
Frontend 
```
cd ../frontend
npm install  # Para instalar las dependencias del frontend
```

#### 2. Inicializar la api del backend
En el directorio backend, corre los siguientes comandos para iniciar el servidor y la API externa:
```
cd backend
npm run dev  # Para iniciar el servidor de la API de backend

# Inicia la API externa con JSON Server
npx json-server --watch db.json --port 3000  # API externa en http://localhost:3000

```
#### 3. Inciar el frontend
Desde el directorio raíz del proyecto, inicia el servidor de desarrollo para el frontend:
```
cd frontend
npm run dev  # Inicia el frontend de React en http://localhost:5173
```
#### Acceder a la aplicacion
Una vez que todo esté en funcionamiento, podrás acceder a la aplicación desde el navegador en la siguiente URL:

http://localhost:5173/

