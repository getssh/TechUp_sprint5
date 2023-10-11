const express = require('express')
const router = express.Router()
const {getJobs, setJob, updateJob, deleteJob, getJob} = require('../controllers/jobController')
const {authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', authMiddleware, adminMiddleware, setJob);
router.put('/:id', authMiddleware, adminMiddleware, updateJob);
router.delete('/:id', authMiddleware, adminMiddleware, deleteJob);

// router.route('/').get(getJobs).post(setJob)
// router.route('/:id').delete(deleteJob).put(updateJob)

module.exports = router
