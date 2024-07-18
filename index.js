require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./db/config')
const cors = require('cors')
//Crear el servidor
const app = express();

//Base de datos
dbConnection();

//Escuchar peticiones

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

app.use(cors())

//*Directorio Publico
app.use(express.static('public'))

//*Lectura y parseo del body
app.use(express.json())


//*RUTAS
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))