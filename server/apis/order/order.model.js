const mongoose = require('mongoose')
const User = require('../user/user.model')

const schema = mongoose.Schema({
    orderId : {
        type : String,
        unique : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    items : {
        type: Array,
    },
    totalPrice: {
        type: Number,
    },
    deliveryAddress: {
        type: String
    },
    note: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    paymentMethod: {
        type: String
    },
    payment: {
        type: Boolean
    }
},{
    'timestamps':true
})

module.exports = mongoose.model('Order', schema)