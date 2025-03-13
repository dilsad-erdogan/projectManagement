const express = require('express');
const router = express.Router();
const { setAgreement, getAgreement, getAgreementById, deleteAgreement } = require('../controllers/agreement');

router.route('/set').post(setAgreement)
router.route('/get').get(getAgreement)
router.route('/getById/:id').get(getAgreementById)
router.route('/delete/:id').patch(deleteAgreement)

module.exports = router