const express = require('express');
const router = express.Router();
const { setRole, getRole, getRoleById } = require('../controllers/role');

router.route('/set').post(setRole)
router.route('/get').get(getRole)
router.route('/getById/:id').get(getRoleById)

module.exports = router