import { body, validationResult } from 'express-validator';

export const validarCrearAuditorio = [
  body('codigo')
    .notEmpty().withMessage('El código es obligatorio')
    .trim(),
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('ubicacion')
    .notEmpty().withMessage('La ubicación es obligatoria')
    .trim(),
  body('capacidad')
    .notEmpty().withMessage('La capacidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor a 0'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .trim(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errores: errores.array()
      });
    }
    next();
  }
];

export const validarActualizarAuditorio = [
  body('codigo')
    .optional()
    .trim(),
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('ubicacion')
    .optional()
    .trim(),
  body('capacidad')
    .optional()
    .isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor a 0'),
  body('descripcion')
    .optional()
    .trim(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errores: errores.array()
      });
    }
    next();
  }
];
