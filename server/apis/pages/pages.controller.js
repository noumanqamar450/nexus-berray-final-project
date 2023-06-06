const Page = require('./pages.model')

// create page 

const createPage = async (req, res) => {
    const { title, slug, status, image, content, setMenu } = req.body

    try {

        let response = new Page({ title, slug, status, image, content, setMenu })

        response = await response.save()

        if(response._id) {
            res.json({ status: true, message: 'Successfully create the page.' })
        } else {
            res.json({ message: 'Page not create. Try again' })
        }

    } catch (err) {
        
        res.json({ message: 'Something wrong. Try again.' })

    }
}

// update page 

const updatePage = async (req, res) => {
    const { id } = req.params
    const { title, slug, status, image, content, setMenu } = req.body

    try {

        let response = await Page.findByIdAndUpdate(id, { $set: { title, slug, status, image, content, setMenu } })

        if (response._id) {
            res.json({ status: true, message: 'Successfully update the page.' })
        } else {
            res.json({ message: 'Page not update. Try again' })
        }

    } catch (err) {

        res.json({ message: 'Something wrong. Try again.' })

    }
}

// get page 

const getPage = async (req, res) => {
    try {

        let response = await Page.find({}).sort({updatedAt: -1})

        if (response.length > 0) {
            res.json(response)
        } else {
            res.json({ message: 'Page not found' })
        }

    } catch (err) {

        res.json({ message: 'Something wrong. Try again.' })

    }
}

// get page by id

const getPageById = async (req, res) => {
    const { id } = req.params
    try {

        let response = await Page.findById(id)

        if (response._id) {
            res.json(response)
        } else {
            res.json({ message: 'Page not found' })
        }

    } catch (err) {

        res.json({ message: 'Something wrong. Try again.' })

    }
}

// delete page by id

const deletePageById = async (req, res) => {
    const { id } = req.params
    try {

        let response = await Page.findByIdAndDelete(id)

        if (response._id) {
            res.json({ message: 'Page successfully delete' })
        } else {
            res.json({ message: 'Page not delete' })
        }

    } catch (err) {

        res.json({ message: 'Something wrong. Try again.' })

    }
}

// for client side

// get page by slug

const getPageBySlug = async (req, res) => {
    const { slug } = req.params
    try {

        let response = await Page.find({ slug, 'status.value': 'publish' } ).populate('image')

        if (response.length > 0) {
            res.json(response[0])
        } else {
            res.json({ status: false })
        }

    } catch (err) {

        res.json({ status: false })

    }
}

// get page slug for mene

const getPageSlug = async (req, res) => {
    const { params } = req.params

    try {

        let response = await Page.find({ 
            'status.value': 'publish',
            'setMenu':{ $elemMatch: {'value': params }}
         }).select({title: 1, slug: 1, setMenu: 1})

        if (response.length > 0) {
            res.json(response)
        } else {
            res.json({ status: false })
        }

    } catch (err) {

        res.json({ status: false })

    }
}

module.exports = {
    createPage,
    getPage,
    getPageById,
    updatePage,
    deletePageById,
    getPageBySlug,
    getPageSlug
}