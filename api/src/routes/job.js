const express = require('express');
const router = express.Router();
const { setJob, getJob, getJobById, deleteJob, updateStartingState, updateCompletionState } = require('../controllers/job');

router.route('/set').post(setJob)
router.route('/get').get(getJob)
router.route('/getById/:id').get(getJobById)
router.route('/delete/:id').patch(deleteJob)
router.route('/updateStartingState/:id').put(updateStartingState)
router.route('/updateCompletionState/:id').put(updateCompletionState)

module.exports = router