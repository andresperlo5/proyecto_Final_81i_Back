const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECT)
.then(() => console.log('Base de datos conectada'))
.catch(() => console.log('Error de conexion en la DB'))
