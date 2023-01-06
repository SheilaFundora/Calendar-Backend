const express = require('express');
const {dbconection} = require("./database/config");  //importando express
require('dotenv').config();
const cors = require('cors');


//crear el servidor express
const app = express();

//cors
app.use(cors())

//base de datos
dbconection();

//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})

//directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
//aqui lo q hacemos es que jas peticiones q vemgan en formato json se procesaran aqui y ectrearemos su ontenido
app.use(express.json());

//Rutas
app.use('/api/auth',require('./routes/auth'));






