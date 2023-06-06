const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// import controller
const {
    uploadImage,
    getAllImage,
    getImageById,
    deleteImageById,
    updateImageById
} = require('./files.controller')

// image uploader
const dr = './public/upload/';
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, dr);
    },
    filename: (req, file, cd) => {
        cd(null, path.parse(file.originalname).name.toLowerCase().replace(/\s+/g, '-') + "_" + Date.now() + path.extname(file.originalname));
    },
})
const upload = multer({ storage: storage });
const auth = require('../user/user.middleware')

// image upload api
router.post('/create', auth, upload.single('image'), uploadImage);

// get all images
router.get('/view', auth, getAllImage)

// get image by id
router.get('/view/:id', auth, getImageById)

// update image by id
router.put('/update/:id', auth, updateImageById)

//delete image by id
router.delete('/delete/:id', auth, deleteImageById)

module.exports = router

