const Order = require('./order.model')

// get all order
const getOrder = async (req, res) => {

    const query = req.query
    try {
        const model = await Order.find({});
        if (query.limit && model?.length > 10) {
            const results = {};
            const limit = parseInt(query.limit);
            const page = parseInt(query.page);

            // calculating the starting and ending index
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            if (endIndex < model.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                };
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                };
            }
            const order = await Order.find({})
                .sort({ createdAt: -1 })
                .populate('userId')
                .limit(limit * 1)
                .skip((page - 1) * limit)

            results.data = order;
            res.json(results)

        } else {
            let order = {}
            order.data = await Order.find({}).sort({createdAt: -1}).populate('userId')
            res.json(order);
        }
    } catch (error) {
        res.status(400).send(error);
    }
} 

// get one order

const getOneOrder = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Order.findById(id).populate({ path: 'userId', select: '-password' })

        if (response._id) {
            res.json(response)
        } else {
            res.json({ message: 'Not find order. Try again.' })
        }

    } catch (error) {
        res.json({ message: 'Something wrong. Try again' })
    }
}


// get Status Order for dashboard

const getStatusOrder = async (req, res) => {
    const { text } = req.params
    try {
        const response = await Order.find({status: text}).select({status: 1})

        if (response[0].status) {
            res.json(response)
        } else {
            res.json({ message: 'Not find order. Try again.' })
        }

    } catch (error) {
        res.json({ message: 'Something wrong. Try again' })
    }
}

// update order

const updateOrder = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {

        const response = await Order.findByIdAndUpdate(id, {
            $set: { status }
        })

        if (response._id) {
            res.json({ status: true, message: 'Successfully Update.' })
        } else {
            res.json({ message: 'Not Update. Try again.' })
        }

    } catch (error) {
        res.json({ message: 'Something wrong. Try again' })
    }

}

// delete one order

const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        
        const response = await Order.findByIdAndDelete(id)

        if (response._id) {
            res.json({message: 'Successfully delete.'})
        } else {
            res.json({ message: 'Not deleted.' })
        }

    } catch (error) {
        res.json({ message: 'Something wrong. Try again' })
    }

}

// for frontend

const orderReceive = async (req, res) => {
    let { userId, name, email, mobile, deliveryAddress, items, totalPrice, payment, paymentMethod, note } = req.body

    try {

        let orderId = 'LFC' + Math.floor(Math.random() * 10000000)

        const order = new Order({
            orderId, userId, name, email, mobile, deliveryAddress, items, totalPrice, payment, paymentMethod, note
        })

        const response = await order.save();

        if (response._id) {
            res.json({ message: 'Order successfully received.', orderId })
        } else {
            res.json({ message: 'Order not received. Please try again' })
        }

    } catch(error) {
        res.json(error)
    }
} 



// order search
const searchOrder = async (req, res) => {
    const text = req.query.text
    try {
        let order = {}
        order.data = await Order.aggregate([
            {
                $search: {
                    index: "orderIndex",
                    text: {
                        query: text,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userId'
                }
            }
        ])
        if (order?.data?.length > 0) {
            res.json(order);
        } else {
            res.json({ status: false });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// Order Tracking
const orderTracking = async (req, res) => {
    const id = req.params.id
    try {
        let order = await Order.aggregate([
            {
                $search: {
                    index: "orderIndex",
                    text: {
                        query: id,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            },
        ])
        if (order?.length > 0) {
            res.json({ status: order[0]?.status, time: order[0]?.updatedAt });
        } else {
            res.json({ message: 'Order not found.' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Something wrong, Try again' });
    }
}

const orderForClient = async (req, res) => {
    const id = req.userId
    try {
        let order = await Order.find({userId: id}).sort({createdAt: -1})

        if (order?.length > 0) {
            res.json(order);
        } else {
            res.json({ message: 'Order not found.' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Something wrong, Try again' });
    }
}

module.exports = {
    orderReceive,
    getOrder,
    deleteOrder,
    updateOrder,
    getOneOrder,
    searchOrder,
    getStatusOrder,
    orderTracking,
    orderForClient
}