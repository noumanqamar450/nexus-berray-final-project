const express = require('express');
const router = express.Router();

// Category Api
router.use('/category', require('./category/category.route'))

//Product Api
router.use('/product', require('./product/product.route'))


// Image Api
router.use('/images', require('./files/files.route'));

// User Api
router.use('/user', require('./user/user.route'));

// Main Banner Api
router.use('/mainBanner', require('./mainBanner/mainBanner.route'));

// Semi Banner Api
router.use('/semiBanner', require('./semiBanner/semiBanner.route'));

// order Api
router.use('/order', require('./order/order.route'));

// site setting for admin
router.use('/setting', require('./siteSetting/setting.route'));

// Pages Api
router.use('/page', require('./pages/pages.route'));

module.exports = router