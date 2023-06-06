const express = require('express')
const router = express.Router()
const { createPage, getPage, getPageById, updatePage, deletePageById, getPageBySlug, getPageSlug } = require('./pages.controller')
const auth = require('../user/user.middleware')

// create page
router.post('/createPage', auth, createPage)

// get page
router.get('/getPage', auth, getPage)

// get page by id
router.get('/getPageById/:id', auth, getPageById)

// update page by id
router.put('/updatePage/:id', auth, updatePage)

// delete page by id
router.delete('/deletePage/:id', auth, deletePageById)

// for client side

// get page by id
router.get('/getPageBySlug/:slug', getPageBySlug)

// get page for menu
router.get('/getPageSlug/:params', getPageSlug)


module.exports = router