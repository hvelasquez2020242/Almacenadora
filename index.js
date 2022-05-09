const mongoose = require('mongoose');
const app = require('./app');
const usuarioControler = require('./src/controllers/usuarioController')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Torneo', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Se ha conectado correctamente a la base de datos.');

    app.listen(3000, function (){
        console.log("Servidor de Express corriendo correctamente en el puerto 3000");
        usuarioControler.UsuarioDefault()

    });


}).catch(error => console.log(error));