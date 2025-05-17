const mongoose = require('mongoose')

const citaSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    horarioServicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HorarioServicio',
        required: true
    },
    confirmacionCita: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cita', citaSchema)