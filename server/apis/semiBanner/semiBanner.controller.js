const SemiBanner = require('./semiBanner.model')
// upload banner
const createBanner = async (req, res) => {
    const { semiBanner } = req.body
    try {
        let response = new SemiBanner({
            semiBanner
        })
        let data = {status: true}
        data.response = await response.save()
        res.json(data)
    } catch (err) {
        res.json({ status: false })
    }
}

// get banner
const getBanner = async (req, res) => {
    try {
        let data = { status: true }
        data.response = await SemiBanner.find({}).populate('semiBanner')
        res.json(data)
    } catch (err) {
        res.json({ status: false })
    }
}

// update banner
const updateBanner = async (req, res) => {
    const id = req.params.id
    const { semiBanner } = req.body
    try {
        let data = { status: true }
        data.response = await SemiBanner.findByIdAndUpdate({ _id: id }, { semiBanner })
        res.json(data)
    } catch (err) {
        res.json({ status: false })
    }
}

// delete banner
const deleteBanner = async (req, res) => {
    const id = req.params.id
    try {
        let data = { status: true }
        data.response = await SemiBanner.findByIdAndDelete({ _id: id })
        res.json(data)
    } catch (err) {
        res.json({ status: false })
    }
}

module.exports = {
    createBanner,
    getBanner,
    updateBanner,
    deleteBanner
}