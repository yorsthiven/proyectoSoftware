const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema base: Usuario
const usuarioSchema = new Schema({
    usuario: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    telefono: { type: String },
    nombre: { type: String, required: true },
    correo: { type: String }
}, { discriminatorKey: 'tipo', collection: 'usuarios', timestamps: true });

// Modelo base
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Discriminador: Cliente
const clienteSchema = new Schema({
    fechaNacimiento: { type: Date },
    genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] }
});

const Cliente = Usuario.discriminator('Cliente', clienteSchema);

// Discriminador: Administrador
const administradorSchema = new Schema({
    nivelAcceso: { type: Number, default: 1 }
});

const Administrador = Usuario.discriminator('Administrador', administradorSchema);

// Exportación
module.exports = { Usuario, Cliente, Administrador };