const express = require('express');
const { AssignedOrders, UpdateOrderStatus } = require('../controller/Courier_controller');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.route('/assignedorders').get(authenticateToken, AssignedOrders);
router.route('/updateorderstatus').post(authenticateToken, UpdateOrderStatus);

module.exports = router;
