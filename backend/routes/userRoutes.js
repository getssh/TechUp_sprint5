const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, getUser } = require('../controllers/userController');
const { authMiddleware, superAdminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, superAdminMiddleware, createUser);
router.put('/:id', authMiddleware, superAdminMiddleware, updateUser);
router.delete('/:id', authMiddleware, superAdminMiddleware, deleteUser);
router.get('/me', authMiddleware, getUser);

module.exports = router;
