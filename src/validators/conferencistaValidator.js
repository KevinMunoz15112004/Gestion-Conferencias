import { body, validationResult } from 'express-validator';

export const validarCrearConferencista = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('cedula')
    .notEmpty().withMessage('La cédula es obligatoria')
    .trim(),
  body('genero')
    .notEmpty().withMessage('El género es obligatorio')
    .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('El género debe ser Masculino, Femenino u Otro'),
  body('ciudad')
    .notEmpty().withMessage('La ciudad es obligatoria')
    .trim(),
  body('direccion')
    .notEmpty().withMessage('La dirección es obligatoria')
    .trim(),
  body('fecha_nacimiento')
    .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
    .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),
  body('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .trim(),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('empresa')
    .notEmpty().withMessage('La empresa es obligatoria')
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

export const validarActualizarConferencista = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('cedula')
    .optional()
    .trim(),
  body('genero')
    .optional()
    .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('El género debe ser Masculino, Femenino u Otro'),
  body('ciudad')
    .optional()
    .trim(),
  body('direccion')
    .optional()
    .trim(),
  body('fecha_nacimiento')
    .optional()
    .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),
  body('telefono')
    .optional()
    .trim(),
  body('email')
    .optional()
    .isEmail().withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('empresa')
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
