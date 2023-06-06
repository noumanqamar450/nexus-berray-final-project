const mongoose = require('mongoose')
const File = require("../files/files.model")

const schema = mongoose.Schema({
    semiBanner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: File,
    }]
}, {
    'timestamps': true
})

module.exports = mongoose.model('SemiBanner', schema);