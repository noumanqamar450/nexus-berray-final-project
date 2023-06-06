const express = require('express')
const router = express.Router()
const {
    getAllProduct,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    searchProduct,
    getAllProductForClient,
    getAllFeaturedProductForClient,
    getProductBySlugForClient,
    getProductByCategorySlugForClient
} = require('./product.controller')
const auth = require('../user/user.middleware')

// get all product
router.get('/view', auth, getAllProduct)

// get one product
router.get('/view/:id', auth, getProductById)

// post product 
router.post('/create', auth, createProduct)

// Update Product
router.put('/update/:id', auth, updateProductById)

// delete product
router.delete('/delete/:id', auth, deleteProductById)

// search product
router.get('/search', searchProduct)

// get all product for client
router.get('/client/view', getAllProductForClient)

// get all featured product for client
router.get('/client/featured', getAllFeaturedProductForClient)

// get product by slug for client
router.get('/client/view/:slug', getProductBySlugForClient)

// get product by category slug for client
router.get('/client/viewByCategory/:slug', getProductByCategorySlugForClient)



module.exports = router

