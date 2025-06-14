const mongoose = require('mongoose')

const horarioServicioSchema = new mongoose.Schema({
    estilista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estilista',
        required: true
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('HorarioServicio', horarioServicioSchema)