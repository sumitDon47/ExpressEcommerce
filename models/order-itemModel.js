const mongoose = require('mongoose')
const { objectId } = mongoose.Schema

const orderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: objectId,
        required: true,
        ref: 'Product'
    }

}, { timestamps: true })

module.exports = mongoose.model('OrderItem', orderItemSchema)