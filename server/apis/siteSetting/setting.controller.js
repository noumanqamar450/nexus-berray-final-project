const Setting = require('./setting.model')

const getSetting = async (req, res) => {
    try {
        let response = await Setting.find({})
        if (!response.length > 0) {
            const setting = new Setting({})
            setting.save()
        } else {
            res.json(response[0])
        }
    } catch (err) {
        res.json({ message: 'Something wrong' });
    }

}

const updateSetting = async (req, res) => {
    const { id } = req.params
    const { siteLogo, favicon, siteName, shortAbout, androidLink, iosLink, facebook, instagram, twitter, linkedin, youtube, tiktok, web, copyright, checkoutNote, footerTop } = req.body
    try {
        const response = await Setting.findByIdAndUpdate(id,
            {
                $set: {
                    siteLogo, favicon, siteName, shortAbout, androidLink, iosLink, facebook, instagram, twitter, linkedin, youtube, tiktok, web, copyright, checkoutNote, footerTop
                }
            })
        
        if (response._id) {
            res.json({message: 'Setting updated', data: response})
        } else {
            res.json({ message: 'Setting not updated. Try again' })
        }

    } catch (err) {
        res.json({ message: 'Something wrong. Try again' })
    }
}


const getSettingForClient = async (req, res) => {
    try {
        const response = await Setting.find({})
        if (response[0]._id){
            res.json(response[0])
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getSetting,
    updateSetting,
    getSettingForClient
}