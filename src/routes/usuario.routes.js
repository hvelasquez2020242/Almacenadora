const express = require('express');
const usuarioControlador = require('../controllers/usuarioController');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/login', usuarioControlador.Login);// Login de Administrador y de Clientes
api.post('/agregarAdministrador', md_autenticacion.Auth ,usuarioControlador.agregarAdministrador);// agregar administracion
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth ,usuarioControlador.editarUsuario);// editar usuario
api.post('/registrar',usuarioControlador.registrarUsuario);// editar usuario
api.delete('/eliminarUsuario/:idUsuario',md_autenticacion.Auth ,usuarioControlador.eliminarUsuario);// eliminar usuario



module.exports = api;