const express = require('express')
const router = express.Router()
const { createBanner, getBanner, updateBanner, deleteBanner } = require('./mainBanner.controller')
const auth = require('../user/user.middleware')

// create banner
router.post('/create', auth, createBanner);

// get banner
router.get('/view', auth, getBanner);

// update banner
router.put('/update/:id', auth, updateBanner);

// delete banner
router.delete('/delete/:id', auth, deleteBanner);

// This apis for client side
// get banner
router.get('/client/view', getBanner);

module.exports = router