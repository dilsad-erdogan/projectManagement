const express = require('express');
const router = express.Router();
const { setPeriod, getPeriod, getPeriodById, deletePeriod, updateContract, updateRevised, updateRevisedState, updateApprovalState } = require('../controllers/period');

router.route('/set').post(setPeriod)
router.route('/get').get(getPeriod)
router.route('/getById/:id').get(getPeriodById)
router.route('/delete/:id').patch(deletePeriod)
router.route('/updateContract/:id').put(updateContract)
router.route('/updateRevised/:id').put(updateRevised)
router.route('/updateRevisedState/:id').put(updateRevisedState)
router.route('/updateApprovalState/:id').put(updateApprovalState)

module.exports = router