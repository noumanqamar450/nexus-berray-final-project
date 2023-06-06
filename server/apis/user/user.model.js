const mongoose = require('mongoose');
var validator = require('validator');

const schema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Please enter a valid email.')
            }
        }
    },
    mobile: {
        type: String,
        required: true,
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    rule: {
        type: String,
    }
}, {
    'timestamps': true
})

module.exports = mongoose.model('User', schema);