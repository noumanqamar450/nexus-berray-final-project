const mongoose = require('mongoose')
const File = require("../files/files.model")

const schema = mongoose.Schema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    status: {
        type: Object
    },
    setMenu: {
        type: Array
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: File,
        default: null
    },
    content: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Page', schema)