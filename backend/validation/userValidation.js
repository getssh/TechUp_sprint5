const { check } = require('express-validator');

const registerValidationRules = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('role')
    .isIn(['candidate', 'admin', 'superadmin'])
    .withMessage('Role must be candidate, admin, or superadmin'),
];

const loginValidationRules = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
