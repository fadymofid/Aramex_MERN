const app=require('express')
const {CreateUser,loginUser}=require('../controller/User_controller')
const router=app.Router()
router.route('/registers').post(CreateUser)
router.route('/Login').post(loginUser)
module.exports = router;