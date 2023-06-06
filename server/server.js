const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = 5000;

//middleware
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
require('dotenv').config()

// ------------ Database --------------
const db = require('./config/db')
db();

// Category Api
app.use('/api/category', require('./apis/category/category.route'))

//Product Api
app.use('/api/product', require('./apis/product/product.route'))


// Image Api
app.use('/api/images', require('./apis/files/files.route'));

// User Api
app.use('/api/user', require('./apis/user/user.route'));

// Main Banner Api
app.use('/api/mainBanner', require('./apis/mainBanner/mainBanner.route'));

// Semi Banner Api
app.use('/api/semiBanner', require('./apis/semiBanner/semiBanner.route'));

// order Api
app.use('/api/order', require('./apis/order/order.route'));

// site setting for admin
app.use('/api/setting', require('./apis/siteSetting/setting.route'));

// Pages Api
app.use('/api/page', require('./apis/pages/pages.route'));


// server run
app.listen(port, ()=>{
    console.log('server started successfully.');
})