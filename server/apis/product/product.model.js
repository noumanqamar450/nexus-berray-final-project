const mongoose = require("mongoose");
const Category = require("../category/category.model");
const File = require("../files/files.model")

const productSchema = mongoose.Schema({
    name: String,
    desc: String,
    slug: String,
    price: Number,
    salePrice: Number,
    imageUrl: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: File,
    }],
    status: String,
    featured: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    }
}, {
    'timestamps': true
});


module.exports = mongoose.model('Product', productSchema)