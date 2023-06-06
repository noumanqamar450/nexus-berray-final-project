const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUserByToken, getAdminByToken, loginAdmin } = require('./user.controller');
const auth = require('./user.middleware')

// Login User
router.post('/loginAdmin', loginAdmin)

// Create User
router.post('/create', createUser);

// Login User
router.post('/login', loginUser)

//get user record by token
router.get('/getUser', auth, getUserByToken)

//get admin record by token
router.get('/getAdmin', auth, getAdminByToken)

module.exports = router;