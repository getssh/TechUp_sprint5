const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { registerValidationRules, loginValidationRules } = require('../validation/userValidation');
const { validate } = require('../validation/validator');

router.post('/register', registerValidationRules, validate, registerUser);
router.post('/login', loginValidationRules, validate, loginUser);

module.exports = router;
