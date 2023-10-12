const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/userController');
const { authMiddleware, superAdminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, superAdminMiddleware, createUser);
router.put('/:id', authMiddleware, superAdminMiddleware, updateUser);
router.delete('/:id', authMiddleware, superAdminMiddleware, deleteUser);
router.get('/:id', authMiddleware, superAdminMiddleware, getUser);
router.get('/', authMiddleware, superAdminMiddleware, getAllUsers);

module.exports = router;
