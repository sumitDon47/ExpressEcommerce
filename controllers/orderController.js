const OrderItemModel = require('../models/order-itemModel')
const OrderItem = require('../models/order-itemModel')
const Order = require('../models/orderModel')

//post order
exports.postOrder = async (req, res) => {
    const orderItemIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem
    }))
    const orderItemIdsResolved = await orderItemIds

    //CALCULATING TOTAL PRICE
    const totalAmount = await Promise.all(orderItemIdsResolved.map(async orderId => {
        const itemOrder = await OrderItem.findById(orderId).populate('product', 'product_price')
        const total = itemOrder.quantity * itemOrder.product.product_price
        return total

        //[400,1000,300]
    }))
    const TotalPrice = totalAmount.reduce((a, b) => a + b, 0)

    let order = new Order({
        orderItems: orderItemIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        totalPrice: TotalPrice,
        user: req.body.user
    })

    order = await order.save()
    if (!order) {
        return res.status(400).json({ error: 'something went wrong' })

    }
    res.send(order)
}

//ORDER LIST
exports.orderList = async (req, res) => {
    const order = await Order.find()
        .populate('user', 'name')
        .sort({ createdAt: -1 })
    if (!order) {
        return res.status(400).json({ error: 'something went wrong' })
    }
    res.send(order)
}