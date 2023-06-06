const express = require('express')
const router = express.Router()
const { orderReceive, getOrder, deleteOrder, updateOrder, getOneOrder, searchOrder, orderTracking, orderForClient, getStatusOrder } = require('./order.controller')
const auth = require('../user/user.middleware')

// for backend
// get all order
router.get('/getOrder', auth, getOrder)

// delete one order
router.delete('/delete/:id', auth, deleteOrder)

// get one order
router.get('/getOrder/:id', auth, getOneOrder)

// delete one order
router.put('/update/:id', auth, updateOrder)

// delete one order
router.get('/search', searchOrder)

// delete one order
router.get('/getStatusOrder/:text', auth, getStatusOrder)


// for client side
// order receive
router.post('/orderReceive', auth, orderReceive)

// tracking order
router.get('/tracking/:id', orderTracking)

// order for user
router.get('/orderForClient', auth, orderForClient)

module.exports = router