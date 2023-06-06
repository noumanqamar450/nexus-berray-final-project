const mongoose = require('mongoose')

const schema = mongoose.Schema({
    siteLogo: {
        type: String
    },
    favicon: {
        type: String
    },
    siteName: {
        type: String
    },
    shortAbout: {
        type: String
    },
    androidLink: {
        type: String
    },
    iosLink: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },
    linkedin: {
        type: String
    },
    youtube: {
        type: String
    },
    tiktok: {
        type: String
    },
    web: {
        type: String
    },
    copyright: {
        type: String
    },
    checkoutNote: {
        type: String
    },
    footerTop: {
        type: Object
    },
},{
    timestamps: true
})


module.exports = mongoose.model('setting', schema)