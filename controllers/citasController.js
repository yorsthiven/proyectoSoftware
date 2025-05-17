const Cita = require('../models/Cita')
const asyncHandler = require('express-async-handler')

// @desc Obtener todas las citas
// @route GET /citas
// @access Private
const obtenerCitas = asyncHandler(async (req, res) => {
    const citas = await Cita.find()
        .populate('cliente', 'nombre email') // Ajusta los campos según tu modelo de Usuario
        .populate({
            path: 'horarioServicio',
            populate: [
                { path: 'servicio', select: 'nombre' },
                { path: 'estilista', select: 'nombre' }
            ]
        })
        .lean()

    if (!citas?.length) {
        return res.status(400).json({ message: 'No se encontraron citas' })
    }

    res.json(citas)
})

// @desc Crear una nueva cita
// @route POST /citas
// @access Private
const crearNuevaCita = asyncHandler(async (req, res) => {
    const { cliente, horarioServicio } = req.body

    if (!cliente || !horarioServicio) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    const citaExiste = await Cita.findOne({ cliente, horarioServicio }).lean().exec()
    if (citaExiste) {
        return res.status(409).json({ message: 'Ya existe una cita para ese horario y cliente' })
    }

    const cita = await Cita.create({ cliente, horarioServicio })

    if (cita) {
        res.status(201).json({ message: 'Cita creada exitosamente' })
    } else {
        res.status(400).json({ message: 'Datos inválidos' })
    }
})

// @desc Modificar una cita
// @route PATCH /citas
// @access Private
const modificarCita = asyncHandler(async (req, res) => {
    const { id, cliente, horarioServicio, confirmacionCita } = req.body

    if (!id || !cliente || !horarioServicio || typeof confirmacionCita !== 'boolean') {
        return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    const cita = await Cita.findById(id).exec()
    if (!cita) {
        return res.status(404).json({ message: 'Cita no encontrada' })
    }

    cita.cliente = cliente
    cita.horarioServicio = horarioServicio
    cita.confirmacionCita = confirmacionCita

    const citaModificada = await cita.save()

    res.json({ message: 'Cita modificada exitosamente' })
})

// @desc Eliminar una cita
// @route DELETE /citas
// @access Private
const borrarCita = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'ID de la cita requerido' })
    }

    const cita = await Cita.findById(id).exec()

    if (!cita) {
        return res.status(404).json({ message: 'Cita no encontrada' })
    }

    await cita.deleteOne()

    res.json({ message: `Cita con ID ${id} eliminada` })
})

module.exports = {
    obtenerCitas,
    crearNuevaCita,
    modificarCita,
    borrarCita
}