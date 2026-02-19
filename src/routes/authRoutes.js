import express from 'express';
import { registrarUsuario, iniciarSesion, obtenerPerfilUsuario } from '../controllers/authController.js';
import { validarRegistro, validarLogin } from '../validators/authValidator.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', validarRegistro, registrarUsuario);
router.post('/login', validarLogin, iniciarSesion);

// Rutas privadas
router.get('/perfil', verificarToken, obtenerPerfilUsuario);

export default router;
