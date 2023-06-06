const MainBanner = require('./mainBanner.model')
// upload banner
const createBanner = async (req, res) => {
    const {mainBanner} = req.body
    try {
        let response = new MainBanner({
            mainBanner
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
        data.response = await MainBanner.find({}).populate('mainBanner')
        res.json(data)
    } catch (err) {
        res.json({ status: false })
    }
}

// update banner
const updateBanner = async (req, res) => {
    const id = req.params.id
    const { mainBanner } = req.body
    try {
        let data = { status: true }
        data.response = await MainBanner.findByIdAndUpdate({_id: id}, { mainBanner })
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
        data.response = await MainBanner.findByIdAndDelete({ _id: id })
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