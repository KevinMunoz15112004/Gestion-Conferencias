import { body, validationResult } from 'express-validator';

export const validarRegistro = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
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

export const validarLogin = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
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
