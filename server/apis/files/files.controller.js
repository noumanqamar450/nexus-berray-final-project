const fs = require('fs');
const File = require('./files.model')
const path = require('path');
const dr = "./public/upload/";

const uploadImage = async (req, res) => {
    const url = 'http://localhost:5000/upload/' + req.file.filename;
    const name = req.file.filename;
    const alt = path.parse(req.file.originalname).name.replaceAll('-', ' ');
    const size = req.file.size;
    try {
        let fileUpload = new File({
            fileUrl: url,
            filename: name,
            altText: alt,
            size: size
        })
        fileUpload = await fileUpload.save()
        res.json(fileUpload);
    } catch (error) {
        res.status(400).json({status: false})
    }
}

const getAllImage = async (req, res) => {
    const query = req.query
    try {
        const model = await File.find({});
        if (query.limit && model?.length > 10) {
            const results = {};
            const limit = parseInt(query.limit);
            const page = parseInt(query.page);

            // calculating the starting and ending index
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            if (endIndex < model.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                };
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                };
            }
            const files = await File.find({})
                .sort({ updatedAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)

            results.data = files;
            res.json(results)
        } else {
            let files = {};
            files.data = await File.find({}).sort({ updatedAt: -1 });
            res.json(files);
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const getImageById = async (req, res) => {
    const id = req.params.id
    try {
        let files = await File.findOne({ "_id": id });
        res.json(files);
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateImageById = async (req, res) => {
    const id = req.params.id
    const { altText } = req.body
    
    try {
        let files = await File.findOneAndUpdate({ "_id": id }, { $set: { altText }});
        res.json({status: true, data: files});
    } catch (err) {
        res.status(400).send({ status: false, data: err })
    }
}

const deleteImageById = async (req, res) => {
    const id = req.params.id
    try {
        let files = await File.findByIdAndDelete({ "_id": id });
        fs.unlinkSync(dr + "/" + files.filename)
        res.json(files);
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    uploadImage,
    getAllImage,
    getImageById,
    deleteImageById,
    updateImageById
}