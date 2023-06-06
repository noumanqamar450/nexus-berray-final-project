const User = require('./user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY
// create user
const createUser = async (req, res) => {
    let { fullName, email, mobile, gender, password } = req.body;
    try {
        // match email and mobile number
        const matchEmail = await User.findOne({ email })
        const matchNumber = await User.findOne({ mobile })

        if (matchEmail?.email) {
            res.json({ message:'Email already exists.'})
        } else {
            
            if (matchNumber?.mobile) {
                res.json({ message: 'Mobile number already exists.' })
            } else {
                
                //convert password to hash
                const salt = bcrypt.genSaltSync(10)
                password = bcrypt.hashSync(password, salt);

                // create user
                let response = new User({
                    fullName, email, mobile, gender, password, rule:'client'
                })

                response = await response.save()
                res.json({ status: true, message: `Thank You ${response.fullName}, Your account has been created.`})
            }

        }
    } catch (err) {
        res.json({ message: "Something wrong, Please try again." })
    }
}

const loginAdmin = async (req, res) => {
    let { user, password } = req.body;

    try {
        // user check through email or mobile number
        const userMatch = await User.findOne({ $or: [{ email: user }, { mobile: user }], rule:'admin' })

        if (userMatch?.email) {

            // password check
            const pass = bcrypt.compareSync(password, userMatch.password);

            if (pass) {
                // Generate JWT Token
                let token = jwt.sign({ _id: userMatch._id }, privateKey);
                res.json({ token: token })

            } else {
                res.json({ message: 'Wrong password. Please type correct password.' })
            }
        } else {
            res.json({ message: 'User does not admin.' })
        }
    } catch (err) {
        res.json(err)
    }
}


// login user
const loginUser = async (req, res) => {
    let { user, password } = req.body;

    try {
        // user check through email or mobile number
        const userMatch = await User.find({ $or: [{ email: user }, { mobile: user }] })

        if (userMatch.length > 0) {

            // password check
            const pass = bcrypt.compareSync(password, userMatch[0].password); 

            if (pass) {

                // Generate JWT Token
                let token = jwt.sign({ _id: userMatch[0]._id }, privateKey);
                res.json({ token: token })

            } else {
                res.json({ message: 'Wrong password. Please type correct password.' })
            }
        } else {
            res.json({ message: `User doesn't exists.` })
        }
    } catch (err) {
        res.json(err)
    }
}

//get User record
const getUserByToken = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.userId })
                        .select({password:0})
        
        if (findUser.fullName) {
            res.json(findUser)
        } else {
            res.json({ message: 'User record not found.'})
        }
    } catch (error) {
        res.json({ message: 'Something wrong. Please try again'})
    }
}

//get admin record
const getAdminByToken = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.userId, rule: 'admin' })
            .select({ password: 0 })

        if (findUser.fullName) {
            res.json(findUser)
        } else {
            res.json({ message: 'Admin record not found.' })
        }
    } catch (error) {
        res.json({ message: 'Something wrong. Please try again' })
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserByToken,
    getAdminByToken,
    loginAdmin
}