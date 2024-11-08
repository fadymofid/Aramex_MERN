const app=require('express')

const {AssignedOrders}=require('../controller/Admin_controller')
const {updateOrder}=require('../controller/Admin_controller')
const {deleteOrder}=require('../controller/Admin_controller')
const{getAllOrders}=require('../controller/Admin_controller')
const router = app.Router()
router.route ('/assignedorders').post(AssignedOrders)
router.route ('/updateorderstatus').put(updateOrder)
router.route ('/deleteorder').delete(deleteOrder)
router.route ('/getallorders').get(getAllOrders)

module.exports = router;