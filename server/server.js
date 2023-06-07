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

// Apis
app.use('/api/', require('./apis/routes'));

// server run
app.listen(port, ()=>{
    console.log('server started successfully.');
})