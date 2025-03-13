const express = require('express');
const router = express.Router();
const { login, register, getUser, getUserById, deleteUser, updateRole, updateName, updateSurname, updateEmail, updatePhone, updateAdjective, updateFeatures, updatePassword } = require('../controllers/user');

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/get').get(getUser)
router.route('/getById/:id').get(getUserById)
router.route('/deleteUser/:id').patch(deleteUser)
router.route('/updateRole/:id').put(updateRole)
router.route('/updateName/:id').put(updateName)
router.route('/updateSurname/:id').put(updateSurname)
router.route('/updateEmail/:id').put(updateEmail)
router.route('/updatePhone/:id').put(updatePhone)
router.route('/updateAdjective/:id').put(updateAdjective)
router.route('/updateFeatures/:id').put(updateFeatures)
router.route('/updatePassword/:id').put(updatePassword)

module.exports = router