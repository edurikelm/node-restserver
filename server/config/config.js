//==========================
//Puerto
//==========================

process.env.PORT = process.env.PORT || 3000;


//==========================
//Entorno
//==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========================
//Vencimiento del Token
//==========================
//60 Segundos
//60 Minutos
//24 Horas
//30 Días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//==========================
//Seed de autenticación
//==========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//==========================
//Base de datos
//==========================

let urlBD;

if(process.env.NODE_ENV === 'dev'){

    urlBD = 'mongodb://localhost:27017/cafe';

}else{

    urlBD = process.env.MONGO_URI;

}

process.env.URLDB = urlBD;

//==========================
//Google Client ID
//==========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '815532872523-01t7q488m3su26mon1p047mitm0nq777.apps.googleusercontent.com';