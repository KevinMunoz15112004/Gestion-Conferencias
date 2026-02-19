import { body, validationResult } from 'express-validator';

export const validarCrearReserva = [
  body('codigo')
    .notEmpty().withMessage('El código es obligatorio')
    .trim(),
  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .trim(),
  body('auditorio')
    .notEmpty().withMessage('El auditorio es obligatorio')
    .isMongoId().withMessage('El ID del auditorio no es válido'),
  body('conferencista')
    .notEmpty().withMessage('El conferencista es obligatorio')
    .isMongoId().withMessage('El ID del conferencista no es válido'),
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

export const validarActualizarReserva = [
  body('codigo')
    .optional()
    .trim(),
  body('descripcion')
    .optional()
    .trim(),
  body('auditorio')
    .optional()
    .isMongoId().withMessage('El ID del auditorio no es válido'),
  body('conferencista')
    .optional()
    .isMongoId().withMessage('El ID del conferencista no es válido'),
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
