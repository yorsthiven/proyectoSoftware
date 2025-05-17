const mongoose = require('mongoose')

const servicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Servicio', servicioSchema)