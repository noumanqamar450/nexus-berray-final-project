const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY

const auth = (req, res, next) => {
    try{
        const token = req.header("Authorization")
        const decodedToken = jwt.verify(token, privateKey)
        if (decodedToken._id) {
            req.userId = decodedToken._id
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized token!'
            });
        }
    } catch {
        res.status(401).json({
            message: 'Unauthorized token!'
        });
    }
}

module.exports = auth