const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultadosSchema = Schema({
    numeroJornada: Number,
    equipoLocal: String,
    equipoVisitante: String, 
    campo: String, 
    cantidadGolEquipoLocal: Number, 
    cantidadGolEquipoVisitante: Number, 
    resultado: String,
    descripcion: String,
    idLiga: {type: Schema.Types.ObjectId, ref:'Liga'}
});

module.exports = mongoose.model('Resultados', ResultadosSchema);