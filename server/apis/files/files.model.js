const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    fileUrl: String,
    filename: String,
    altText: String,
    size: Number
},{
    'timestamps': true
});

module.exports = mongoose.model('File', fileSchema)