const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LigaSchema = Schema({
    nombre: String,
    descripcion: String,
    equipos: [{
        nombreEquipo: String, 
        ciudad: String, 
        campo: String, 
        posicion: String

    }],
    idTorneo: {type : Schema.Types.ObjectId, ref:'Torneo'},
    idUsuario: {type: Schema.Types.ObjectId, ref:'Usuario'}
});

module.exports = mongoose.model('Liga', LigaSchema);