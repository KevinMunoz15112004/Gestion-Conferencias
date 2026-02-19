import express from 'express';
import {
  obtenerAuditorios,
  obtenerAuditorioPorId,
  crearAuditorio,
  actualizarAuditorio,
  eliminarAuditorio
} from '../controllers/auditorioController.js';
import { validarCrearAuditorio, validarActualizarAuditorio } from '../validators/auditorioValidator.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de auditorios son privadas
router.use(verificarToken);

router.get('/', obtenerAuditorios);
router.get('/:id', obtenerAuditorioPorId);
router.post('/crear', validarCrearAuditorio, crearAuditorio);
router.put('/actualizar/:id', validarActualizarAuditorio, actualizarAuditorio);
router.delete('/eliminar/:id', eliminarAuditorio);

export default router;
