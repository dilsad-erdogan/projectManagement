const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { setJob, getJob, getJobById, deleteJob, updateStartingState, updateCompletionState, uploadReport } = require('../controllers/job');

router.route('/set').post(setJob)
router.route('/get').get(getJob)
router.route('/getById/:id').get(getJobById)
router.route('/delete/:id').patch(deleteJob)
router.route('/updateStartingState/:id').put(updateStartingState)
router.route('/updateCompletionState/:id').put(updateCompletionState)
router.put("/upload-report/:id", upload.single("report"), uploadReport);

module.exports = router