const orderItemModel = require('../models/order-itemModel')
const OrderItem = require('../models/order-itemModel')
const order = require('../models/orderModel')

//post order
exports.postOrder = async (req, res) => {
    const orderItemIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let.newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.id
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem_id
    }))
    const orderItemIdsResolved = await orderItemIds

    //CALCULATING TOTAL PRICE
    const totalAmount = await Prmoise.all(orderItemIdsResolved.map(async orderId => {
        const itemOrder = await OrderItem.findById(orderId).populate('product', 'price')
        const total = itemOrder.quantity * itemOrder.product.product_price
        return total

        //[400,1000,300]
    }))
    const TotalPrice = totalAmount.reduce((a, b) => a + b, 0)
}