const express = require('express');
const torneoControlador = require('../controllers/torneoController');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/agregarTorneo', md_autenticacion.Auth ,torneoControlador.agregarTorneo);// agregar administracion
api.put('/editarTorneo/:idTorneo', md_autenticacion.Auth ,torneoControlador.editarTorneo);// editar usuario
api.get('/obtenerTorneos',md_autenticacion.Auth, torneoControlador.obtenerTorneo);// editar usuario
api.delete('/eliminarTorneo/:idTorneo',md_autenticacion.Auth ,torneoControlador.eliminarTorneo);// eliminar usuario



module.exports = api;