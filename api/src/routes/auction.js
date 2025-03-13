const express = require('express');
const router = express.Router();
const { setAuction, getAuction, getAuctionById, deleteAuction, updateApproval } = require('../controllers/auction');

router.route('/set').post(setAuction)
router.route('/get').get(getAuction)
router.route('/getById/:id').get(getAuctionById)
router.route('/delete/:id').patch(deleteAuction)
router.route('/updateApproval/:id').put(updateApproval)

module.exports = router