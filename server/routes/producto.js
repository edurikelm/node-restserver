const express = require('express');

const {
    verificaToken
} = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');


// ============================
// Mostrar todas los productos
// ============================
app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({disponible: true})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        })

});

// ============================
// Mostrar un producto por id
// ============================
app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    // let desde = req.query.desde || 0; //devuelve un string
    // desde = Number(desde);//transformamos a numero

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoBD) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoBD) {
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: 'Id no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoBD
            })

        });




});

// ============================
// Buscar productos
// ============================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: true,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

});


// ============================
// Crear un producto
// ============================
app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoBD
        })

    });


});

// ============================
// Actualizar un producto
// ============================
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = req.body;

    //verificamos si existe el id
    Producto.findByIdAndUpdate(id, {
        new: true,
        runValidators: true
    }, (err, productoBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        productoBD.nombre = body.nombre;
        productoBD.precioUni = body.precioUni;
        productoBD.disponible = body.disponible;
        productoBD.categoria = body.categoria;
        productoBD.descripcion = body.descripcion;

        productoBD.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            })

        })

    });



});

// ============================
// Borrar un producto
// ============================
app.delete('/producto/:id', (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Id no existe'
                }
            });
        }

        productoBD.disponible = false;

        productoBD.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado
            });

        });

    });

});

module.exports = app;