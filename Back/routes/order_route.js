const app=require('express')
const {CreateOrder}=require('../controller/Order_controller')
const {GetUserOrders}=require('../controller/Order_controller')
const {getOrderBYid}=require('../controller/Order_controller')
const {CancelOrder}=require('../controller/Order_controller')

const authenticateToken = require('../middleware/authenticateToken'); // Adjust the path as necessary
const router=app.Router()
router.route('/creatorder').post(authenticateToken,CreateOrder)
router.route('/getuserorder').get(authenticateToken, GetUserOrders);
router.route('/getorderbyid/:id').get(authenticateToken,getOrderBYid)
router.route('/cancelorder').post(authenticateToken,CancelOrder)
module.exports = router;