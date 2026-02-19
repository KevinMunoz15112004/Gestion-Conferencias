import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({
                mensaje: 'El email ya está registrado'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordEncriptado = await bcrypt.hash(password, salt);

        const usuario = new Usuario({
            nombre,
            apellido,
            email,
            password: passwordEncriptado
        });

        await usuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar el usuario',
            error: error.message
        });
    }
};

export const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({
            mensaje: `Bienvenido ${usuario.nombre} ${usuario.apellido}`,
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

export const obtenerPerfilUsuario = async (req, res) => {
    try {
        res.status(200).json({
            usuario: req.usuario
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el perfil del usuario',
            error: error.message
        });
    }
};
