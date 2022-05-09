const express = require('express');
const ligaControlador = require('../controllers/ligaController');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/agregarLiga', md_autenticacion.Auth ,ligaControlador.agregarLiga);// agregar administracion
api.put('/editarLiga/:idLiga', md_autenticacion.Auth ,ligaControlador.editarLiga);// editar usuario
api.get('/obtenerLigasUsuario',md_autenticacion.Auth, ligaControlador.obtenerLiga);// editar usuario
api.delete('/eliminarLiga/:idLiga',md_autenticacion.Auth ,ligaControlador.eliminarLiga);// eliminar usuario
api.put('/agregarTorneoLiga/:idTorneo/:idLiga', md_autenticacion.Auth, ligaControlador.agregarTorneoLiga)
api.put('/agregarEquipos/:idLiga', md_autenticacion.Auth, ligaControlador.agregarEquipos)

module.exports = api;