const Category = require('./category.model')

// get all category
const getAllCategory = async (req, res) => {
    const query = req.query
    try {
        const model = await Category.find({});
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
            const cate = await Category.find({})
                .sort({ updatedAt: -1 })
                .populate('imageUrl')
                .limit(limit)
                .skip((page - 1) * limit)

            results.data = cate;
            res.json(results)
        } else {
            let category = {};
            category.data = await Category.find({}).sort({ updatedAt: -1 }).populate('imageUrl');
            res.json(category);
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

// get one category by id
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ "_id": req.params.id }).populate('imageUrl');
        res.json(category);
    } catch (error) {
        res.status(400).send(error)
    }
}


// create category
const createCategory = async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            slug: req.body.slug,
            desc: req.body.desc,
            status: req.body.status,
            featured: req.body.featured
        });
        category = await category.save()
        res.json(category);
    } catch (error) {
        res.status(400).send(error)
    }
}

// update category by id
const updateCategoryById = async (req, res) => {
    const { name, imageUrl, slug, desc, status, featured } = req.body
    try {
        const category = await Category.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                'name': name,
                'imageUrl': imageUrl,
                'slug': slug,
                'desc': desc,
                'status': status,
                'featured': featured,
                'updatedDate': new Date()
            }
        })
        res.send(category)
    } catch (error) {
        res.status(400).send(error)
    }
}

// delete category by id
const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id })
        res.send(category)
    } catch (error) {
        res.status(400).send(error)
    }
}


// for client
// get all category
const getAllCategoryForClient = async (req, res) => {
    const query = req.query
    try {
        const model = await Category.find({});
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
            const cate = await Category.find({status: 'publish'})
                .sort({ updatedAt: -1 })
                .populate('imageUrl')
                .limit(limit)
                .skip((page - 1) * limit)

            results.data = cate;
            res.json(results)
        } else {
            let category = {};
            category.data = await Category.find({ status: 'publish' }).sort({ updatedAt: -1 }).populate('imageUrl');
            res.json(category);
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

// get category by slug
const getCategoryBySlugForClient = async (req, res) => {
    const { slug } = req.params
    try {

        const cate = await Category.findOne({ status: 'publish', slug })
            .populate('imageUrl')

        if (cate) {
            res.json(cate);
        } else {
            res.json({status: false})
        }

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
    getAllCategoryForClient,
    getCategoryBySlugForClient
}