const express = require('express')
const router = express.Router()
const auth = require('../user/user.middleware')
const { getSetting, updateSetting, getSettingForClient } = require('./setting.controller')

// getData For admin setting 
router.get('/getSetting', auth, getSetting )

// update For admin setting 
router.put('/updateSetting/:id', auth, updateSetting)

// getData For client side setting 
router.get('/getSettingForClient', getSettingForClient)

module.exports = router