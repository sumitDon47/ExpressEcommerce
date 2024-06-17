const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: ObjectId,  // Corrected to use Schema.Types.ObjectId
        required: true,
        ref: 'Product'
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', orderItemSchema);
