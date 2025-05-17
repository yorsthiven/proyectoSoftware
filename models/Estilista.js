const mongoose = require('mongoose')

const estilistaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Estilista', estilistaSchema)