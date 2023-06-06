const express = require('express');
const router = express.Router()
const {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
    getAllCategoryForClient,
    getCategoryBySlugForClient
} = require('./category.controller')
const auth = require('../user/user.middleware')

// Get All Data
router.get('/view', auth, getAllCategory)

// Get One Data
router.get('/view/:id', auth, getCategoryById)

// Post Data
router.post('/create', auth, createCategory)

// Update Data
router.put('/update/:id', auth, updateCategoryById)

// Delete One Data
router.delete('/delete/:id', auth, deleteCategoryById)

// This apis for client side
router.get('/client/view', getAllCategoryForClient)

// category get by slug
router.get('/client/view/:slug', getCategoryBySlugForClient)

module.exports = router