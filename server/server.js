
require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

 
app.get('/usuario', function (req, res) {
  res.json('Get usuario')
})

app.post('/usuario', async (req, res) => {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
        
    } else {

        res.status(200).json({
            persona: body
        });
        
    }

    
})

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;

    res.json({
        id
    })
})

app.delete('/usuario', function (req, res) {

    res.json('Delete usuario')
})
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
})