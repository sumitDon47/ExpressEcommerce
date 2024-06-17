const express = require('express')
const { postOrder, orderList, orderDetails, updateStatus } = require('../controllers/orderController')
const router = express.Router()

router.post('/postorder', postOrder)
router.get('/orderlist', orderList)
router.get('/orderdetails/:id', orderDetails)
router.put('/updatestatus/:id', updateStatus)

module.exports = router