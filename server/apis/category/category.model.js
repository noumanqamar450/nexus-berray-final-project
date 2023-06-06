const mongoose = require("mongoose")

const File = require("../files/files.model")

const cateSchema = new mongoose.Schema({
    name: String,
    imageUrl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: File,
    },
    slug: String,
    desc: String,
    status: String,
    featured: Number,
    createdDate: String,
    updatedDate: String
},{
    'timestamps': true
});

module.exports = mongoose.model('Category', cateSchema)