const Product = require('./product.model')

// get all product
const getAllProduct = async (req, res) => {
    const query = req.query
    try {
        const model = await Product.find({});
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
            const pro = await Product.find({})
                .sort({ updatedAt: -1 })
                .populate('category')
                .populate('imageUrl')
                .limit(limit * 1)
                .skip((page - 1) * limit)

            results.data = pro;
            res.json(results)

        } else {
            let pro = {}
            pro.data = await Product.find({}).sort({ updatedAt: -1 }).populate('category').populate('imageUrl')
            res.json(pro);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// product search
const searchProduct = async (req, res) => {
    const text = req.query.text
    try {
        let pro = {}
        pro.data = await Product.aggregate([
            {
                $search: {
                    index: "productSearch",
                    text: {
                        query: text,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            },
            {
                $lookup:{
                    from: 'files',
                    localField: 'imageUrl',
                    foreignField: '_id',
                    as: 'imageUrl'
                }
            }
        ])
        if (pro?.data?.length > 0) {
            res.json(pro);
        } else {
            res.json({status: false});
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// find by id
const getProductById = async (req, res) => {
    try {
        const pro = await Product.findOne({ "_id": req.params.id }).populate('category').populate('imageUrl');
        res.json(pro);
    } catch (error) {
        res.status(400).send(error);
    }
}

// create product
const createProduct = async (req, res) => {

    try {
        let product = new Product({
            name: req.body.name,
            slug: req.body.slug,
            desc: req.body.desc,
            price: req.body.price,
            salePrice: req.body.salePrice,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            status: req.body.status,
            featured: req.body.featured,
        });
        product = await product.save()
        res.json(product);
    } catch (error) {
        res.status(400).send(error)
    }
}

// update by id
const updateProductById = async (req, res) => {
    const { name, price, salePrice, category, desc, imageUrl, slug, status, featured } = req.body
    try {
        const product = await Product.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                'name': name,
                'price': price,
                'salePrice': salePrice,
                'category': category,
                'desc': desc,
                'imageUrl': imageUrl,
                'slug': slug,
                'status': status,
                'featured': featured,
                'updatedDate': new Date()
            }
        })
        res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
}

// delete by id
const deleteProductById = async (req, res) => {
    try {
        const pro = await Product.findOneAndDelete({ "_id": req.params.id });
        res.json(pro);
    } catch (error) {
        res.status(400).send(error);
    }
}

// for client
// get all published product
const getAllProductForClient = async (req, res) => {
    const query = req.query
    try {
        const model = await Product.find({});
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
            const pro = await Product.find({ status: 'publish' })
                .sort({ updatedAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit * 1)
                .populate('category')
                .populate('imageUrl')

            results.data = pro;
            res.json(results)

        } else {
            let pro = {}
            pro.data = await Product.find({status: 'publish'})
                .sort({ updatedAt: -1 })
                .populate('category')
                .populate('imageUrl')
            res.json(pro);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// get all featured product
const getAllFeaturedProductForClient = async (req, res) => {
    const query = req.query
    try {
        const model = await Product.find({});
        if (query.limit && model?.length > 10) {
            const results = {};
            const limit = parseInt(query.limit);
       
            const pro = await Product.find({ status: 'publish', featured: 1 })
                .sort({ updatedAt: -1 })
                .populate('category')
                .populate('imageUrl')
                .limit(limit)

            results.data = pro;
            res.json(results)

        } else {
            let pro = {}
            pro.data = await Product.find({ status: 'publish', featured: 1 })
                .sort({ updatedAt: -1 })
                .populate('category')
                .populate('imageUrl')
            res.json(pro);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// get one product by slug
const getProductBySlugForClient = async (req, res) => {
    const { slug } = req.params

    try {
        const pro = await Product.findOne({ status: 'publish', slug: slug })
        .populate('category')
        .populate('imageUrl')

        if (pro) {
            res.json(pro)
        } else {
            res.json({status: false})
        }

    } catch (error) {
        res.status(400).send(error);
    }
}

// get all product filter by category slug
const getProductByCategorySlugForClient = async (req, res) => {
    const { slug } = req.params

    try {
        let pro = await Product.find({ status: 'publish'})
            .sort({ updatedAt: -1 })
            .populate({
                "path": "category",
                "match": {
                    "slug": { $in: slug }
                 }
            })
            .populate('imageUrl')

        if (pro) {
            pro = pro.filter(p => p.category !== null)
            res.json(pro)
        } else {
            res.json({ status: false })
        }

    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
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
}