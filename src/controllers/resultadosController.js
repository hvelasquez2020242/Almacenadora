const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Resultado = require('../models/resultados.model')
const Liga = require('../models/liga.model')
const mongoose = require('mongoose');



function agregarResultado(req, res) {
    const parametros = req.body;
    const idLiga = req.params.idLiga;

    if (req.user.rol == 'Usuario') {

        Liga.aggregate([
            {
                $match: { "_id": mongoose.Types.ObjectId(idLiga) }
            },
            {
                $unwind: "$equipos"
            },
            {
                $match: { "equipos.nombreEquipo": { $regex: parametros.equipoLocal, $options: 'i' } }
            },
            {
                $group: {
                    "_id": "$_id",
                    "nombre": { "$first": "$nombre" },
                    "equipos": { $push: "$equipos" }
                }
            }
        ]).exec((err, productosEncontrados) => {
            if (!productosEncontrados) return res.status(500).send({ mensaje: 'No se encontro el equipo' })
            if (productosEncontrados == '') return res.status(500).send({ mensaje: 'No se eonctro el equipo' })
            if (productosEncontrados) {
                Liga.aggregate([
                    {
                        $match: { "_id": mongoose.Types.ObjectId(idLiga) }
                    },
                    {
                        $unwind: "$equipos"
                    },
                    {
                        $match: { "equipos.nombreEquipo": { $regex: parametros.equipoVisitante, $options: 'i' } }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            "nombre": { "$first": "$nombre" },
                            "equipos": { $push: "$equipos" }
                        }
                    }
                ]).exec((err, equipoVisitanteEncontrados) => {
                    if (!productosEncontrados) return res.status(500).send({ mensaje: 'No se encontro el equipo' })
                    if (equipoVisitanteEncontrados == '') return res.status(500).send({ mensaje: 'No se eonctro el equipo visitante' })



                    if (equipoVisitanteEncontrados) {



                        Resultado.find({ idLiga: idLiga, numeroJornada: parametros.numeroJornada }, (err, resultadoObtenidos) => {
                            Liga.aggregate([
                                {
                                    $match: { "_id": mongoose.Types.ObjectId(idLiga) }
                                },
                                {
                                    $unwind: "$equipos"
                                },
                                {
                                    $match: {}
                                },
                                {
                                    $group: {
                                        "_id": "$_id",
                                        "nombre": { "$first": "$nombre" },
                                        "equipos": { $push: "$equipos" }
                                    }
                                }
                            ]).exec((err, equiposObtenidos) => {

                                const limiteJornadas = equiposObtenidos[0].equipos.length - 1;
                                const limite = limiteJornadas + 1
                                if (parametros.numeroJornada >= limite) {
                                    return res.status(500).send({ mensaje: 'Ya alcanzo las jornadas maximas' })
                                }
                                else {
                                    if (resultadoObtenidos.length >= limiteJornadas + 1) {
                                        return res.status(500).send({ mensaje: 'Partidos maximos por jornada' })
                                    }
                                    else {
                                        if (resultadoObtenidos.length >= limiteJornadas) {
                                            return res.status(500).send({ mensaje: 'Ya no puede añadir mas jornadas' })
                                        } else {
                                            const modeloResultado = new Resultado();

                                            modeloResultado.numeroJornada = parametros.numeroJornada;
                                            modeloResultado.equipoLocal = parametros.equipoLocal;
                                            modeloResultado.equipoVisitante = parametros.equipoVisitante;
                                            modeloResultado.campo = productosEncontrados[0].equipos[0].campo;
                                            modeloResultado.cantidadGolEquipoLocal = parametros.golLocal;
                                            modeloResultado.cantidadGolEquipoVisitante = parametros.golVisitante;
                                            modeloResultado.resultado = parametros.golLocal+ '-' + parametros.golVisitante;
                                            modeloResultado.idLiga = idLiga;
                                            modeloResultado.descripcion = parametros.descripcion;

                                            modeloResultado.save((err, resultadoGuardado) => {
                                                return res.status(200).send({ resultado: resultadoGuardado })
                                            })
                                        }
                                    }
                                }
                            })



                        })



                    }



                })
            }
        })

    }

}
module.exports = {

    agregarResultado
}