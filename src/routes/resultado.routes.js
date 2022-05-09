const express = require('express');
const resultadosControlador = require('../controllers/resultadosController');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.get('/agregarResultado/:idLiga', md_autenticacion.Auth ,resultadosControlador.agregarResultado);// agregar administracion



module.exports = api;