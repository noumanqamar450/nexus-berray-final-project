const mongoose = require('mongoose')
const File = require("../files/files.model")

const schema = mongoose.Schema({
    mainBanner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: File,
    }]
}, {
    'timestamps': true
})

module.exports = mongoose.model('MainBanner', schema);