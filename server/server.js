
require('./config/config');

const express = require('express'); //instalar
const mongoose = require('mongoose'); //instalar
const path = require('path'); //propio de node


const app = express();
const bodyParser = require('body-parser'); //instalar

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//HABILITAR CARPETA PUBLIC
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {

    if(err) throw err;

    console.log('Base de datos online!!');
  
});
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});