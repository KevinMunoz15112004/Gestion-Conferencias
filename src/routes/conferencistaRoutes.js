import express from 'express';
import {
  obtenerConferencistas,
  obtenerConferencistaPorId,
  crearConferencista,
  actualizarConferencista,
  eliminarConferencista
} from '../controllers/conferencistaController.js';
import { validarCrearConferencista, validarActualizarConferencista } from '../validators/conferencistaValidator.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de conferencistas son privadas
router.use(verificarToken);

router.get('/', obtenerConferencistas);
router.get('/:id', obtenerConferencistaPorId);
router.post('/crear', validarCrearConferencista, crearConferencista);
router.put('/actualizar/:id', validarActualizarConferencista, actualizarConferencista);
router.delete('/eliminar/:id', eliminarConferencista);

export default router;
